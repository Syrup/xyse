const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.author;
  }
  
  let avatar = user.displayAvatarURL({size: 4096, dynamic: true});

  
  const embed = new Discord.MessageEmbed()
  .setDescription(`[**${user.tag}'s Avatar**](${avatar})`)
  .setColor('#7289da')
  .setImage(avatar)
  .setFooter("© copyright 2020 Xyse Development")
  return message.channel.send(embed);
}

exports.help = {
  name: "avatar",
  description: "Display some avatar!",
  usage: "avatar [@user | user ID]",
  example: "avatar @5440#5440"
}

exports.conf = {
  aliases: ["icon", "profile"],
  cooldown: 3
}
