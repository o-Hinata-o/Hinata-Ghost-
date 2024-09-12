const axios = require('axios');

// Define the fonts mapping
const fonts = {
    a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢",
    j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫",
    s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "y", z: "𝐳",
    A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈",
    J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑",
    S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙",
};

async function fetchFromAI(url, params) {
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getAIResponse(input, userId, messageID) {
    const services = [
        { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
        { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
        { url: 'http://fi1.bot-hosting.net:6518/gpt', params: { query: input } },
        { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
    ];

    let response = "𝗕𝗼𝗻𝗷𝗼𝘂𝗿! 𝗝𝗲 𝘀𝘂𝗶𝘀 𝗹à 𝗽𝗼𝘂𝗿 𝘁'𝗮𝗶𝗱𝗲𝗿 𝗲𝘁 𝗿é𝗽𝗼𝗻𝗱𝗿𝗲 à 𝘁𝗲𝘀 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻𝘀. 𝗡'𝗵é𝘀𝗶𝘁𝗲 𝗽𝗮𝘀 à 𝗺𝗲 𝗱𝗲𝗺𝗮𝗻𝗱𝗲𝗿 𝗰𝗲 𝗾𝘂𝗲 𝘁𝘂 𝘃𝗲𝘂𝘅!....🍀\nSi tu veux une version plus décontracté de moi appelle moi Ghost...🍀";
    let currentIndex = 0;

    for (let i = 0; i < services.length; i++) {
        const service = services[currentIndex];
        const data = await fetchFromAI(service.url, service.params);
        if (data && (data.gpt4 || data.reply || data.response)) {
            response = data.gpt4 || data.reply || data.response;
            break;
        }
        currentIndex = (currentIndex + 1) % services.length; // Move to the next service in the cycle
    }

    // Convert response to special fonts
    const convertedResponse = Array.from(response)
        .map(char => fonts[char] || char) // Use special font or original character if not in fonts
        .join('');

    return { response: convertedResponse, messageID };
}

module.exports = {
    config: {
        name: 'hinata',
        author: 'aesther',
        role: 0,
        category: 'ai',
        shortDescription: 'ai to ask anything',
    },
    onStart: async function ({ api, event, args }) {
        const input = args.join(' ').trim();
        if (!input) {
            api.sendMessage(`🫰✰`, event.threadID, event.messageID);
            return;
        }

        const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
        api.sendMessage(`✰...𝐇𝐢𝐧𝐚𝐭𝐚 𝐩𝐫𝐨𝐜𝐞̀𝐝𝐞 𝐚 𝐯𝐨𝐭𝐫𝐞 𝐫𝐞𝐪𝐮𝐞̂𝐭𝐞...✰`, event.threadID, messageID);
    },
    onChat: async function ({ event, message }) {
        const messageContent = event.body.trim().toLowerCase();
        if (messageContent.startsWith("hinata")) {
            const input = messageContent.replace(/^hinata\s*/, "").trim();
            const { response, messageID } = await getAIResponse(input, event.senderID, message.messageID);
            // Construct message with special fonts
            const formattedResponse = ` ✿❯─-───💚───-─❮✿\n𝐉'𝐞𝐬𝐩𝐞̀𝐫𝐞 𝐪𝐮𝐞 𝐜𝐞𝐭𝐭𝐞 𝐫𝐞́𝐩𝐨𝐧𝐬𝐞\n 𝐭𝐞 𝐬𝐚𝐭𝐢𝐬𝐟𝐚𝐢𝐭\n✿─-───💚───-─✿\n✿─❮${response}💚❯─✿\n✿─-───💚───-─✿\n𝐌𝐞𝐫𝐜𝐢 𝐝'𝐚𝐯𝐨𝐢𝐫 𝐩𝐚𝐭𝐢𝐞𝐧𝐭𝐞́\n✿❯─-───💚───-─❮✿`;
            message.reply(formattedResponse, messageID);
        }
    }
};
