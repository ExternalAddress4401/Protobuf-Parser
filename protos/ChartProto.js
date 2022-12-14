const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');

module.exports = {
	1: new Varint('id', 1),
	2: new String('interactions_id', 2),
	5: new PackedMessage('notes', 5, {
		1: new Varint('note_type', 1),
		3: new Group('single', 3, {
			1: new Group('note', 1, {
				1: new Float('offset', 1),
				3: new Varint('lane', 3)
			}),
			2: new Varint('swipe', 2)
		}),
		4: new Group('long', 4, {
			1: new Group('note', 1, {
				1: new Float('offset', 1),
				3: new Varint('lane', 3)
			}, { repeating: true}),
			2: new Varint('swipe', 2)
		}),
		6: new Varint('lane', 6),
		13: new Varint('size', 13),
		14: new Group('note', 14, {
			1: new Group('a', 1, {
				1: new Float('offset', 1),
				2: new Group('vec', 2, {
					1: new Float('x', 1),
					2: new Float('y', 2)
				}),
				3: new Varint('lane', 3)
			}, { repeating: true })
		})
	}),
	6: new PackedMessage('sections', 6, {
		1: new Float('offset', 1)
	}),
	7: new PackedMessage('perfects', 7, {
		1: new Float('offset', 1),
		2: new Float('multiplier', 2)
	}),
	8: new PackedMessage('speeds', 8, {
		1: new Float('offset', 1),
		2: new Float('multiplier', 2)
	}),
	9: new PackedMessage('circles', 9, {
		1: new Float('offset', 1),
		4: new Varint('type', 4, { repeating: true, key: true })
	})
}