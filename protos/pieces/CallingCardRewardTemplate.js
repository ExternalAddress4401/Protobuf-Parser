const Varint = require('../../types/Varint');
const Group = require('../../types/Group');

module.exports = {
	2: new Group('data', 2, {
		1: new Varint('callingCard_id', 2)
	})
}