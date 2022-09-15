const String = require('../../types/String');
const Varint = require('../../types/Varint');
const PackedMessage = require('../../types/PackedMessage');
const Group = require('../../types/Group');
const Float = require('../../types/Float');
const Repeating = require('../../types/Repeating');
const Boolean = require('../../types/Boolean');

module.exports = {
	2: new Group('story', 2, {
		1: new String('html', 1),
		2: new String('strings', 2, { repeating: true }),
		3: new Group('info', 3, {
			1: new String('id', 1),
			2: new String('url', 2),
			3: new Varint('imageWidth', 3),
			4: new Varint('imageHeight', 4),
			6: new Group('image_dimensions', 6, {
				3: new Varint('imageWidth', 3),
				4: new Varint('imageHeight', 4)
			})
		})
	}),
}