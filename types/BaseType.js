class BaseType {
    constructor(name, field, options={}) {
        this.name = name;
        this.field = field;
        this.options = options;
    }
    parseKey(buffer, key, message, proto) {
        if(!proto.fields[key.field]) {
            const v = buffer.parseUnknown(key);
            message.addField(key.field, v);
        }
        else if(proto.fields[key.field].name == 'piece') {
            const pieceProto = proto.options.enums[message.data.type];
            
            const v = pieceProto[key.field].read(buffer, pieceProto[key.field]);
            message.addField(proto.fields[key.field].name, v);
        }
        else if(proto.fields[key.field]) {
            const v = proto.fields[key.field].read(buffer, proto.fields[key.field]);
            message.addField(proto.fields[key.field].name, v);
        }
    }
}

module.exports = BaseType;