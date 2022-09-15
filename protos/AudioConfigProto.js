const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');
const Boolean = require('../types/Boolean');

module.exports = {
	1: new PackedMessage('AudioTriggers', 1, {
		1: new Varint('id', 1),
		6: new Varint('audioEvent_id', 6),
		5: new Group('wwiseSwitch', 5, {
			1: new Varint('switchId', 1),
			2: new Varint('switchState', 2)
		}),
		7: new String('idLabel', 7)
	}),
	2: new PackedMessage('AudioEvents', 2, {
		1: new Varint('id', 1),
		3: new Group('wwiseEvent', 3, {
			1: new Varint('eventId', 1)
		}),
		6: new String('idLabel', 6)
	}),
	3: new PackedMessage('AudioBanks', 3, {
		1: new Varint('id', 1),
		3: new String('asset_id', 3),
		4: new String('idLabel', 4)
	}),
	100: new String('version', 100),
	109: new PackedMessage('EQEntries', 109, {
		1: new Varint('id', 1),
		2: new Varint('order', 2),
		3: new Group('rtpc', 3, {
			1: new Varint('rtpcId', 1)
		}),
		4: new Float('amountOfEq', 4),
		5: new String('idLabel')
	}),
	1001: new Group('Settings', 1001, {
		5: new Varint('CompanyLogoBank_id', 5),
		6: new Varint('GameLogoBank_id', 6),
		7: new Varint('PersistentBank_id', 7),
		8: new Varint('InitBank_id', 8),
		9: new Varint('MusicSystemMeta_id', 9),
		10: new Varint('MuteTrigger_id', 10),
		11: new Varint('UnmuteTrigger_id', 11),
		12: new Varint('PlaceholderSongBank_id', 12),
		13: new Varint('CompanyLogoFlowEnterTrigger_id', 13),
		14: new Varint('CompanyLogoFlowExitTrigger_id', 14),
		15: new String('bootupPreloadAssets_id', 15, { repeating: true }),
		16: new String('loadscreenPreloadAssets_id', 16, { repeating: true }),
		17: new Varint('BootLogoFlowEnter_id', 17),
		18: new Varint('BootLogoFlowExit_id', 18),
		19: new String('LoadingScreenTitle_id', 19),
	}),
	1002: new String('EventSystem_id', 1002),
	1003: new String('GameCanvas_id', 1003)
}