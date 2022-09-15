const Message = require('../Message');
const ProtobufWriter = require('../ProtobufWriter');
const BaseType = require('./BaseType');

class Group extends BaseType {
    constructor(name, field, fields, options={}) {
		super(name, field, options);
		this.fields = fields;
    }
    read(reader, proto) {
		if(this.options.repeating) {
			return this.readRepeating(reader, proto);
		}
		else {
			return this.readNormal(reader, proto);
		}
	}
	readRepeating(reader, proto) {
		const messages = [];

		while(reader.hasNext()) {
			const message = new Message();
			let key = reader.readVarint(true);
			if(key.field != proto.field) { //are we done with the repeating messages?
				return messages;
			}
			key = reader.readVarint();
			const length = reader.readVarint().actual;
			const buffer = reader.slice(reader.index, length);
			while(buffer.hasNext()) {
				const key = buffer.readVarint(true);
				this.parseKey(buffer, key, message, proto);
			}
			messages.push(message.finalize());
		}
		
		return messages;
	}
	readNormal(reader, proto) {
		reader.readKey(); //key

		const length = reader.readVarint().actual;
        const buffer = reader.slice(reader.index, length);
        const message = new Message();

        while(buffer.hasNext()) {
            const key = buffer.readKey(true);
			this.parseKey(buffer, key, message, proto);
        }

        return message.finalize();
	}
	readPiece(reader, proto) {
        const message = new Message();

        while(reader.hasNext()) {
            const key = buffer.readKey(true);

            if(proto.fields[key.field]) {
				const v = proto.fields[key.field].read(buffer, proto.fields[key.field], key, message.data.type);
				message.addField(proto.fields[key.field].name, v);
            }
            else {
				const v = buffer.parseUnknown(key);
				message.addField(key.field, v);
            }
        }

        return message.finalize();
	}
	write(writer, value, proto) {
		//we don't have the length at the beginning here :(
		//lets use a sub buffer
		
		//proto fields uses numbers
		//value is parsed and uses the name
		if(Array.isArray(value)) {
			this.writeRepeating(writer, value, proto);
			return;
		}

		const subWriter = new ProtobufWriter();

		for(const key in value) {
			const subProto = writer.getKeys(key, proto.fields);
			proto.fields[subProto.field].write(subWriter, value[subProto.name], proto.fields[subProto.field]);
		}

        //now packed is all the packed messages so write to writer

        writer.writeKey(2, this.field);
        writer.writeVarint(subWriter.buffer.length);
        writer.concat(subWriter.buffer);
	}
	writeRepeating(writer, value, proto) {
		const repeatingBuffer = new ProtobufWriter();

		for(const val of value) {
			const subWriter = new ProtobufWriter();
			for(const key in val) {
				const subProto = writer.getKeys(key, proto.fields);
				proto.fields[subProto.field].write(subWriter, val[subProto.name], proto.fields[subProto.field]);
			}
			repeatingBuffer.writeKey(2, this.field);
			repeatingBuffer.writeVarint(subWriter.buffer.length);
            repeatingBuffer.concat(subWriter.buffer);
		}

        //now packed is all the packed messages so write to writer

        //writer.writeKey(2, this.field);
        //writer.writeVarint(repeatingBuffer.buffer.length);
        writer.concat(repeatingBuffer.buffer);
	}
}

module.exports = Group;