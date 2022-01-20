const Eris = require("eris");
const EventEmitter = require("events");
const CommandHandler = require("./handlers/CommandHandler");
const CommandCreator = require("./structures/Command");
const ExtendedMessage = require("./structures/ExtendedMessage");
const Plugin = require("./structures/Plugin");
const ExtendedCollection = require("./utils/ExtendedCollection");
const Logger = require("./utils/Logger");

class SakuraClient extends EventEmitter {
    /**
     * @param {Eris.Client} client 
     * @param {SakuraClientOptions} options 
     */
    constructor(client, options) {
        super();

        if (typeof options === "undefined") options = {};

        /**
         * The main client called within the constructor
         * @type {Eris.Client}
         */
        this.client = client;

        /**
         * The options in the main constructor
         * @type {SakuraClientOptions}
         */
        this.options = options;

        /**
         * Client logger used for logging information
         * @type {Logger}
         */
        this.logger = new Logger(options.log);

        /**
         * Max connect attempts when using SakuraClient#login
         * @type {number}
         */
        this.attempts = 0;

        this.pluginCommands = new ExtendedCollection();

        this.plugins = new ExtendedCollection();

        this.commandHandler = new CommandHandler(this, options.command);

        this.processEvents();
    }

    processEvents() {
        this.commandHandler.setup();
        this.client.on("rawWS", (packet) => {
            if (packet.t === "MESSAGE_CREATE") {
                this.emit("message", new ExtendedMessage(packet.d, this.getClients()));
            }
        });
    }

    /**
     * @param {Plugin[]} plugins
     */
    loadPlugins(plugins) {
        for (let plugin of plugins) {
            for (let [name, data] of plugin.commands.entries()) {
                this.pluginCommands.set(name, data);
            }
            this.plugins.set(plugin.name, plugin);
        }
    }

    getClients() {
        return {
            eris: this.client,
            sakura: this
        };
    }

    /**
     * Logs in the bot
     * @returns {Promise<string>}
     */
    async login() {
        let maxAttempts = (this.options.maxAttempts ?? 5);
        
        await this.client.connect()
              .then(() => Promise.resolve("Connected"))
              .catch(async (err) => {
                  this.attempts++;
                  if (this.options.log.debug) {
                      this.logger.info(`Attempting to connect again... attempt ${this.attempts}`);
                  };
                  if (this.attempts === maxAttempts) {
                      Promise.reject("Unable to login bot! Reached max login attempts");
                  }
                  await this.login();
              });
    }
}

module.exports = SakuraClient;