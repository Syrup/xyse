const { MessageEmbed } = require('discord.js');
const { version } = require("../../package.json");

exports.run = async (client, message, args) => {

let channel = client.channels.cache.get('744443117540737094');

        if (!args.length) {
            return message.reply("Command Usage: `x!feedback <Suggestion / Issue>`")
        } else {

     
          let avatar = message.author.displayAvatarURL({size: 4096, dynamic: true});

            let invite = await message.channel.createInvite({
         

            });

            try {
                const embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(`${avatar}`)
                    .setTitle(`Feedback from ${message.author.tag} | ${message.author.id}`)
                    .addField("Feedback by:", `${message.author.tag} | <@${message.author.id}>`)
                    .addField("In:", `Guild: ${message.guild.name}, Guild ID: ${message.guild.id}\nChannel Name: ${message.channel.name} Channel ID: ${message.channel.id}\n[<#${message.channel.id}>]`)
                    .addField("Issue / Feedback:", args.join(" "))
  .setFooter("© copyright 2020 Xyse Development")
                    .addField("Server Link", `||https://discord.gg/${invite.code}||`)
                    .setTimestamp()
                channel.send({ embed });

                await message.channel.send(`Hello, **${message.author.tag}** Thanks for your issues / feedback. Our team will improve Xyse to be a more better. Additional information please contact 5440#5440!`)

                return null;

            } catch (err) {
                return message.channel.send(`An error occurred:\n\```${err.message}\````);
            }   
       }
    }

  

exports.help = {
  name: "feedback",
  description: "Send Suggestion or issues!!",
  usage: "feedback <Suggestion / Issues>",
  example: ""
}

exports.conf = {
  aliases: ["report"],
  cooldown: 1
}
