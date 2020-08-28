const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch")

exports.help = {
    name: "github",
    usage: "Github <Name>",
    example: "Github client-developer",
    description: `Github User Account Information!`,
}
  exports.run = async (client, message, args) => {

       try {

  if (!args[0]) return message.channel.send(`Please provide some github's username`)
    
  fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if(body.message) return message.channel.send(`User Not Found, Reason: Please Give Me A Valid Username!`);
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

            const embed = new MessageEmbed()
            .setAuthor(`Github ${login}'s Information!`, avatar_url)
            .setColor("RANDOM")
            .setThumbnail(`${avatar_url}`)
            .addField(`Username`, `${login}`)
            .addField(`ID`, `${id}`)
            .addField(`Bio`, `${bio || "This user does not have Bio!"}`)
            .addField(`Public Repositories`, `${public_repos || "None"}`, true)
            .addField(`Followers`, `${followers}`, true)
            .addField(`Following`, `${following}`, true)
            .addField(`Location`, `${location || "This user does not have Location"}`)
            .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))

            message.channel.send(embed)

    })

        } catch (error) {
            console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
            return message.channel.send(`Something Went Wrong Try Again Later!`)
        }
    }

exports.conf = {
  aliases: ["g"],
  cooldown: 3
}