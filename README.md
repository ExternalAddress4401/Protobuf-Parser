# Beatstar Protobuf Parser

This utility takes the .bytes file used by Beatstar and decodes them into a readable format using the internal variable names.

Requirements:

Node.js: https://nodejs.org/en/

Open a Command Prompt/Powershell window and execute `node -v` to test if you already have this.

To decode a file:

1. Open index.js
2. Change line 47 to be the path to your file
3. Change line 28 to the proto for the file you're trying to decrypt. If it's a GameConfig you need to use GameConfigProto and an AssetsPatchConfig would be AssetsPatchProto.
4. Open a Command Prompt/Powershell window in this folder and execute `node index.js`
5. Your file will be saved as parsed.txt

All the protos are stored in the /protos folder. If you're trying to use one that isn't imported already you can add an import at the top just like the others.

Notes:

Beatstar protos don't follow traditional protobuf formats. A large difference is some fields are marked as a field of 1 which actually specifies the type of class this message represents. Field 2 is then a message with fields that differ based on the field 1 variable. This has been handled with the `{ name: piece `}` format which correspond to the supplied enums. This is admittedly probably not very good.
