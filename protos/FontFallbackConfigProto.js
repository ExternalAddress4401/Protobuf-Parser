const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');

module.exports = {
	1000: new String('version', 1000),
	1001: new Group('fontConfig', 1001, {
		2: new String('preferredFallbackFontsMacOS', 2, { repeating: true }),
		3: new String('preferredFallbackFontsWindows', 3, { repeating: true }),
		4: new String('preferredFallbackFontsAndroid', 4, { repeating: true }),
		5: new String('preferredFallbackFontsiOS', 5, { repeating: true })
	})
}