const { getTime } = global.utils;

module.exports = {
	config: {
		name: "logsbot",
		isBot: true,
		version: "1.4",
		author: "NTKhang",
		envConfig: {
			allow: true
		},
		category: "events"
	},

	langs: {
		vi: {
			title: "====== Nhật ký bot ======",
			added: "\n✅\nSự kiện: bot được thêm vào nhóm mới\n- Người thêm: %1",
			kicked: "\n❌\nSự kiện: bot bị kick\n- Người kick: %1",
			footer: "\n- User ID: %1\n- Nhóm: %2\n- ID nhóm: %3\n- Thời gian: %4"
		},
		en: {
			title: "\n.   /)    /)\n. (｡•ㅅ•｡)〝₎₎ 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 ! .°-`✦\n╭∪━∪━━━━━━━━━✦⁺.",
			added: "\n├───────────✦⁺.\n┊𝗝'𝗮𝗶 𝗲́𝘁𝗲́ 𝗮𝗷𝗼𝘂𝘁𝗲́ 𝗱𝗮𝗻𝘀 𝘂𝗻\n┊𝗻𝗼𝘂𝘃𝗲𝗮𝘂 𝗴𝗿𝗼𝘂𝗽𝗲 𝗽𝗮𝗿\n┊[%1]",
			kicked: "\n├───────────✦⁺.\n┊𝗝'𝗮𝗶 𝗲́𝘁𝗲́ 𝘃𝗶𝗿𝗲́ 𝗱'𝘂𝗻 𝗴𝗿𝗼𝘂𝗽𝗲\n┊ 𝗽𝗮𝗿\n┊[%1]",
			footer: "\n├───────────✦⁺.\n┊𝗦𝗼𝗻 𝘂𝗶𝗱:\n┊%1\n├───────────✦⁺.\n┊𝗟𝗲 𝗴𝗿𝗼𝘂𝗽𝗲 𝘀'𝗮𝗽𝗽𝗲𝗹𝗹𝗲\n┊%2\n├───────────✦⁺.\n┊𝗚𝗿𝗼𝘂𝗽𝗲 𝗜𝗗:\n┊ %3\n├───────────✦⁺.\n┊𝗧𝗲𝗺𝗽𝘀 \n┊%4\n├━━━━━━━━━━━✦⁺.\n│(⁠づ⁠￣⁠ ⁠³⁠￣⁠)⁠づ💚ლ⁠(⁠´⁠ ⁠❥⁠ ⁠`⁠ლ⁠)\n╰━━━━━━━━━━━✦⁺."
		}
	},

	onStart: async ({ usersData, threadsData, event, api, getLang }) => {
		if (
			(event.logMessageType == "log:subscribe" && event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
			|| (event.logMessageType == "log:unsubscribe" && event.logMessageData.leftParticipantFbId == api.getCurrentUserID())
		) return async function () {
			let msg = getLang("title");
			const { author, threadID } = event;
			if (author == api.getCurrentUserID())
				return;
			let threadName;
			const { config } = global.GoatBot;

			if (event.logMessageType == "log:subscribe") {
				if (!event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
					return;
				threadName = (await api.getThreadInfo(threadID)).threadName;
				const authorName = await usersData.getName(author);
				msg += getLang("added", authorName);
			}
			else if (event.logMessageType == "log:unsubscribe") {
				if (event.logMessageData.leftParticipantFbId != api.getCurrentUserID())
					return;
				const authorName = await usersData.getName(author);
				const threadData = await threadsData.get(threadID);
				threadName = threadData.threadName;
				msg += getLang("kicked", authorName);
			}
			const time = getTime("DD/MM/YYYY HH:mm:ss");
			msg += getLang("footer", author, threadName, threadID, time);

			for (const adminID of config.adminBot)
				api.sendMessage(msg, adminID);
		};
	}
};
