exports.defaultResponses = {
    noCommand: "That command doesn't exist!",
    noArgs: "The command requires arguments!",
    error: ":x: There was a error while running this command!",
    forChannel: "This command can only be used on a specific channel!",
    cooldown: (time) => `This command can be used again in... \`${time}\``,
    commandDisabled: "This command is currently disabled."
};