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
 body: `
𝗠𝗢𝗡 𝗣𝗥𝗘𝗙𝗜𝗫→ 💚[-]💚\n
𝗤𝗨𝗘𝗟𝗤𝗨𝗘𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗘𝗦 𝗤𝗨𝗜 𝗣𝗘𝗨𝗩𝗘𝗡𝗧 𝗩𝗢𝗨𝗦 𝗔𝗜𝗗𝗘𝗥💚:
➪ -𝗵𝗲𝗹𝗽 [𝐧𝐮𝐦𝐞́𝐫𝐨 𝐝𝐞 𝐩𝐚𝐠𝐞] -> 𝑽𝒐𝒊𝒓 𝒄𝒐𝒎𝒎𝒂𝒏𝒅𝒆𝒔💚
➪ -𝗰𝗮𝗹𝗹𝗮𝗱 [𝐦𝐞𝐬𝐬𝐚𝐠𝐞] -> 𝑺𝒊𝒈𝒏𝒂𝒍𝒆𝒓 𝒕𝒐𝒖𝒕 𝒑𝒓𝒐𝒃𝒍𝒆̀𝒎𝒆 𝒓𝒆𝒏𝒄𝒐𝒏𝒕𝒓𝒆́ 𝒂̀ 𝒍'𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒕𝒆𝒖𝒓 💚
➪ -𝗵𝗲𝗹𝗽 [𝐜𝐨𝐦𝐦𝐚𝐧𝐝] -> 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏 𝒆𝒕 𝒖𝒕𝒊𝒍𝒊𝒔𝒂𝒕𝒊𝒐𝒏 𝒅𝒆  𝒍𝒂 𝒄𝒎𝒅 💚\n\nAmusez-vous bien à l'utiliser !💚\n Développeur du bot 💚: 【https://www.facebook.com/simon.junior27】`,
 attachment: await global.utils.getStreamFromURL("https://i.ibb.co/094w2Yn/4731fcfda250bd06367b60eaa3711b75.jpg")
 });
 }
 }
}
