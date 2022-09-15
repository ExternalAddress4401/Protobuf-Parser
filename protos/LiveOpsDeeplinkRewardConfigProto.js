const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const BeatmapRewardTemplate = require('./pieces/BeatmapRewardTemplate');
const GachaBoxRewardTemplate = require('./pieces/GachaBoxRewardTemplate');
const HardGatePassRewardTemplate = require('./pieces/HardGatePassRewardTemplate');
const CurrencyRewardTemplate = require('./pieces/CurrencyRewardTemplate');
const DateType = require('../types/Date');

module.exports = {
	1: new PackedMessage('LiveOpsDeeplinkRewards', 1, {
		1: new String('id', 1),
		2: new String('idLabel', 2),
		3: new Varint('viewerStatus', 3),
		5: new DateType('startTime', 5),
		6: new DateType('endTime', 6),
		7: new Group('rewards', 7, {
			1: new PackedMessage('rewards', 1, {
				1: new Varint('type', 1),
				2: { name: 'piece' }
			}, {
				enums: {
					2: CurrencyRewardTemplate,
					6: BeatmapRewardTemplate,
					8: GachaBoxRewardTemplate,
					11: HardGatePassRewardTemplate,
				}
			})
		}),
		8: new String('url', 8)
	}),
	100: new String('version', 100),
}