const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');

module.exports = {
	1: new String('version', 1),
	4: new PackedMessage('assetBundles', 4, {
		1: new String('id', 1),
		2: new String('DependenciesAndroid_id', 2),
		5: new String('HashAndroid', 5),
		6: new Varint('SizeInBytesAndroid', 6),
		7: new Varint('CRCAndroid', 7),
		8: new String('HashIos', 8),
		9: new Varint('SizeInBytesIos', 9),
		10: new Varint('CRCIos', 10),
		11: new String('DependenciesIos_id', 11)
	}),
	5: new PackedMessage('assets', 5, {
		1: new String('id', 1),
		2: new String('name', 2),
		3: new String('iosBundle', 3),
		4: new String('androidBundle', 4)
	}),
	6: new String('downloadUrl', 6),
	7: new String('downloadBucketVersion', 7)
}