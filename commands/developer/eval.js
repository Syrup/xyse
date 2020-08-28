const Discord = require("discord.js"),
      { post } = require("node-superfetch");

exports.run = async (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return;
  
  const embed = new Discord.MessageEmbed()
  .setFooter(`dev: ${client.config.dev[0]} & ${client.config.dev[1]}`, client.user.displayAvatarURL())
  .setTimestamp();
  
  try {
    const code = args.join(" ");
    if (!code) return message.channel.send("Please include the code.");
    let evaled;
    
    if (code.includes(`SECRET`) || code.includes(`XYSE`) || code.includes("process.env")) {
      evaled = "token doang yang lu cari";
    } else {
      evaled = eval(code);
    }
    
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});
    
    let output = clean(evaled);
    if (output.length > 1024) {
      const {body} = await post("https://hastebin.com/documents").send(output);
      embed.addField("📤 Output", `Kepanjangan, gw masukin hastebin ya https://hastebin.com/${body.key}.js`).setColor(0x7289DA);
    } else {
      embed.addField("📤 Output", "```js\n" + output + "```").setColor(0x7289DA)
    }
    
    message.channel.send(embed);
    
  } catch (error) {
    let err = clean(error);
    if (err.length > 1024) {
      const {body} = await post("https://hastebin.com/documents").send(err);
      embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor("RED");
    } else {
      embed.addField("Output", "```js\n" + err + "```").setColor("RED");
    }
    
    message.channel.send(embed);
  }
}

exports.help = {
  name: "eval",
  description: "Evaluate some code.",
  usage: "eval <code>",
  example: ""
}

exports.conf = {
  aliases: ["ev"],
 cooldown: 2

}

function clean(string) {
  if (typeof text === "string") {
    return string.replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return string;
  }
}
