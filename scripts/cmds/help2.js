const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ ♥| 𝐒𝐇𝐈𝐙𝐔𝐊𝐀 ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
	config: {
		name: "help2",
		version: "1.17",
		author: "NTKhang", // original author Kshitiz 
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "View command usage and list all commands directly",
		},
		longDescription: {
			en: "View command usage and list all commands directly",
		},
		category: "info",
		guide: {
			en: "{pn} / help cmdName ",
		},
		priority: 1,
	},

	onStart: async function ({ message, args, event, threadsData, role }) {
		const { threadID } = event;
		const threadData = await threadsData.get(threadID);
		const prefix = getPrefix(threadID);

		if (args.length === 0) {
			const categories = {};
			let msg = "";

			msg += `\n✿ /)    /)                  (＼  (＼ \n✿(｡•ㅅ•｡)〝₎₎            (⁠ㆁ⁠ω⁠ㆁ)\n╭∪─∪─────∪─∪╮\n├─–✿🌸𝐇𝐈𝐍𝐀𝐓𝐀🌸✿─┤\n╰━━━━━━━━━━━╯\n╭━━━━━━━━━━━•❖\n│𝐋𝐢𝐬𝐭𝐞 𝐝𝐞𝐬 𝐜𝐦𝐝𝐬\n╰━━━━━━━━━━━╮`; // replace with your name 

			for (const [name, value] of commands) {
				if (value.config.role > 1 && role < value.config.role) continue;

				const category = value.config.category || "Uncategorized";
				categories[category] = categories[category] || { commands: [] };
				categories[category].commands.push(name);
			}

			Object.keys(categories).forEach((category) => {
				if (category !== "info") {
					msg += `\n╭━━━━━━━━━━━╯\n│ ⊱–{ ${category.toUpperCase()} }–⊰`;


					const names = categories[category].commands.sort();
					for (let i = 0; i < names.length; i += 3) {
						const cmds = names.slice(i, i + 3).map((item) => `\n│✰${item}`);
						msg += `${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
					}

					msg += `\n╰━━━━━━━━━━━╮`;
				}
			});

			const totalCommands = commands.size;
			msg += `❖━━━━━━━━━━━╯\n╭━━━━━━━━━━━•❖\n│𝐈𝐍𝐅𝐎\n│𝐒𝐔𝐏𝐏𝐋𝐄́𝐌𝐄𝐍𝐓𝐀𝐈𝐑𝐄\n├━━━━━━━━━━━•❖\n│𝐀𝐜𝐭𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝐣'𝐚𝐢 ${totalCommands}\n│𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 𝐝𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐥𝐞𝐬\n├━━━━━━━━━━━•❖`;
			msg += `\n│𝐓𝐚𝐩𝐞 ${prefix} 𝗵𝗲𝗹𝗽+𝐧𝐨𝐦\n│𝐝𝐞 𝐥𝐚 𝐜𝐦𝐝 𝐩𝐨𝐮𝐫 𝐯𝐨𝐢𝐫 𝐥𝐞𝐬 \n│𝐝𝐞́𝐭𝐚𝐢𝐥𝐬 𝐝𝐞 𝐥𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞\n├━━━━━━━━━━━•❖\n`;
			msg += `│https://\n│www.facebook.com/\n│simon.junior27?mibextid=\n│ZbWKwL\n╰━━━━━━━━━━━•❖`; // its not decoy so change it if you want 

			const helpListImages = [
				'https://imgur.com/a/sdVoLzm',

				'https://imgur.com/a/Gw1JeJL',

				'https://imgur.com/a/6ReTf3i',

				'https://imgur.com/a/DUkF2Tc',

				'https://imgur.com/a/VxrNDsD',
													'https://i.imgur.com/OSWG34k.jpeg',

				'https://imgur.com/a/bNFZDWA',

				'https://imgur.com/a/DWzm9Ms',

				'https://imgur.com/a/GDGCTYN',

				'https://imgur.com/a/Gw1JeJL',

				'https://imgur.com/a/KQdtCRL',                                    
				'https://imgur.com/a/DpIZVDU', 

				'https://imgur.com/a/bNFZDWA',
			];

			const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

			await message.reply({
				body: msg,
				attachment: await global.utils.getStreamFromURL(helpListImage),
			});
		} else {
			const commandName = args[0].toLowerCase();
			const command = commands.get(commandName) || commands.get(aliases.get(commandName));

			if (!command) {
				await message.reply(`Command "${commandName}" not found.`);
			} else {
				const configCommand = command.config;
				const roleText = roleTextToString(configCommand.role);
				const author = configCommand.author || "Unknown";

				const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

				const guideBody = configCommand.guide?.en || "No guide available.";
				const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

				const response = `╭── NAME ────⭓
	│ ${configCommand.name}
	├── INFO
	│ Description: ${longDescription}
	│ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
	│ Other names in your group: Do not have
	│ Version: ${configCommand.version || "1.0"}
	│ Role: ${roleText}
	│ Time per command: ${configCommand.countDown || 1}s
	│ Author: ${author}
	├── Usage
	│ ${usage}
	├── Notes
	│ The content inside <XXXXX> can be changed
	│ The content inside [a|b|c] is a or b or c
	╰━━━━━━━❖`;

				await message.reply(response);
			}
		}
	},
};

function roleTextToString(roleText) {
	switch (roleText) {
		case 0:
			return "0 (All users)";
		case 1:
			return "1 (Group administrators)";
		case 2:
			return "2 (Admin bot)";
		default:
			return "Unknown role";
	}
}
