const Eris = require("eris");
let sakura = require("sakura.js");

let eris = new Eris.Client();
let client = new sakura.SakuraClient(eris, {});

client.on("message", (message) => {
    if (message.content.startsWith("!test")) {
        message.createEmbedMessage({ description: "HI!" });
    }
});

client.logger.custom