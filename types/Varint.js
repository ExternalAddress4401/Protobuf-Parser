const BaseType = require("./BaseType");

class Varint extends BaseType {
  constructor(name, field, options = {}) {
    super(name, field, options);
  }
  read(reader, proto) {
    const varints = [];
    if (!reader.data) {
      return reader;
    }

    if (this.options.repeating) {
      if (this.options.packed) {
        return this.readPackedRepeating(reader, proto);
      }
    }

    const key = reader.readVarint();

    if (this.options.repeating) {
      while (reader.hasNext()) {
        varints.push(reader.readVarint().actual);
        if (!reader.hasNext()) {
          return varints;
        }
        const subKey = reader.readVarint();
        if (subKey.field != key.field) {
          return varints;
        }
      }
    }

    let val;

    if (this.options.signed) {
      val = reader.readVarint(false, true).actual;
    } else {
      val = reader.readVarint().actual;
    }
    return val;
  }
  readPackedRepeating(reader, proto) {
    const key = reader.readKey();

    const varints = [];
    const length = reader.readVarint().actual;
    const subBuffer = reader.slice(reader.index, length);
    while (subBuffer.hasNext()) {
      varints.push(subBuffer.readVarint().actual);
    }
    return varints;
  }
  write(writer, value, proto) {
    if (Array.isArray(value)) {
      if (this.options.packed) {
        return this.writePackedRepeating(writer, value, proto);
      } else {
        return this.writeRepeating(writer, value, proto);
      }
    }
    writer.writeKey(0, proto.field);
    writer.writeVarint(value);
  }
  writeRepeating(writer, values, proto) {
    for (const val of values) {
      writer.writeKey(0, proto.field);
      writer.writeVarint(val);
    }
  }
  writePackedRepeating(writer, values, proto) {
    const ex = values.map((el) => writer.getVarint(el).buffer);
    const totalSize = ex.reduce((prev, curr) => prev + curr.byteLength, 0);
    writer.writeKey(0, proto.field);
    writer.writeVarint(totalSize);
    for (const val of values) {
      writer.writeVarint(val);
    }
  }
}

module.exports = Varint;
