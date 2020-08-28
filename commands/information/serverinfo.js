const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  let owner = [];
        await client.users.fetch(message.guild.ownerID).then(o => owner.push(o.tag))
        try {
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Server Info")
                .setThumbnail(message.guild.iconURL())
                .setAuthor(`${message.guild.name} Info`, message.guild.iconURL())
                .addField("**Guild Name**", `${message.guild.name}`, true)
                .addField("**Guild Owner**", `${owner}`, true)
                .addField("**❯ ID**", `${message.guild.id}`)
                .addField("**❯ Created At**", `${message.guild.createdAt}`)
                .addField("**❯ Text Channels**", `${message.guild.channels.cache.filter(r => r.type === "text").size}`)
                .addField("**❯ Voice Channels**", `${message.guild.channels.cache.filter(c => c.type === "voice").size}`)
                .addField("**❯ Members**", `${message.guild.memberCount}`, true)
                .addField("**❯ Roles**", `${message.guild.roles.cache.size}`, true)
            message.channel.send(embed);
        }
        catch {
            return message.channel.send('Something Went Wrong!')
        }
    }


exports.help = {
  name: "serverinfo",
  description: "Information about this server!",
  usage: "serverinfo",
  example: "serverinfo"
};

exports.conf = {
  aliases: [],
  cooldown: 3
}

  
  