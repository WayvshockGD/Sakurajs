const SakuraClient = require("../SakuraClient");
const CommandBuilder = require("../structures/Command");
const ExtendedMessage = require("../structures/ExtendedMessage");
const CommandUtil = require("../utils/CommandUtil");

module.exports = class CommandHandler {
    /**
     * @param {SakuraClient} client 
     * @param {object} options 
     */
    constructor(client, options) {

        this.client = client;

        this.options = options ?? {};
    }

    get responses() {
        return this.client.options.responses;
    }

    setup() {
        this.client.on("message", (message) => {
            /**
             * @type {ExtendedMessage}
             */
            let msg = message;

            let args = msg.content.slice(this.options.defaultPrefix).trim().split();

            /**
             * @type {CommandBuilder}
             */
            let command = this.client.pluginCommands.get(args[0]);

            if (!command) {
                if (this.responses.noCommand) {
                    return msg.post(this.responses.noCommand);
                }
            }

            command.execute({
                message,
                args: args.slice(1),
                instances: this.client.getClients(),
            }, new CommandUtil(command, message));
        });
    }
}