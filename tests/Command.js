let { Command, Event } = require("sakura.js");

new Command.creator({
    names: ["test"],
    args: ["member", "mention"],
    execute(ctx, util) {
    }
});

new Event({
    event: "messageCreate",
    run(message, log) {}
});