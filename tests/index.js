const Eris = require("eris");
let sakura = require("sakura.js");
let { Colors } = require("discord.js").Constants;
let COLORS = require("../lib/Colors").ALL_COLOR_PALLETS;
let config = require("./config.test.json");

let eris = new Eris.Client(config.token, { intents: ["guildMessages", "guilds"] });
let client = new sakura.SakuraClient(eris, {
    responses: {
        error: "OH NO! an Error has occured while running this command!"
    },
    command: {
        defaultPrefix: "!",
        initHandler: true
    }
});

client.on("message", (message) => {
    if (message.content.startsWith("!test")) {
        let embed = new sakura.ErisMessageEmbed()
            .setTitle("HI!");

        console.log(embed.toJSON());
        message.createEmbedMessage([embed]);
    }
});

//client.login();