const Discord = require('discord.js');
const { readdirSync } = require('fs');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const { xyseversion } = require("../../package.json");
const os = require('os');
const osName = require('os-name');
var ostb = require( 'os-toolbox' );
var showOS = require('show-os');

exports.run = (client, message) => {
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
    const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
    const seconds = (d.seconds() == 1) ? `${d.seconds()} second` : `${d.seconds()} seconds`;
    const date = moment().subtract(d, 'ms').format('dddd, MMMM Do YYYY');
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.tag}'s Stats`, client.user.displayAvatarURL())
        .setColor("RANDOM")
                .addField(`${client.user.tag}`, stripIndents`
      **❯ Username:** ${message.client.user.username}
        **❯ Discriminator:** ${message.client.user.discriminator}
        **❯ Full name:** ${client.user.tag}
        **❯ ID:** ${client.user.id}
        **❯ Prefix:** ${client.config.prefix}
`)
    
        .addField('General Information', stripIndents`
        **❯ OS Name:** ${ostb.platform()}
        **❯ Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
        **❯  Uptime:** ${days}  ${hours}  ${minutes}  ${seconds} 
       **❯ Date:** ${date}
       **❯ Ping:** ${client.ws.ping}ms
        `)
    
        .addField('Versions', stripIndents`
        **❯ Discord.js:** ${Discord.version}
        **❯ Node:** ${process.version}
        **❯ Version:** ${xyseversion}
        `)
    
        .addField('Stats', stripIndents`
        **❯ Server Count:** ${client.guilds.cache.size}
        **❯ User Count:** ${client.users.cache.size}
        **❯ Channel Count:** ${client.channels.cache.size}
        **❯ Command Count:** ${client.commands.size}
        `)
        
      .addField('Special People', stripIndents`
        **❯ Main Developer:** ${client.config.dev[0]}, ${client.config.dev[1]}
       **❯ Helper (Developer):** None
         **❯ Early Bug Hunter:** ${client.config.bug[0]}
       **❯ Contributor:** None
`)
        .setFooter(`Developer: ${client.config.dev[0]}, ${client.config.dev[1]}`, message.author.displayAvatarURL())
        .setTimestamp()
    
        message.channel.send(embed);

    }
exports.conf = {
    aliases: ["bi", "stats"],
    cooldown: 5
  }
  
exports.help = {
  name: 'botinfo',
  description: 'Bot stats with info',
  usage: 'botinfo'
};