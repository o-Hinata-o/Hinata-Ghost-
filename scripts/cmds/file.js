const fs = require('fs');
const { GoatWrapper } = require('fca-liane-utils');

module.exports = {
	config: {
		name: "file",
		version: "1.0",
		author: "Mahir Tahsan",
		countDown: 5,
		role: 0,
		shortDescription: "Send bot script",
		longDescription: "Send bot specified file ",
		category: "𝗢𝗪𝗡𝗘𝗥",
		guide: "{pn} file name. Ex: .{pn} filename"
	},

	onStart: async function ({ message, args, api, event }) {
		const permission = ["61556172651835"];
		if (!permission.includes(event.senderID)) {
			return api.sendMessage(" 𝗧𝘂 𝗻'𝗮 𝗽𝗮𝘀 𝗹' 𝗮𝘂𝘁𝗼𝗿𝗶𝘀𝗮𝘁𝗶𝗼𝗻 𝗱'𝘂𝘁𝗶𝗹𝗶𝘀𝗲𝗿 𝗰𝗲𝘁𝘁𝗲 𝗰𝗺𝗱...𝗗𝗨𝗖𝗢𝗡 !", event.threadID, event.messageID);
		}

		const fileName = args[0];
		if (!fileName) {
			return api.sendMessage("𝗟𝗲 𝗻𝗼𝗺 𝗱𝘂 𝗳𝗶𝗰𝗵𝗶𝗲𝗿 𝘀𝘁𝗽...", event.threadID, event.messageID);
		}

		const filePath = __dirname + `/${fileName}.js`;
		if (!fs.existsSync(filePath)) {
			return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
		}

		const fileContent = fs.readFileSync(filePath, 'utf8');
		api.sendMessage({ body: fileContent }, event.threadID);
	}
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
