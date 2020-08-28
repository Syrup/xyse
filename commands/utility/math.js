const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const { evaluate }= require('mathjs');


exports.help = {
    name: "math",
    usage: "math <number>",
    example: "math 5*2",
    description: `Calculate some math!`,
}
  exports.run = async (client, message, args) => {


        if (!args.join(' ')) return message.reply('Please input a mathematical operation!');
    
        let resp;
        try {
            resp = evaluate(args.join(' '));
        } catch (e) {
            return message.reply('Please input a valid mathematical operation!');
        }
    
        const embed = new MessageEmbed()
        .setColor('#3AA990')
        .setTitle('Your calculation')
        .addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
        .addField('Output', `\`\`\`js\n${resp}\`\`\``)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
    
        message.channel.send(embed);

    }
    
exports.conf = {
  aliases: [],
  cooldown: 3
}