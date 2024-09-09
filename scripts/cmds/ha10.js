module.exports = {
	config: {
			name: "inata", 
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
	if (event.body && event.body.toLowerCase() == "inata") return message.reply("𝗖'𝗲𝘀𝘁 𝗵𝗶𝗻𝗮𝘁𝗮 😑");
}
};
