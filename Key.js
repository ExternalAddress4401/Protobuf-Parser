class Key {
	constructor(b) {
		this.wire = b & 0x07;
		this.field = b >> 3;
		this.value = this.toBinaryString(b);
		this.length = 0;
		this.actual = b;
	}
	toBinaryString(b) {
		return this.pad((b >>> 0).toString(2));
	}
	pad(b) {
		let str = '';
		str = str.padStart(8 - b.length, '0');
		str += b;
		return str;
	}
}

module.exports = Key;