class Message {
    constructor() {
        this.data = {};
        this.unknownIndex = 0;
    }
    addField(name, value) {
        if(name == '_') {
            name = 'unknown' + this.unknownIndex++;
        }
        this.data[name] = value;
    }
    static from(message) {
        const newMessage = new Message();
        for(const key in message) {
            newMessage.addField(key, message[key]);
        }
        return newMessage;
    }
    finalize() {
        return this.data;
    }
}

module.exports = Message;