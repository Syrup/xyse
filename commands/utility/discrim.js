exports.run = async (client, message, args) => {

let discrim = args[0];
if (!discrim) {
    discrim = message.author.discriminator;
}

if (discrim.startsWith("#")) {
    discrim = discrim.slice(1);
}

if (/^[0-9]+$/.test(discrim) && discrim.length === 4) {
    const users = client.users.cache.filter(user => user.discriminator === discrim).map(user => user.username);
    if (users.length === 0) return message.reply(`After searching all my servers, no one with the discriminator **#${discrim}** could be found.`);
    return message.channel.send(`**${users.length}** user(s) found with the discriminator **#${discrim}**:\n\`\`\`yml\n${users.join(", ")}\`\`\``);
} else {
    return message.reply('Invalid discriminator provided.');
}
}


exports.help = {
    name: "discrim",
    description: "Find some people with same discriminator or other!",
    usage: "discrim [id]",
    example: "discrim 5440\ndiscrim"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 1
  }
  