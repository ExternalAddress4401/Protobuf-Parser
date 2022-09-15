const String = require('../../types/String');
const Varint = require('../../types/Varint');
const PackedMessage = require('../../types/PackedMessage');
const Group = require('../../types/Group');
const Float = require('../../types/Float');
const Repeating = require('../../types/Repeating');
const Boolean = require('../../types/Boolean');

module.exports = {
	2: new Group('ShopItemNotifications', 2, {
		1: new PackedMessage('info', 1, {
			1: new Varint('UseStartOrEndTime', 1),
			6: new Varint('NotificationTimeStaggerMsecs', 6),
			7: new String('NotificationToTrigger_id', 7)
		}),
		3: new Varint('Purchasable_id', 3),
	}),
	4: new String('idLabel', 4),
	8: new Boolean('enabled', 8)
}