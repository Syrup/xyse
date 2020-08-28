module.exports = client => {
  
    let channel = client.channels.cache.get('748511782104072202');
channel.send(`${client.user.tag} is ready, Helping over ${client.users.cache.size} users! on ${client.guilds.cache.size} guilds! ${client.channels.cache.size} channels! [${client.commands.size} commands reloaded]`)
  console.log(`${client.user.tag} is ready, Helping over ${client.users.cache.size} users! on ${client.guilds.cache.size} guilds! ${client.channels.cache.size} channels! [${client.commands.size} commands reloaded]`);
}
