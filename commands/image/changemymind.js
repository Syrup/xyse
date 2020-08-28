const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
  
    let text = args.join(" ");

        if (!text) {
            return message.channel.send("**Enter Text**");
        }
    if (message.length > 4) {
return message.channel.send("kepanjangan")}
        let m = await message.channel.send("**Please Wait...**");
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "cmm.png");
            message.channel.send(attachment);
            m.delete({ timeout: 5000 });
        } catch (e) {
            m.edit(e.message);
        }
    
  }
exports.help = {
    name: "changemymind",
    usage: "changemymind <text>",
    example: "changemymind hi",
    description: `Change my mind!!`,
}
  exports.conf = {
  aliases: ["cmm"],
  cooldown: 3
}