const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
  credits: '𝗮𝗲𝘀𝘁𝗵𝗲𝗿',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`♡   ∩_∩\n    （„• ֊ •„)♡\n┏━∪∪━━━━ღ❦ღ┓`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(``, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://hashier-api-globalgpt.vercel.app/api/globalgpt?q=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage('♡   ∩_∩\n    （„• ֊ •„)♡\n┏━∪∪━━━━ღ❦ღ┓\n🌐['+ response +'] ♡\n♡   𝘢𝘦𝘴𝘵𝘩𝘦𝘳-[📩]\n┗ღ❦ღ━━━━━━━┛\n[✦]|𝗚𝗣𝗧-𝟰 ', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
