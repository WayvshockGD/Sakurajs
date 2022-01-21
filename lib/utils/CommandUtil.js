const CommandCreator = require("../structures/Command");
const ErisMessageEmbed = require("../structures/ErisMessageEmbed");
const ExtendedMessage = require("../structures/ExtendedMessage");
const SakuraCron = require("./SakuraCron");

module.exports = class CommandUtil {

    /**
     * @param {CommandCreator} command 
     * @param {ExtendedMessage} message 
     */
    constructor(command, message) {
        this.command = command;

        this.message = message;
    }

    createEmbed(data) {
        return new ErisMessageEmbed(data);
    }

    cron(time, fn) {
        return new SakuraCron(time, fn);
    }
}