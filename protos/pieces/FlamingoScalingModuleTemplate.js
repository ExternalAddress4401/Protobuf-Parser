const String = require('../../types/String');
const Varint = require('../../types/Varint');
const PackedMessage = require('../../types/PackedMessage');
const Group = require('../../types/Group');
const Float = require('../../types/Float');
const Repeating = require('../../types/Repeating');
const Boolean = require('../../types/Boolean');

module.exports = {
	2: new Group('module', 2, {
		1: new Varint('WhizzBangs', 1),
		2: new Boolean('GameTrackEq', 2),
		3: new Boolean('GameHudEq', 3),
		4: new Boolean('GameTrackVfx', 4),
		5: new Boolean('GameTileVfx', 5),
		8: new Varint('FPS', 8),
		9: new Varint('MaxWhizzBangsPerFrame', 9, { signed: true }),
		10: new Boolean('GameLowPolyWaves', 10),
		12: new Float('TargetDPI', 12),
		13: new Varint('TextureQuality', 13),
		14: new Varint('AntiAliasing', 14),
		15: new Varint('AnisotropicTextures', 15),
		16: new Varint('VSync', 16),
		18: new Boolean('FallbackFonts', 18),
		19: new Varint('MenuFps', 19),
		21: new Varint('uiBlur', 21),
		22: new Varint('uiFeedbackAnimations', 22),
		23: new Group('switchHoldScaling', 23, {
			1: new Boolean('basicSwitchHolds', 1)
		})
		//23 is empty
	}),
}