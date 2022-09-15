const BaseType = require('./BaseType');

class Float extends BaseType {
	constructor(name, field) {
		super(name, field);
	}
	read(reader) {
		const key = reader.readVarint().actual;
		const f = reader.readFloat();
		return f;
	}

	write(writer, value, proto) {
		writer.writeKey(5, proto.field);

		const buffer = Buffer.alloc(4);
		buffer.writeFloatLE(value);

		writer.concat(buffer);
	}
}

module.exports = Float;