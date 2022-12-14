const Key = require('./Key');
const zlib = require('zlib');
const Message = require('./Message');

class ProtobufReader {
	constructor(data) {
		this.data = data;
		this.index = 0;
		this.gzip = false;
		this.parsed = {};
	}
	process() {
		const blocks = this.processBlocks(this);
		this.parsed = blocks;
	}
	parseProto(proto) {
		const finalMessage = {};

		for(const key in proto) {
			const buffer = this.parsed[key];
			const d = proto[key].read(buffer, proto[key], proto);
			const name = proto[key].name ? proto[key].name : key;
			finalMessage[name] = d;
		}
		for(const key in this.parsed) {
			if(!proto[key]) {
				finalMessage[key] = this.parsed[key];
			}
		}
		return finalMessage;
	}
	parseMapping(parsed, mapping) {
		for(const key in mapping) {
			const entries = parsed[key];
			for(var i=0;i<entries.length;i++) {
				this.parseEntry(parsed, entries[i], mapping[key]);
			}
		}
	}
	parseEntry(parsed, entry, mapping) {
		const values = [];
		for(const key in mapping) {
			if(!entry[key] && key != 'join') {
				return entry;
			}
			if(!mapping.hasOwnProperty('join')) {
				this.parseEntry(parsed, entry[key], mapping[key]);
			}
			else {
				for(var i=0;i<entry.length;i++) {
					entry[i] = mapping.join.on(entry[i], parsed[mapping.join.field])
				}
			}
		}
		return values;
	}
	parseUnknown(key) {
		key = this.readVarint();
		switch (key.wire) {
			case 0:
				return this.readVarint().actual;
			case 1:
				return this.read64Bit();
			case 2:
				const length = this.readVarint().actual;
				return this.slice(this.index, length).data;
			case 5:
				return this.read32Bit();
		}
	}
	async processHeaderPacket() {
		const fullSize = this.readBig32(this.index);
		const packetSize = this.readBig32(this.index);
		const header = this.slice(this.index, packetSize);
		header.process();
		
		let packet = this.slice(this.index, this.data.length - this.index);
		if(packet.data[0] == 0x1F && packet.data[1] == 0X8B) {
			this.gzip = true;
			packet.data = zlib.gunzipSync(packet.data);
			require('fs').writeFileSync('a.txt', packet.data);
			console.log(packet)
		}
		packet.process();

		return [
			header,
			packet
		]
	}
	processBlocks(packet) {
		let info = {};
		while (packet.hasNext()) {
			const key = packet.readVarint();
			let val;

			switch (key.wire) {
				case 0:
					val = packet.readVarint().actual;
					info[key.field] = val;
					break;
				case 1:
					val = packet.read64Bit();
					info[key.field] = val;
					break;
				case 2:
					const length = packet.readVarint(true);
					let segment = packet.slice(packet.index - key.length, length.actual + length.length + key.length);
					if(Array.isArray(info[key.field])) {
						info[key.field].push(segment);
					}
					else if(info[key.field]) {
						const val = info[key.field];
						info[key.field] = [val, segment];
					}
					else {
						info[key.field] = segment;
					}
					break;
				case 5:
					//pull 4 bytes because we don't know the type
					info[key.field] = packet.slice(packet.index, 4);
					break;
			}
		}

		return info;
	}
	isValidString(str) {
		for (var i = 0; i < str.length; i++) {
			//20 - 125
			if ((str[i] < 20 || str[i] > 125) && str[i] != 10 && ![128, 226, 162, 153].includes(str[i])) {
				return false;
			}
		}
		return true;
	}
	hasNext() {
		return this.index < this.data.length;
	}
	readByte() {
		return this.data.readUInt8(this.index++);
	}
	read32Bit() {
		const b = this.data.readUInt32LE(this.index);
		this.index += 4;
		return b;
	}
	readBig32() {
		const b = this.data.readUInt32BE(this.index);
		this.index += 4;
		return b;
	}
	readFloat() {
		const f = this.data.readFloatLE(this.index);
		this.index += 4;
		return f;
	}
	read64Bit() {
		const b = this.data.readBigUInt64LE(this.index);
		this.index += 8;
		return b;
	}
	readSigned() {
		const b = this.readVarint();
		const c = ~~parseInt(b.value, 2)
		return b;
	}
	slice(start, length) {
		if(start + length > this.data.length) {
			throw new Error('Reading outside the bounds of the buffer.');
		}
		const data = this.data.slice(start, start + length);
		this.index = start + length;
		return new ProtobufReader(data);
	}
	readKey(peek=false) {
		const key = this.readVarint(peek);
		if(key.field == 0) {
			throw new Error('Key with field 0 found.');
		}
		switch(key.wire) {
			case 0:
			case 1:
			case 2:
			case 5:
				return key;
			default:
				throw new Error(`Invalid wire type ${key.wire} found.`);
		}
	}
	readVarint(peek=false, signed=false) {
		let arr = [];
		while (true) {
			const by = this.readByte();
			const b = new Key(by);
			arr.push(b.value.slice(1));
			if (b.value.startsWith(0)) {
				break;
			}
		}

		let binary = arr.reverse().join('');

		//convert binary string to 2s complement
		if(signed) {
			let complement = '';

			//remove leading 0's
			binary = binary.substring(binary.indexOf('1'), binary.length);
	
			for(const bit of binary) {
				complement += bit == 0 ? 1 : 0;
			}
	
			binary = ~parseInt(complement, 2);
		}
		else {
			binary = parseInt(binary, 2);
		}


		const key = new Key(binary);
		key.length = arr.length;
		
		if(peek) {
			this.index -= key.length;
		}

		return key;
	}
	toString() {
		return this.data.toString();
	}
}

module.exports = ProtobufReader;