const Group = require('../../types/Group');
const Varint = require('../../types/Varint');

module.exports = {
	2: new Group('module', 2, {
		1: new Varint('LOD', 1),
		4: new Varint('MaxLights', 4),
	}),
}