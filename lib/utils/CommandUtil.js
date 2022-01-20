const CommandCreator = require("../structures/Command");
const ErisMessageEmbed = require("../structures/ErisMessageEmbed");
const ExtendedMessage = require("../structures/ExtendedMessage");

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
}