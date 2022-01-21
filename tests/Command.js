let { CommandCreator, Event } = require("sakura.js");

new CommandCreator({
    names: ["test"],
    args: ["member", "data"],
    execute(ctx, util) {}
});

new Event({
    event: "messageReactionAdd",
    run(logger, message, emoji, react) {}
});