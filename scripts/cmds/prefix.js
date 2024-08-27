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
MON PREFIX→ 💚☠︎[-]☠︎💚\n
QUELQUES COMMANDES QUI PEUVENT VOUS AIDER 💚:
➥ -help [numero de page] -> Voir command💚
➥ -sim [message] -> Parler au bot 💚
➥ -callad [message] -> Signaler tout problème rencontré 💚
➥ -help [command] -> Information et utilisation de la cmd 💚\n\nAmusez-vous bien à l'utiliser !💚\n Développeur du bot 💚: https://www.facebook.com/simon.junior27`,
 attachment: await global.utils.getStreamFromURL("https://i.ibb.co/094w2Yn/4731fcfda250bd06367b60eaa3711b75.jpg")
 });
 }
 }
}
