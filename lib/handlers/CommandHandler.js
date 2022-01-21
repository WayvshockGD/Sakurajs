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

        client.on("message", this.setup.bind(this));
    }

    get responses() {
        return this.client.options.responses;
    }

    setup(message) {
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
            return;
        }

        let parsedArgs = command.initArgs(msg);

        if (command.args.length && !args.slice(1).length) {
            if (this.responses.noArgs) {
                return msg.post(this.responses.noArgs);
            }
            return;
        }

        if (!command.onlyForChannels && command.onlyForChannels.ids.includes(msg.channel.id)) {
            if (this.responses.forChannel) {
                return msg.post(this.responses.forChannel);
            }
            return;
        }

        try {
            command.execute({
                message,
                args: {
                    parsed: parsedArgs,
                    command: args.slice(1)
                },
                instances: this.client.getClients(),
            }, new CommandUtil(command, message));
        } catch (error) {
            if (this.responses.error) {
                return msg.post(this.responses.error);
            }
            return;
        }
    }
}