module.exports = {
 config: {
 name: "top",
 version: "1.0",
 author: "Loufi",
 role: 0,
 shortDescription: {
 en: "Top 15 Rich Users"
 },
 longDescription: {
 en: ""
 },
 category: "group",
 guide: {
 en: "{pn}"
 }
 },
 onStart: async function ({ api, args, message, event, usersData }) {
 const allUsers = await usersData.getAll();

 const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 15);

 const topUsersList = topUsers.map((user, index) => `${index + 1}. ${user.name}: ${user.money}`);

 const messageText = `💚𝗧𝗼𝗽 15 𝗱𝗲𝘀 𝘂𝘁𝗶𝗹𝗶𝘀𝗮𝘁𝗲𝘂𝗿𝘀 𝗹𝗲𝘀 𝗽𝗹𝘂𝘀 𝗿𝗶𝗰𝗵𝗲𝘀💚:\n${topUsersList.join('\n')}`;

 message.reply(messageText);
 }
};
