const Eris = require("eris");
const SakuraClient = require("../SakuraClient");

class ExtendedMessage extends Eris.Message {
    /**
     * @param {Eris.BaseData} data 
     * @param {ExtendedStructureClients} clients 
     */
    constructor(data, clients) {
        super(data, clients.eris);

        /**
         * @type {SakuraClient}
         */
        this.sakura = clients.sakura;
    }

    /**
     * Creates a embed message response using `Eris#Message#createMessage`
     * @param {Eris.EmbedOptions | Eris.EmbedOptions[]} content
     * @returns {Promise<Eris.Message>}
     */
    createEmbed(content) {
        let embeds = Array.isArray(content) ? content : [content];
        return this.post({ embeds });
    }

    /**
     * Another way to create a message to a discord channel, but catching
     * @param {Eris.MessageContent} content
     * @param {Eris.FileContent | Eris.FileContent[]} file
     * @returns {Promise<Eris.Channel>}
     */
    async post(content, file) {
        return await this.channel.createMessage(content, file).catch((err) => {
            this.sakura.logger.custom("Unable to post to channel", "message#channel", "red");
        });
    }
}

module.exports = ExtendedMessage;