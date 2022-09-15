const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Boolean = require('../types/Boolean');
const MultiImageTextStory = require('./pieces/MultiImageTextStory');

module.exports = {
	1: new PackedMessage('news', 1, {
		1: new Varint('type', 1),
		2: { name: 'piece' },
		3: new Varint('id', 3),
		4: new String('viewType', 4),
		5: new Varint('timestamp1', 5),
		6: new Varint('timestamp2', 6),
		7: new Boolean('popup', 7),
		8: new Varint('order', 8),
		10: new Group('images', 10, {
			1: new String('id', 1),
			2: new String('url', 2),
			3: new Varint('width', 3),
			4: new Varint('height', 4),
			6: new Group('rect', 6, {
				3: new Varint('width', 3),
				4: new Varint('height', 4)
			})
		}),
		11: new String('title', 11),
		13: new Varint('status', 13)
	}, {
		enums: {
			4: MultiImageTextStory
		}
	}),
	100: new String('version', 100),
	101: new Varint('nextStoryId', 101),
}