const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Repeating = require('../types/Repeating');

module.exports = {
	100: new String('version', 100),
	1: new Repeating('strings', 1, {
		1: new String('placeholder', 1),
		2: new Group('message', 2, {
			1: new String('country_code', 1),
			2: new String('message', 2)
		})
	})
}