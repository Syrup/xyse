const Discord = require("discord.js");
const Xyve = require("./handler/Xyve.js"); 
const client = new Xyve();
require("./handler/module.js")(client);
require("./handler/Event.js")(client);

client.package = require("./package.json");
client.on("warn", console.warn);
client.on("error", console.error); 
client.login(process.env.XYSE)
