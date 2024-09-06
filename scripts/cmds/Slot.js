module.exports = {
  config: {
    name: "slot",
    version: "1.1",
    author: "Ronald",
    role: 0,
    shortDescription: "𝐉𝐨𝐮𝐞 𝐚𝐮 𝐉𝐞𝐮𝐱 𝐒𝐥𝐨𝐭",
    longDescription: "𝐉𝐨𝐮𝐞 𝐚𝐮 𝐉𝐞𝐮𝐱 𝐒𝐥𝐨𝐭",
    category: "game",
    guide: {
      en: "{p}slot {money} / reply to gift box by number"
    }
  },

  onStart: async function ({ args, message, event, api, usersData }) {
    try {
      const amount = parseInt(args[0]);
      if (isNaN(amount) || amount <= 0) {
        return message.reply("🍀𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐅𝐨𝐮𝐫𝐧𝐢𝐫 𝐮𝐧 𝐦𝐨𝐧𝐭𝐚𝐧𝐭 𝐝'𝐚𝐫𝐠𝐞𝐧𝐭 𝐕𝐚𝐥𝐢𝐝𝐞..💚");
      }

      const senderID = event.senderID;

      const userData = await usersData.get(senderID);

      if (amount > userData.money) {
        return message.reply("ũ𝐃𝐞́𝐬𝐨𝐥𝐞́ 𝐭𝐮 𝐧'𝐚 𝐩𝐥𝐮𝐬 𝐝'𝐚𝐫𝐠𝐞𝐧𝐭 𝐩𝐨𝐮𝐫 𝐣𝐨𝐮𝐞𝐫 𝐚̀ 𝐜𝐞 𝐣𝐞𝐮𝐱..💚");
      }

      const sentMessage = await message.reply("🎁 🎁 🎁");

      const emojis = ['❌', '❌', '💵'];
      emojis.sort(() => Math.random() - 0.5); 

      const shuffledEmojis = emojis.join('');

      const gemPosition = emojis.indexOf('💵');

      global.GoatBot.onReply.set(sentMessage.messageID, {
        commandName: "slot",
        messageID: sentMessage.messageID,
        correctAnswer: gemPosition,
        amount: amount,
        senderID: senderID
      });

    } catch (error) {
      console.error("😐𝐋𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐒𝐥𝐨𝐭:", 𝐄𝐫𝐫𝐞𝐮𝐫);
      message.reply("😐𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐬'𝐞𝐬𝐭 𝐩𝐫𝐨𝐝𝐮𝐢𝐭𝐞❌");
    }
  },

  onReply: async function ({ message, event, Reply, api, usersData }) {
    try {
      if (!event || !message || !Reply) return; 
      const userAnswer = event.body.trim();

      if (isNaN(userAnswer) || userAnswer < 1 || userAnswer > 3) {
        return message.reply(" 💚 𝗥𝗲𝗽𝗼𝗻𝗱𝗲𝘇 𝗽𝗮𝗿  1 ; 2 𝗼𝘂 3.");
      }

      const gemPosition = Reply.correctAnswer;
      const chosenPosition = parseInt(userAnswer) - 1; 

      const senderID = Reply.senderID;
      const userData = await usersData.get(senderID);

      if (chosenPosition === gemPosition) {
        const winnings = Reply.amount * 2000;
        await usersData.set(senderID, { money: userData.money + winnings }); 
        await message.reply(`🎉 𝗙𝗲́𝗹𝗶𝗰𝗶𝘁𝗮𝘁𝗶𝗼𝗻𝘀 𝘁𝘂 𝗮𝘀 𝗴𝗮𝗴𝗻𝗲́ 🍀${winnings}🍀 𝗯𝗮𝗹𝗹𝗲𝘀 💚 𝗕𝗶𝗲𝗻 𝗷𝗼𝘂𝗲́ !!!.`);
      } else {
        const lostAmount = Reply.amount;
        await usersData.set(senderID, { money: userData.money - lostAmount });
        await message.reply(`❌𝐃𝐞𝐬𝐨𝐥𝐞́ 𝐭𝐮 𝐚 𝐩𝐞𝐫𝐝𝐮 ${lostAmount} 𝐛𝐚𝐥𝐥𝐞𝐬 𝐦𝐞𝐫𝐜𝐢 𝐩𝐨𝐮𝐫 𝐭𝐨𝐧 𝐟𝐫𝐢𝐜.😂`);
      }

      const emojis = ['❌', '❌', '💵'];
      const revealedEmojis = emojis.map((emoji, index) => (index === gemPosition) ? '💵' : '❌').join('');
      await api.editMessage(revealedEmojis, Reply.messageID);
    } catch (error) {
      console.error("Error while handling user reply:", error);
    }
  }
};
