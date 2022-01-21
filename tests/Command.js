let { CommandCreator, Event } = require("sakura.js");

new CommandCreator({
    names: ["test"],
    args: ["member", "id"],
    execute(ctx, util) {
        ctx.args.parsed.
    }
});

new Event({
    event: "messageReactionAdd",
    run(logger, message, emoji, react) {}
});