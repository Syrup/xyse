const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports.run = async (client, message) => {
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
    const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
    const seconds = (d.seconds() == 1) ? `${d.seconds()} second` : `${d.seconds()} seconds`;
    const date = moment().subtract(d, 'ms').format('dddd, MMMM Do YYYY');
    const embed = new MessageEmbed()
      .setTitle('Xyse\'s Uptime')
      .setThumbnail('https://cdn.discordapp.com/avatars/748363918426243115/fc4f606b5feb52b53ec7f5b66d10a9a7.webp')
      .setDescription(`\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }

exports.conf = {
  aliases: [],
  cooldown: 3
}


exports.help = {
  name: "uptime",
  description: "Bot Uptime",
  usage: "uptime",
  example:"uptime"
};