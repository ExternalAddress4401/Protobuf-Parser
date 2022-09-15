const BaseType = require('./BaseType');

class Boolean extends BaseType {
	constructor(name, field, options={}) {
		super(name, field, options);
	}
	read(reader) {	
		const key = reader.readVarint();
		
		const val = reader.readVarint().actual;
		return !!val;
	}
	write(writer, value, proto) {
		//NYI
	}
}

module.exports = Boolean;