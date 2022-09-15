const Message = require("../Message");
const ProtobufWriter = require("../ProtobufWriter");
const BaseType = require("./BaseType");

class Repeating extends BaseType {
  constructor(name, field, fields) {
    super(name, field, {});
    this.fields = fields;
  }
  read(values, proto) {
    const messages = [];

    for (const reader of values) {
      const key = reader.readVarint();
      const length = reader.readVarint();
      const message = new Message();

      while (reader.hasNext()) {
        const key = reader.readVarint(true);
        this.parseKey(reader, key, message, proto);
      }

      messages.push(message.finalize());
    }

    return messages;
  }
  write(writer, values, proto) {
    for (const val of values) {
      const subWriter = new ProtobufWriter();
      for (const key in val) {
        const subProto = writer.getKeys(key, proto.fields);
        proto.fields[subProto.field].write(
          subWriter,
          val[subProto.name],
          proto.fields[subProto.field]
        );
      }
      writer.writeKey(2, this.field);
      writer.writeVarint(subWriter.buffer.length);
      writer.concat(subWriter.buffer);
    }
  }
}

module.exports = Repeating;
