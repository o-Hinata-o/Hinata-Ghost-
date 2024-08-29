const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "pinterest",
    aliases: ["pin"],
    version: "1.0.2",
    author: "JVB",
    role: 0,
    countDown: 50,
    shortDescription: {
      en: "Search for images on Pinterest"
    },
    longDescription: {
      en: ""
    },
    category: "image",
    guide: {
      en: " {prefix} Pinterest <nom de l'image recherché> - <nombre d' image>"
    }
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const userID = event.senderID;

      const keySearch = args.join(" ");
      if (!keySearch.includes("-")) {
        return api.sendMessage(`🔍𝐄𝐧𝐭𝐫𝐞 𝐥𝐞 𝐧𝐨𝐦 𝐝𝐞 𝐥'𝐢𝐦𝐚𝐠𝐞 𝐬𝐮𝐢𝐯𝐢𝐞 𝐝𝐮 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞 𝐥'𝐢𝐦𝐚𝐠𝐞 𝐫𝐞𝐜𝐡𝐞𝐫𝐜𝐡𝐞́ 💚
:${this.config.guide.en}`, event.threadID, event.messageID);
      }
      const keySearchs = keySearch.substr(0, keySearch.indexOf('-')).trim();
      const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 6;

      const res = await axios.get(`https://celestial-dainsleif-v2.onrender.com/pinterest?pinte=${encodeURIComponent(keySearchs)}`);
      const data = res.data;

      if (!data || !Array.isArray(data) || data.length === 0) {
        return api.sendMessage(`❌𝗔𝘂𝗰𝘂𝗻𝗲 𝗶𝗺𝗮𝗴𝗲 𝗮 𝗲́𝘁𝗲́ 𝘁𝗿𝗼𝘂𝘃𝗲́𝗲..🍀"${keySearchs}"💚𝘃𝗲𝘂𝗶𝗹𝗹𝗲𝘇 𝗿𝗲𝗰𝗵𝗲𝗿𝗰𝗵𝗲𝘇 𝗮𝘂𝘁𝗿𝗲 𝗰𝗵𝗼𝘀𝗲💚📌`, event.threadID, event.messageID);
      }

      const imgData = [];

      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imageUrl = data[i].image;

        try {
          const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
          await fs.outputFile(imgPath, imgResponse.data);
          imgData.push(fs.createReadStream(imgPath));
        } catch (error) {
          console.error(error);
          // Handle image fetching errors (skip the problematic image)
        }
      }

      await api.sendMessage({
        attachment: imgData,
        body: `✅🍀𝐕𝐨𝐢𝐜𝐢 𝐪𝐮𝐞𝐥𝐪𝐮𝐞𝐬 𝐢𝐦𝐚𝐠𝐞𝐬 𝐚𝐬𝐬𝐨𝐜𝐢𝐞́𝐞𝐬 𝐚̀ 𝐯𝐨𝐬 𝐫𝐞𝐜𝐡𝐞𝐫𝐜𝐡𝐞𝐬 𝐚̀ 𝐩𝐚𝐫𝐭𝐢𝐫 𝐝𝐮 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞 𝐩𝐡𝐨𝐭𝐨 𝐝𝐞𝐦𝐚𝐧𝐝𝐞́ [ ${imgData.length} ]💚 𝐋𝐞𝐬 𝐫𝐞𝐬𝐮𝐥𝐭𝐚𝐭𝐬  𝐝𝐞 𝐥'𝐢𝐦𝐚𝐠𝐞 𝐝𝐮 𝐧𝐨𝐦 𝐝𝐞...➪💚"${keySearchs}" 𝐬𝐨𝐧𝐭 𝐥𝐞𝐬 𝐬𝐮𝐢𝐯𝐚𝐧𝐭𝐬💚📌:`
      }, event.threadID, event.messageID);

      await fs.remove(path.join(__dirname, 'cache'));
    } catch (error) {
      console.error(error);
      return api.sendMessage(`❌𝑼𝒏𝒆 𝒆𝒓𝒓𝒆𝒖𝒓 𝒔'𝒆𝒔𝒕 𝒑𝒓𝒐𝒅𝒖𝒊𝒕𝒆. 𝑽𝒆𝒖𝒊𝒍𝒍𝒆𝒛 𝒓𝒆́𝒆𝒔𝒔𝒂𝒚𝒆𝒛 𝒑𝒍𝒖𝒔 𝒕𝒂𝒓𝒅. 𝑴𝒆𝒓𝒄𝒊🍀`, event.threadID, event.messageID);
    }
  }
};
