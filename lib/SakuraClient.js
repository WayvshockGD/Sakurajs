const Eris = require("eris");
const EventEmitter = require("events");
const ExtendedMessage = require("./structures/ExtendedMessage");
const Logger = require("./utils/Logger");

class SakuraClient extends EventEmitter {
    /**
     * @param {Eris.Client} client 
     * @param {SakuraClientOptions} options 
     */
    constructor(client, options) {
        super();

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

        this.processEvents();
    }

    processEvents() {
        this.client.on("rawWS", (packet) => {
            if (packet.t === "MESSAGE_CREATE") {
                this.emit("message", new ExtendedMessage(packet, this.getClients()))
            }
        });
    }

    getClients() {
        return {
            eris: this.client,
            sakura: this
        }
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
                  attempts++;
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