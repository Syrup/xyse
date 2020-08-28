const Discord = require('discord.js');

exports.run = async (client, message, args) => {
message.channel.send('Pong!')
.then((msg)=> {
  setTimeout(function(){
    msg.edit(`Pong! \`${client.ws.ping}ms\``);
  }, 1)
}); }

exports.help = {
  name: "ping",
  description: "Pong!",
  usage: "ping",
  example: "ping"
};

exports.conf = {
  aliases: [],
  cooldown: 3
}
