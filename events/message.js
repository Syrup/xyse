const Discord = require("discord.js"), cooldowns = new Discord.Collection(), db = require("quick.db");

module.exports = async (client, message) => {
  if (message.author.bot || message.author === client.user) return;
  
  let prefix = client.config.prefix;
  
  

  client.emit('experience', message);
  
  if (!message.content.startsWith(prefix)) return;
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  let sender = message.author;
  if (client.config.devMode && !client.config.owners.includes(message.author.id)) return message.channel.send({ embed: {thumbnail : "https://cdn.discordapp.com/attachments/744443119612723252/748367288981389342/Xyse.jpg" , color: "RANDOM", description: `**Attention From Developer**\nIn order to increase the stability of the bot.\nAt the time of maintenance we will turn off access to orders, and you can not use it temporarily because there is something that is not acceptable to happen.\nMaintenance will take **More than** 24 Hours +`}});
  message.flags = []
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1)); 
  }
  
  let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!commandFile) return; 
  
  if (!cooldowns.has(commandFile.help.name)) cooldowns.set(commandFile.help.name, new Discord.Collection());
  
  const member = message.member,
        now = Date.now(),
        timestamps = cooldowns.get(commandFile.help.name),
        cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;
  
  if (!timestamps.has(member.id)) {
    if (!client.config.owners.includes(message.author.id)) {
      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`Please wait **${timeLeft.toFixed(1)}** seconds to try the command again.`);
    }
    
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount); 
  }
      let channel = client.channels.cache.get('748511782104072202');

  try {
    if (!commandFile) return;
    commandFile.run(client, message, args);
  } catch (error) {
    console.log(error.message);
  } finally {
    channel.send(`**${sender.tag}** (ID: ${sender.id}) using a command: ${cmd}\nGuild: **${message.guild.name}**, Guild ID: ${message.guild.id}\nChannel Name: ${message.channel.name} Channel ID: ${message.channel.id}\n[<#${message.channel.id}>]`);
  }
}
