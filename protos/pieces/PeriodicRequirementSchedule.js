const String = require('../../types/String');
const Varint = require('../../types/Varint');
const PackedMessage = require('../../types/PackedMessage');
const Group = require('../../types/Group');
const Float = require('../../types/Float');
const Repeating = require('../../types/Repeating');
const Boolean = require('../../types/Boolean');

module.exports = {
	2: new Group('info', 2, {
		1: new Varint('FireAfterMsecs', 1),
		2: new Group('requirement', 2, {
			3: new String('sharedRequirement_id', 3)
		}),
	}),
}