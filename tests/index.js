const Eris = require("eris");
let sakura = require("sakura.js");
let config = require("./config.test.json");

let eris = new Eris.Client(config.token, { intents: ["guildMessages", "guilds"] });
let client = new sakura.SakuraClient(eris, {});

client.on("message", (message) => {
    if (message.content.startsWith("!test")) {
        let embed = new sakura.ErisMessageEmbed()
            .setTitle("HI!")
            .setColor("");

        console.log(embed.toJSON());
        message.createEmbedMessage([embed]);
    }
});

client.login();