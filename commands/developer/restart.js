
      exports.run = async (client, message, args) => {
    if (!client.config.owners.includes(message.author.id)) return;

    message.reply("Are you sure you want me to restarting? **(Y/N)**");

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
                             console.log("Shutdown successfully.")
              message.channel.send("Shutdown successfully!")
		client.destroy();
    process.exit();
                };
            }
        }
    );
}

    exports.help = {
        name: "restart",
        description: "Restart the bot.",
        usage: "restart",
        example: ""
      };
      
      exports.conf = {
        aliases: [],
        cooldown: 2
      };