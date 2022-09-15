const BaseType = require('./BaseType');

class DateType extends BaseType {
	constructor(name, field, options={}) {
		super(name, field, options);
	}
	read(reader) {	
		const key = reader.readVarint();
		
		const val = reader.readVarint().actual;
		return new Date(val).toString();
	}
	write(writer, value, proto) {
		//NYI
	}
}

module.exports = DateType;