const Eris = require("eris");
let sakura = require("sakura.js");
const ErisMessageEmbed = require("../lib/structures/ErisMessageEmbed");

let eris = new Eris.Client();
let client = new sakura.SakuraClient(eris, {});

client.on("message", (message) => {
    if (message.content.startsWith("!test")) {
        let embed = new ErisMessageEmbeds

        message.createEmbedMessage(embed.toJSON());
    }
});

client.logger.custom