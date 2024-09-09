module.exports = {
 config: {
	 name: "prefix",
	 version: "1.0",
	 author: "Tokodori_Frtiz",//remodified by cliff
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "auto 🪐",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix") {
 return message.reply({
 body: `\n━━━━━━━━━━━━━
𝗕𝗢𝗡𝗝𝗢𝗨𝗥..𝗝𝗘..𝗦𝗨𝗜𝗦..\n🍀𝗚𝗛𝗢𝗦𝗧 𝗛𝗜𝗡𝗔𝗧𝗔🍀\n 𝗘𝗧..𝗠𝗢𝗡 𝗣𝗥𝗘𝗙𝗜𝗫..\n𝗘𝗦𝗧→ 💚(-)💚\n━━━━━━━━━━━━━
\n✿❯─-─-─「✿」─-─-─❮✿
𝗤𝗨𝗘𝗟𝗤𝗨𝗘𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗘𝗦 𝗤𝗨𝗜 𝗣𝗘𝗨𝗩𝗘𝗡𝗧 𝗩𝗢𝗨𝗦 𝗔𝗜𝗗𝗘𝗥💚:\n
➪ -𝗰𝗮𝗹𝗹𝗮𝗱 [𝐦𝐞𝐬𝐬𝐚𝐠𝐞] -> 𝑺𝒊𝒈𝒏𝒂𝒍𝒆𝒓 𝒕𝒐𝒖𝒕 𝒑𝒓𝒐𝒃𝒍𝒆̀𝒎𝒆 𝒓𝒆𝒏𝒄𝒐𝒏𝒕𝒓𝒆́ 𝒂̀ 𝒍'𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒕𝒆𝒖𝒓 💚
➪ -𝗵𝗲𝗹𝗽 [𝐜𝐨𝐦𝐦𝐚𝐧𝐝] -> 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏 𝒆𝒕 𝒖𝒕𝒊𝒍𝒊𝒔𝒂𝒕𝒊𝒐𝒏 𝒅𝒆  𝒍𝒂 𝒄𝒎𝒅 💚\n✿❯─-─-─「✿」─-─-─❮✿\n\n─━-━-━░★░━-━-━─\n 𝗟𝗶𝗲𝗻 𝗱𝗲 𝗺𝗼𝗻 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗽𝗲𝘂𝗿 𝗼𝘂 𝗰𝗿𝗲́𝗮𝘁𝗲𝘂𝗿💚\n https://www.facebook.com/simon.junior27\n─━-━-━░★░━-━-━─`,
 attachment: await global.utils.getStreamFromURL("https://i.ibb.co/j6YY8DL/cf3515d1cbdc55fcd99a70ed5a90278e.jpg")
 });
 }
 }
}
