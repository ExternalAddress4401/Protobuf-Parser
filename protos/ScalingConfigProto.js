const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');
const Boolean = require('../types/Boolean');
const FlamingoScalingModuleTemplate = require('./pieces/FlamingoScalingModuleTemplate');
const ShaderScalingModule = require('./pieces/ShaderScalingModule');
const MemoryRequirement = require('./pieces/MemoryRequirement');
const PlatformRequirement = require('./pieces/PlatformRequirement');
const ResolutionRequirement = require('./pieces/ResolutionRequirement');

module.exports = {
	1: new String('version', 1),
	2: new Repeating('levels', 2, {
		1: new String('id', 1),
		2: new Group('module', 2, {
			1: new Varint('type', 1),
			2: { name: 'piece' }
		},
		{
			repeating: true,
			enums: {
				3: PlatformRequirement,
				4: MemoryRequirement,
				7: ShaderScalingModule,
				102: FlamingoScalingModuleTemplate
			}
		})
	}),
	3: new Repeating('groups', 3, {
		1: new String('id', 1),
		2: new Varint('priority', 2),
		3: new Group('requirements', 3, {
			1: new Varint('type', 1),
			2: { name: 'piece' }
		},
		{
			repeating: true,
			enums: {
				3: PlatformRequirement,
				4: MemoryRequirement,
				7: ResolutionRequirement
			}
		}),
		4: new String('level_id', 4),
	})
}