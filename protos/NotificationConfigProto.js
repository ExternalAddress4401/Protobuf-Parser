const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');
const Boolean = require('../types/Boolean');
const LiveOpsEventNotificationSchedule = require('./pieces/LiveOpsEventNotificationSchedule');
const PeriodicRequirementSchedule = require('./pieces/PeriodicRequirementSchedule');
const ShopItemNotificationSchedule = require('./pieces/ShopItemNotificationSchedule');
const ChallengeNotificationSchedule = require('./pieces/ChallengeNotificationSchedule');
const SeasonNotificationSchedule = require('./pieces/SeasonNotificationSchedule');

module.exports = {
	1: new PackedMessage('Notifications', 1, {
		3: new String('id', 3),
		4: new String('view', 4),
		5: new String('title_id', 5),
		6: new String('body_id', 6),
		9: new String('channel_id', 9),
		12: new String('icon', 12),
		13: new String('bigIcon', 13),
		14: new String('iosBody_id', 14)
	}),
	2: new PackedMessage('channels', 2, {
		1: new String('id', 1),
		2: new String('idLabel', 2),
		3: new String('title_id', 3),
		4: new String('sound', 4),
		5: new Boolean('vibration', 5),
		6: new Boolean('light', 6),
		7: new String('requestPermissionsType_id', 7),
		8: new Varint('cooldownInMinutes', 8),
		9: new String('requestPermissionsTipTitle_id', 9),
		10: new String('requestPermissionsTipTitleOk_id', 10),
		11: new String('requestPermissionsTipTitleCancel_id', 11),
		12: new String('requestSettingsTitle_id', 12),
		13: new String('requestSettingsBody_id', 13),
		14: new String('requestSettingsOk_id', 14),
		15: new String('requestSettingsCancel_id', 15)
	}),
	3: new PackedMessage('Schedules', 3, {
		1: new Varint('type', 1),
		2: { name: 'piece' },
		3: new Varint('id', 3),
		4: new String('idLabel', 4),
		6: new String('notificationOptions_id', 6, { repeating: true }),
		8: new Boolean('enabled', 8)
	}, {
		enums: {
			102: ChallengeNotificationSchedule,
			103: SeasonNotificationSchedule,
			104: LiveOpsEventNotificationSchedule,
			105: PeriodicRequirementSchedule,
			106: ShopItemNotificationSchedule
		}
	}),
	1000: new String('version', 1000),
	1001: new Varint('jitterMsrcs', 1001)
}