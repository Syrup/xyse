const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send("**Channel Not Found!**");

        let channelembed = new MessageEmbed()
              .setThumbnail("https://vgy.me/9fSC7k.png")
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("**❯ NSFW**", channel.nsfw, true)
            .addField("**❯ Parent**", !channel.parent ? "None" : channel.parent.name, true)
            .addField("**❯ Channel ID**", channel.id, true)
            .addField("**❯ Channel Type**", channel.type)
            .addField("**❯ Channel Description**", `${channel.topic || "No Description"}`)
            .addField("**❯ Channel Created At**", channel.createdAt)
            .setColor("GREEN")
        message.channel.send(channelembed);
    }
  
  exports.help = {
  name: "channelinfo",
  description: "Return the information about this channel!",
  usage: "channelinfo",
  example: "channelinfo"
};

exports.conf = {
  aliases: ["ci", "cinfo"],
  cooldown: 3
}
