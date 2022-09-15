const String = require('../../types/String');
const Varint = require('../../types/Varint');
const PackedMessage = require('../../types/PackedMessage');
const Group = require('../../types/Group');
const Float = require('../../types/Float');
const Repeating = require('../../types/Repeating');
const Boolean = require('../../types/Boolean');

module.exports = {
	2: new Group('SeasonNotifications', 2, {
		1: new PackedMessage('info', 1, {
			1: new Varint('UseStartOrEndTime', 1),
			2: new Varint('TimeOffsetMsecs', 2, { signed: true }),
			3: new Varint('NotificationTimeOffsetMsecs', 3),
			4: new Boolean('DontQueueIfPastEndTime', 4),
			6: new Varint('NotificationTimeStaggerMsecs', 5),
			7: new String('SeasonEnding', 7)
		}),
	}),
	3: new Varint('id', 3),
	4: new String('idLabel', 4),
	8: new Boolean('enabled', 8)
}