const SakuraCommandError = require("../errors/SakuraCommandError");
const ExtendedCollection = require("../utils/ExtendedCollection");
const CommandCreator = require("./Command");

module.exports = class Plugin {
    constructor(options = {}) {
        this.options = options;

        this.commands = new ExtendedCollection();
    }

    get name() {
        return this.options.name;
    }

    /**
     * @param {CommandCreator[]} commands
     */
    setCommands(commands) {
        if (!Array.isArray(commands)) {
            throw new SakuraCommandError("setCommands#commands", "Not an array");
        }
        for (let command of commands) {
            for (let name of command.names) {
                this.commands.set(name, command);
            }
        }
        return this;
    }
}