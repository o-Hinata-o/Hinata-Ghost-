module.exports = {
	config: {
		name: "kick",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		description: {
			vi: "Kick thành viên khỏi box chat",
			en: "Kick member out of chat box"
		},
		category: "box chat",
		guide: {
			vi: "   {pn} @tags: dùng để kick những người được tag",
			en: "   {pn} @tags: use to kick members who are tagged"
		}
	},

	langs: {
		vi: {
			needAdmin: "Vui lòng thêm quản trị viên cho bot trước khi sử dụng tính năng này"
		},
		en: {
			needAdmin: "(❌𝗝'𝗮𝗶 𝗯𝗲𝘀𝗼𝗶𝗻 𝗱'𝗲̂𝘁𝗿𝗲 𝗽𝗿𝗼𝗺𝘂 𝗲𝗻 𝘁𝗮𝗻𝘁 𝗾𝘂'𝗮𝗱𝗺𝗶𝗻 𝗽𝗼𝘂𝗿 𝗽𝗼𝘂𝘃𝗼𝗶𝗿 𝗸𝗶𝗰𝗸𝗲𝗿 𝘂𝗻 𝗺𝗲𝗺𝗯𝗿𝗲 𝗿𝗲𝗹𝗼𝘂 𝗱𝘂 𝗴𝗿𝗼𝘂𝗽𝗲🍀"
		}
	},

	onStart: async function ({ message, event, args, threadsData, api, getLang }) {
		const adminIDs = await threadsData.get(event.threadID, "adminIDs");
		if (!adminIDs.includes(api.getCurrentUserID()))
			return message.reply(getLang("needAdmin"));
		async function kickAndCheckError(uid) {
			try {
				await api.removeUserFromGroup(uid, event.threadID);
			}
			catch (e) {
				message.reply(getLang("needAdmin"));
				return "ERROR";
			}
		}
		if (!args[0]) {
			if (!event.messageReply)
				return message.SyntaxError();
			await kickAndCheckError(event.messageReply.senderID);
		}
		else {
			const uids = Object.keys(event.mentions);
			if (uids.length === 0)
				return message.SyntaxError();
			if (await kickAndCheckError(uids.shift()) === "ERROR")
				return;
			for (const uid of uids)
				api.removeUserFromGroup(uid, event.threadID);
		}
	}
};
