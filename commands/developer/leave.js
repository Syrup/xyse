exports.run = async (client, message, args) => {
    if (!client.config.owners.includes(message.author.id)) return;
    if (!message.guild.available) return client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);

    message.reply("Are you sure you want me to leave this guild? I can only be added back by users with the `MANAGE_GUILD` (Manage Server) permission. **(Y/N)**");

    return message.channel.awaitMessages(m => m.author.id === message.author.id, {
        "errors": ["time"],
        "max": 1,
        time: 20000
    }).then(resp => {
        if (!resp) return message.channel.send("Timed out.");
        resp = resp.array()[0];
        const validAnswers = [
            "Y",
            "N",
            "y",
            "n"
        ];
        if (validAnswers.includes(resp.content)) {
            if (resp.content === "N" || resp.content === "n") {
                return message.channel.send("ok no leave than");
            } else if (resp.content === "Y" || resp.content === "y") {
                message.guild.leave()
                .then(g => client.logger.info(`☑️ | Left guild via command: ${g}`))
                .catch(e => {
                    client.logger.error(e);
                    return message.channel.send(`I tried to leave, but couldn't. An error occurred:\n\```${e.message}\````);
                });
            }
        }
    });
}

    exports.help = {
        name: "leave",
        description: "Leaves the current server.",
        usage: "leave",
        example: ""
      };
      
      exports.conf = {
        aliases: [],
        cooldown: 2
      };