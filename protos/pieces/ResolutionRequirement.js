const Varint = require('../../types/Varint');
const Group = require('../../types/Group');

module.exports = {
	2: new Group('requirement', 2, {
		1: new Varint('minimumWidth', 1),
		2: new Varint('minimumHeight', 2)
	}),
}