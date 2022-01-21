const CommandCreator = require("../structures/Command");
const ErisMessageEmbed = require("../structures/ErisMessageEmbed");
const ExtendedMessage = require("../structures/ExtendedMessage");
const Resolvers = require("./Resolvers");
const SakuraCron = require("./SakuraCron");

module.exports = class CommandUtil {

    /**
     * @param {CommandCreator} command 
     * @param {ExtendedMessage} message 
     * @param {Resolvers} Resolver
     */
    constructor(command, message, Resolver) {
        this.command = command;

        this.message = message;

        this.resolver = Resolver;
    }

    createEmbed(data) {
        return new ErisMessageEmbed(data);
    }

    cron(time, fn) {
        return new SakuraCron(time, fn);
    }
}