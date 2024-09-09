module.exports = {
	config: {
			name: "😍", 
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
	if (event.body && event.body.toLowerCase() == "😍") return message.reply("˚∧＿∧  　+        —̳͟͞͞💗\n(  •‿• )つ  —̳͟͞͞ 💗         —̳͟͞͞💗 +\n(つ　 <                —̳͟͞͞💗\n｜　 _つ      +  —̳͟͞͞💗         —̳͟͞͞💗 ˚\n`し´");
}
};
