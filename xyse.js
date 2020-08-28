const Discord = require("discord.js");
const Xyve = require("./handler/Xyve.js"); 
const client = new Xyve();
const axios = require("axios")
const urls = ["https://xyse-disc.glitch.me/"]
      let channel = client.channels.cache.get('748516588399099975');

setInterval(function() {
            urls.forEach(url => {
                          axios.get(url).then(console.log("Pong at " + Date.now())).catch(() => {});

        })
    }, 60 * 1000);
require("./handler/module.js")(client);
require("./handler/Event.js")(client);

client.package = require("./package.json");
client.on("warn", console.warn);
client.on("error", console.error); 
client.login(process.env.XYSE)
