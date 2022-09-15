const String = require('../../types/String');
const Varint = require('../../types/Varint');
const PackedMessage = require('../../types/PackedMessage');
const Group = require('../../types/Group');
const Float = require('../../types/Float');
const Repeating = require('../../types/Repeating');
const Boolean = require('../../types/Boolean');

module.exports = {
	2: new Group('ShuffleEventNotifications', 2, {
		1: new PackedMessage('info', 1, {
			1: new Varint('UseStartOrEndTime', 1),
			5: new Group('UseLocalTimeOptions', 5, {
				1: new Varint('LocalTimeMsecs', 1),
				2: new Varint('PlusDaysFromRegionTime', 2)
			}),
			6: new Varint('NotificationTimeStaggerMsecs', 6),
			7: new String('NotificationToTrigger_id', 7)
		}),
		2: new Boolean('ShuffleEventNotificationsEnabled', 2),
		3: new Boolean('LeaderboardEventNotificationsEnabled', 3),
		4: new PackedMessage('LeaderboardEvt_InitialSegmentNotifications', 4, {
			1: new Varint('UseStartOrEndTime', 1),
			6: new Varint('NotificationTimeStaggerMsecs', 6),
			7: new String('NotificationToTrigger_id', 7)
		}),
		5: new PackedMessage('LeaderboardEvt_LaterSegmentNotifications', 5, {
			1: new Varint('UseStartOrEndTime', 1),
			6: new Varint('NotificationTimeStaggerMsecs', 6),
			7: new String('NotificationToTrigger_id', 7)
		}),
		6: new PackedMessage('LeaderboardEvt_EndingCoolOffNotifications', 6, {
			1: new Varint('UseStartOrEndTime', 1),
			6: new Varint('NotificationTimeStaggerMsecs', 6),
			7: new String('NotificationToTrigger_id', 7)
		}),
	}),
}