const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');
const BeatmapRewardTemplate = require('./pieces/BeatmapRewardTemplate');
const HardGatePassRewardTemplate = require('./pieces/HardGatePassRewardTemplate');
const Boolean = require('../types/Boolean');

module.exports = {
	1: new PackedMessage('LiveOpsBundles', 1, {
		1: new Varint('type', 1),
		2: new Group('rewards', 2, {
			1: new PackedMessage('rewards', 1, {
				1: new Varint('type', 1),
				2: { name: 'piece' }
			}, {
				enums: {
					6: BeatmapRewardTemplate,
					11: HardGatePassRewardTemplate,
				}
			})
		}),
		3: new Varint('id', 3),
		4: new String('idLabel', 4),
		6: new Group('openingVisual', 6, {
			3: new Varint('asset_id', 3),
			6: new Varint('Tint1', 6, { signed: true }),
			7: new Varint('Tint2', 7, { signed: true }),
			8: new Varint('DecalTint', 8, { signed: true }),
			9: new Float('Metalness', 9),
			10: new Float('Smoothness', 10),
			11: new Varint('SSSTint', 11),
			12: new Float('SSSLevel', 12),
			13: new Group('Decal', 13, {
				1: new Varint('type', 1),
				2: new Group('StreamableImage', 2, {
					1: new Group('Image', 1, {
						1: new String('id', 1),
						2: new String('url', 2),
						3: new Varint('width', 3),
						4: new Varint('height', 4),
						6: new Group('rect', 6, {
							3: new Varint('width', 3),
							4: new Varint('height', 4)
						})
					})
				})
			})
		}),
		7: new Varint('pricePoint_id', 7),
		8: new Varint('startTimeMsecs', 8),
		9: new Varint('endTimeMsecs', 9),
		10: new Varint('sortOrder', 10),
		14: new Group('shopImage', 14, {
			1: new String('id', 1),
			2: new String('url', 2),
			3: new Varint('width', 3),
			4: new Varint('height', 4),
			6: new Group('rect', 6, {
				1: new Varint('x', 1),
				2: new Varint('y', 2),
				3: new Varint('width', 3),
				4: new Varint('height', 4)
			})
		}),
		15: new Group('shopPreviewImage', 15, {
			1: new String('id', 1),
			2: new String('url', 2),
			3: new Varint('width', 3),
			4: new Varint('height', 4),
			6: new Group('rect', 6, {
				1: new Varint('x', 1),
				2: new Varint('y', 2),
				3: new Varint('width', 3),
				4: new Varint('height', 4)
			})
		}),
		16: new String('sharedRequirements_id', 16),
		17: new Boolean('showOnHomescreenDialog', 17),
		19: new String('title', 19)
	}),
	100: new String('version', 100),
	101: new Varint('nextBundleId', 101)
}