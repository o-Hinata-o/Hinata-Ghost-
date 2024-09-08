const axios = require('axios');

const Prefixes = [
  'Ghost Hinata', 
  'ghost',
  'Le fantôme',
  'Ghost',
  'Ghost',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("𝗬𝗼, 𝗷𝗲 𝘀𝘂𝗶𝘀 𝗹𝗮̀ 𝗽𝗼𝘂𝗿 𝘁'𝗮𝗶𝗱𝗲𝗿 𝗮̀ 𝘁𝗲 𝗱𝗲́𝘁𝗲𝗻𝗱𝗿𝗲 𝗲𝘁 𝗸𝗶𝗳𝗳𝗲𝗿 𝗹𝗮 𝘃𝗶𝗱𝗲. 𝗔𝗹𝗼𝗿𝘀 𝗽𝗼𝘀𝗲-𝗺𝗼𝗶 𝘁𝗲𝘀 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻, 𝗹𝗮̂𝗰𝗵𝗲-𝘁𝗼𝗶, 𝗲𝘁 𝗲𝗻𝘀𝗲𝗺𝗯𝗹𝗲 𝗼𝗻 𝘃𝗮 𝗽𝗮𝘀𝘀𝗲𝗿 𝘂𝗻 𝗽𝘂𝘁𝗮𝗶𝗻 𝗱𝗲 𝗯𝗼𝗻 𝗺𝗼𝗺𝗲𝗻𝘁....🍀");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
