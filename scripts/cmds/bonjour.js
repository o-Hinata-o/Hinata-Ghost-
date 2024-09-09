module.exports = {
	config: {
			name: "bonjour",
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
	if (event.body && event.body.toLowerCase() == "bonjour") return message.reply("𝗛𝗶𝗻𝗮𝘁𝗮: Bonjour, j'espère que tu passes une excellente journée\n𝗚𝗵𝗼𝘀𝘁: Salut mec! 👋 \nÇa roule..? Besoin de conseil...?");
}
};
