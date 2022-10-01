const fs = require("fs");
const ProtobufReader = require("./ProtobufReader");
const ProtobufWriter = require("./ProtobufWriter");
const NewsProto = require("./protos/NewsProto");
const ChartProto = require("./protos/ChartProto");
const LangProto = require("./protos/LangProto");
const GameConfigProto = require("./protos/GameConfigProto");
const LiveOpsDeeplinkRewardConfigProto = require("./protos/LiveOpsDeeplinkRewardConfigProto");
const AssetsPatchProto = require("./protos/AssetsPatchProto");
const LiveOpsBundleConfigProto = require("./protos/LiveOpsBundleConfigProto");
const CMSRequestProto = require("./protos/CMSRequestProto");
const ScalingConfig = require("./protos/ScalingConfigProto");
const AudioConfigProto = require("./protos/AudioConfigProto");
const NotificationConfigProto = require("./protos/NotificationConfigProto");
const FontFallbackConfigProto = require("./protos/FontFallbackConfigProto");
const LiveOpsEventProto = require("./protos/LiveOpsEventProto");

const { getSeasonSongs } = require('./utilities/GameConfig');
const { addUrlsToSongs } = require('./utilities/General');
const { getRewards } = require('./utilities/LiveOpsEventConfig');

function read(fileName) {
	const t = fs.readFileSync(fileName);

	const read = new ProtobufReader(t);
	read.process();

	const p = read.parseProto(AssetsPatchProto);
	
	//console.log(getSeasonSongs(p));
		
	fs.writeFileSync('parsed.txt', JSON.stringify(p, null, 2));
}

function build(fileName) {
	const t = JSON.parse(fs.readFileSync(fileName).toString());
	
	const writer = new ProtobufWriter(t);
	
	console.log(writer);

	writer.build(GameConfigProto);
	
	fs.writeFileSync('built.bytes', writer.buffer);
}

read('./tests/AssetsPatchConfig.bytes');

//build('./a.txt');