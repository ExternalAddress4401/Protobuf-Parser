const String = require('../../types/String');
const Varint = require('../../types/Varint');
const PackedMessage = require('../../types/PackedMessage');
const Group = require('../../types/Group');
const Float = require('../../types/Float');
const Repeating = require('../../types/Repeating');
const Boolean = require('../../types/Boolean');
const BeatmapRewardTemplate = require('./BeatmapRewardTemplate');
const EmojiRewardTemplate = require('./EmojiRewardTemplate');
const CallingCardRewardTemplate = require('./CallingCardRewardTemplate');
const GachaBoxRewardTemplate = require('./GachaBoxRewardTemplate');
const CurrencyRewardTemplate = require('./CurrencyRewardTemplate');

module.exports = {
	2: new Group('piece', 2, {
		1: new PackedMessage('segments', 1, {
			1: new PackedMessage('beatmaps', 1, {
				1: new Varint('beatmap_id', 1),
				2: new Varint('buyCost', 2),
			})
		}),
		2: new Varint('playActiveDurationMsecs', 2),
		3: new Varint('numPlayers', 3),
		4: new Varint('numAttempts', 4),
		6: new Group('gachaRewards', 6, {
			3: new Varint('uniqueRewardEveryN', 3),
			4: new Group('uniqueTier', 4, {
				1: new Varint('weight', 1),
				2: new PackedMessage('rewards', 2, {
					1: new Varint('type', 1),
					2: { name: 'piece' },
				}, {
					enums: {
						6: BeatmapRewardTemplate,
						8: GachaBoxRewardTemplate,
						13: EmojiRewardTemplate,
						14: CallingCardRewardTemplate,
					}
				}),
			}),
			5: new PackedMessage('repeatableTiers', 5, {
				1: new Varint('weight', 1),
				2: new PackedMessage('rewards', 2, {
					1: new Varint('type', 1),
					2: { name: 'piece' }
				}, {
					enums: {
						2: CurrencyRewardTemplate,
						8: GachaBoxRewardTemplate
					}
				}),
				3: new Group('fallbackReward', 3, {
					1: new Varint('type', 1),
					2: { name: 'piece' }
				}, {
					enums: {
						2: CurrencyRewardTemplate
					}
				})
			}),
			6: new Varint('displayRandomSeed', 6),
		}),
		7: new PackedMessage('rewardTiers', 7, {
			1: new Varint('position', 1),
			2: new Varint('count', 2)
		}),
		10: new Varint('eventEndedCooloffDurationMsecs', 10),
		11: new String('datesDetailsTxt', 11),
		12: new Varint('numAiPlayers', 12),
		15: new Group('spinTicketCost', 15, {
			1: new Varint('currency_id', 1),
			2: new Varint('amount', 2)
		}),
		16: new Group('bannerImage', 16, {
			1: new String('id', 1),
			2: new String('url', 2),
			3: new Varint('width', 3),
			4: new Varint('height', 4),
			6: new Group('rect', 6, {
				3: new Varint('width', 3),
				4: new Varint('height', 4)
			})
		}),
		17: new Group('bannerGradient', 17, {
			2: new PackedMessage('alphaKeys', 2, {
				1: new Varint('alpha', 1),
				2: new Varint('time', 2)
			}),
			3: new PackedMessage('colorKeys', 3, {
				1: new Varint('color', 1, { signed: true }),
				2: new Float('time', 2)
			})
		}),
		19: new String('eventFlavourTxt', 19),
		21: new String('localNoti_laterSegmentsMsgTxt', 20)
	})
}