const String = require('../../types/String');
const Varint = require('../../types/Varint');
const PackedMessage = require('../../types/PackedMessage');
const Group = require('../../types/Group');
const Float = require('../../types/Float');
const Repeating = require('../../types/Repeating');
const Boolean = require('../../types/Boolean');

module.exports = {
	2: new Group('piece', 2, {
		1: new Varint('numSongs', 1),
		2: new Varint('numPlays', 2),
		7: new Varint('repeatDurationMsecs', 3)
	})
}