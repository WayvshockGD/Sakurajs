let { Command } = require("sakura.js");

let co = new Command.creator({
    names: ["test"],
    args: ["member", "mention"],
    execute(ctx, util) {
    }
});