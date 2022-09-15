const String = require('../../types/String');
const Varint = require('../../types/Varint');
const PackedMessage = require('../../types/PackedMessage');
const Group = require('../../types/Group');
const Float = require('../../types/Float');
const Repeating = require('../../types/Repeating');
const Boolean = require('../../types/Boolean');

module.exports = {
	2: new Group('info', 2, {
		6: new Varint('timeBeforeExpireWarningNotificationsMsecs', 6),
		7: new Varint('numQuestsForHalfFullWarning', 7),
		8: new Varint('numQuestsForFullWarning', 8),
		11: new Varint('NumNewChallengeAvailableNotificationsToGive', 9),
		12: new String('CampaignGachaBoxReadyToClaimNotification_id', 12),
		13: new String('CampaignGachaBoxReadyToClaimReminderNotification_id', 13),
		16: new Varint('DelayBeforeCampaignGachaBoxReadyToClaimReminderNotificationMsecs', 16),
		17: new String('VenueEndedNotification_id', 17),
		18: new String('VenueEndedNotification_id', 18),
	}),
}