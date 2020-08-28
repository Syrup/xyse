const { exec } = require("child_process");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    if (!client.config.owners.includes(message.author.id)) return;
    const code = args.join(" ");
    if (!code) return message.channel.send("No parameter to execute");
  const mu = Date.now();
  const command = `\`\`\`bash\n${args.join(" ")}\`\`\``;
  const emb = new MessageEmbed()
    .setColor("#81FF00")
    .addField("📥 INPUT", command);
  exec(args.join(" "), async (error, stdout, stderr) => {
  	if (stdout) {
	  	let output = `\`\`\`bash\n${stdout}\`\`\``;
	  	if (stdout.length > 1024) {
        output = await client.util.hastebin(stdout);
		  }
      emb.addField("📤OUTPUT", output);
  	} else if (stderr) {
  	    emb.setColor("#FF0000");
	  	let error = `\`\`\`bash\n${stderr}\`\`\``;
	  	if (stderr.length > 1024) {
        error = await client.util.hastebin(stderr);
		  }
      emb.addField("⛔ERROR", error);
  	} else {
	  	emb.addField("📤OUPUT", "```bash\n# Command executed successfully but returned no output.```");
  	}
	  return message.channel.send(emb.setFooter(`⏱️ ${Date.now() - mu}mμ`));
  });
};

exports.help = {
    name: "exec",
    description: "Execute some cmd on terminal",
    usage: "exec <args>",
    example: ""
  };
  
  exports.conf = {
    aliases: ["ex"],
    cooldown: 2
  };