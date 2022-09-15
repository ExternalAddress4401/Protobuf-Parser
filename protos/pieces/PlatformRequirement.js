const Varint = require('../../types/Varint');
const Group = require('../../types/Group');

module.exports = {
	2: new Group('requirement', 2, {
		2: new Varint('platform', 2)
	}),
}