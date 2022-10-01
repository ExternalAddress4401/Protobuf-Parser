const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');
const Boolean = require('../types/Boolean');
const RequireCampaignBoxProgress = require('./pieces/RequireCampaignBoxProgress');
const SharedRequirement = require('./pieces/SharedRequirement');
const RequireSongsLeftToUnlock = require('./pieces/RequireSongsLeftToUnlock');
const RequireShowdown = require('./pieces/RequireShowdown');

module.exports = {
	3: new Repeating('songs', 3, {
		1: new Varint('id', 1),
		5: new Varint('unknown', 5),
		21: new Varint('song_id', 21),
		37: new String('name', 37),
		46: new Varint('chart_id', 46)
	}),
	25: new Repeating('songInfo', 25, {
		1: new Varint('id', 1),
		5: new Float('BPM', 5),
		7: new PackedMessage('unknown', 7, {
			1: new Varint('unknown1', 1),
			2: new Varint('unknown2', 2)
		}),
		19: new String('CoverArtAsset_id', 19),
		22: new Varint('unknown5', 22),
		39: new String('BaseColor', 39),
		40: new String('DarkColor', 40),
		45: new Group('ColorGradient', 45, {
			2: new PackedMessage('AlphaKeys', 2, {
				1: new Float('Alpha', 1),
				2: new Float('Time', 2)
			}),
			3: new PackedMessage('ColorKeys', 3, {
				1: new String('Color', 1),
				2: new Float('Time', 2),
			})
		}),
		50: new Varint('genreTagsId', 50, { repeating: true, packed: true }),
		53: new Group('wwiseSwitch', 53, {
			1: new Varint('switchId', 1),
			2: new Varint('switchState', 2),
		}),
		56: new String('CheckpointOutlineColour', 56),
		60: new Group('ColorGradientInGame', 45, {
			2: new PackedMessage('AlphaKeys', 2, {
				1: new Float('Alpha', 1),
				2: new Float('Time', 2)
			}),
			3: new PackedMessage('ColorKeys', 3, {
				1: new String('Color', 1),
				2: new Float('Time', 2),
			})
		}),
		61: new Group('StreakConfig', 61, {
			2: new String('glowColor', 2),
			3: new String('perfectBarColor', 3),
			4: new Varint('invertPerfectBarColor', 4),
			5: new String('vfxColor', 5)
		}, { repeating: true }),
		62: new String('trackIntensityGlow', 62),
		63: new String('vfxColor', 63),
		64: new String('vfxAlternativeColor', 64),
		65: new Varint('Audiobanks_id', 65, { repeating: true, packed: true }),
		66: new String('bibleId', 66),
		67: new String('idLabel', 67),
		68: new String('isrc', 68),
		69: new Varint('legalState', 69),
		71: new Varint('unknown1', 71),
		72: new String('legalAttribution', 72),
		74: new Float('unknown2', 74),
		76: new String('songTitleLocId', 76),
		77: new String('songArtistLocId', 77),
		78: new Boolean('Rejected', 78),
		79: new Varint('musicKitDataId', 79),
		80: new Varint('Groups_id', 80, { repeating: true, packed: true }),
		83: new String('removalReason', 83),
		84: new Varint('unknown3', 84)
	}),
	/*88: new PackedMessage('difficulties', 88, {
		1: new Varint('id', 1),
		3: new Varint('difficulty', 3),
		5: new String('textColour', 5),
		6: new Boolean('displayTag', 6),
		7: new Group('backgroundGradient', 7, {
			2: new PackedMessage('AlphaKeys', 2, {
				1: new Float('Alpha', 1),
				2: new Float('Time', 2)
			}),
			3: new PackedMessage('ColorKeys', 3, {
				1: new String('Color', 1),
				2: new Float('Time', 2)
			})
		}),
		8: new String('iconSprite_id', 8),
		9: new String('iconColour', 9),
		15: new String('idLabel', 15),
		17: new String('boxVisualBakedImage_id', 17),
		18: new Group('boxVisualBackgroundGradient', 18, {
			2: new PackedMessage('AlphaKeys', 2, {
				1: new Float('Alpha', 1),
				2: new Float('Time', 2)
			}),
			3: new PackedMessage('ColorKeys', 3, {
				1: new String('Color', 1),
				2: new Float('Time', 2)
			})
		}),
		19: new Group('botScoreCurve', 19, {
			1: new Varint('preWrapMode', 1),
			2: new Varint('postWrapMode', 2),
			3: new Group('keyFrames', 3, {
				1: new Float('value', 1),
				2: new Float('inTangent', 2),
				3: new Float('outTangent', 3),
				5: new Float('time', 5)
			}, { repeating: true })
		}),
		21: new String('nameLoc_id', 21),
		23: new String('campaignUnlockRequirement', 23)
	}),*/
	/*119: new PackedMessage('boxes', 119, {
		1: new Varint('id', 1),
		2: new String('idLabel', 2),
		18: new Group('BeatmapPicker', 18, {
			1: new PackedMessage('SelectionGroups', 1, {
				1: new Varint('CuratedSongs_id', 1, { repeating: true, packed: true }),
				2: new Boolean('AvailableSongs', 2),
				4: new Varint('DifficultyModes_id', 4, { repeating: true, packed: true }),
				6: new Varint('BeatmapCount', 6, { signed: true })
			}),
			6: new Varint('PullCount', 6),
			7: new Varint('Difficulty_id', 7)
		}),
		22: new Varint('CampaignBoxCountdownDurationMsecs', 22),
		24: new String('boxVisualBakedImage_id', 24),
		25: new Group('boxVisualBackgroundGradient', 25, {
			2: new PackedMessage('AlphaKeys', 2, {
				1: new Float('Alpha', 1),
				2: new Float('Time', 2)
			}),
			3: new PackedMessage('ColorKeys', 3, {
				1: new String('Color', 1),
				2: new Float('Time', 2)
			})
		}),
		28: new PackedMessage('Cadence', 28, {
			1: new Group('Requirements', 1, {
				2: new PackedMessage('info', 2, {
					1: new Varint('type', 1),
					2: { name: 'piece' }
				}, {
					enums: {
						4: SharedRequirement,
						25: RequireCampaignBoxProgress,
						29: RequireSongsLeftToUnlock,
						30: RequireShowdown
					}
				})
			}),
		}),
		29: new Varint('PopulationSetting', 29),
		30: new Boolean('DisableForcePick', 30),
		33: new Group('DropCards', 33, {
			2: new PackedMessage('fixedCards', 2, {
				1: new Varint('card_id', 1),
				2: new Varint('count', 2)
			}),
			4: new Varint('fixedOptions_id', 4, { repeating: true })
		}),
		34: new PackedMessage('openingSkipCostsOverride', 34, {
			1: new Varint('from', 1),
			2: new Float('multiplier', 2)
		}),
		37: new String('nameLoc_id', 37),
		38: new String('descLoc_id', 38),
		41: new Varint('boxOpeningVisualRef_id', 41)
	})*/
}