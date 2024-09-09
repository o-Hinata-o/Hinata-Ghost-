module.exports = {
	config: {
			name: "salut",
			version: "1.0",
			author: "Jaychris Garcia",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "salut") return message.reply("𝗛𝗶𝗻𝗮𝘁𝗮: salut 😊\n𝗚𝗵𝗼𝘀𝘁: salut mec 👋");
}
};
