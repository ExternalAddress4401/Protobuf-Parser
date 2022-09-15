const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const BeatmapRewardTemplate = require('./pieces/BeatmapRewardTemplate');
const GachaBoxRewardTemplate = require('./pieces/GachaBoxRewardTemplate');
const HardGatePassRewardTemplate = require('./pieces/HardGatePassRewardTemplate');
const LiveOpsSongShuffleEventTemplate = require('./pieces/LiveOpsSongShuffleEventTemplate');
const LiveOpsLeaderboardEventTemplate = require('./pieces/LiveOpsLeaderboardEventTemplate');
const Boolean = require('../types/Boolean');

module.exports = {
    3: new PackedMessage('LiveOpsEvents', 3, {
        1: new Varint('type', 1),
        2: { name: 'piece' },
        3: new Varint('id', 3),
        4: new String('idLabel', 4),
        5: new String('nameTxt', 5),
        6: new String('name_id', 6),
        7: new Varint('startTimeMsecs', 7),
        8: new Varint('endTimeMsecs', 8),
        9: new Boolean('useLocalTime', 9)
    }, {
        enums: {
            2: LiveOpsSongShuffleEventTemplate,
            3: LiveOpsLeaderboardEventTemplate
        }
    }),
    100: new String('version', 100)
}