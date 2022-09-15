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

const gameConfig = fs.readFileSync("./GameConfig.bytes");

const gameConfigReader = new ProtobufReader(gameConfig);
gameConfigReader.process();

const parsed = gameConfigReader.parseProto(GameConfigProto);

fs.writeFileSync('parsed.json', JSON.stringify(parsed, null, 2));