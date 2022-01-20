const Eris = require("eris");
const SakuraClient = require("../SakuraClient");
const Util = require("../utils/Util");
const ErisMessageEmbed = require("./ErisMessageEmbed");

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

        this.guild = clients.eris.guilds.get(data.guild_id) || { id: data.guild_id };
    }

    /**
     * Creates a embed message response using `Eris#Message#createMessage`
     * @param {ErisMessageEmbed | ErisMessageEmbed[]} content
     */
    async createEmbedMessage(content) {
        if (content instanceof ErisMessageEmbed) content = content.toJSON();
        if (Array.isArray(content)) {
            for (let embed of content) {
                if (embed instanceof ErisMessageEmbed) {
                    embed = embed.toJSON();
                }
            }
        }
        if (!content instanceof ErisMessageEmbed && !Array.isArray(content)) {
            content.color = Util.parseColor(content.color);
        } else if (!content instanceof ErisMessageEmbed && Array.isArray(content)) {
            for (let embed of content) {
                embed.color = Util.parseColor(embed.color);
            }
        }
        let embeds = Array.isArray(content) ? content : [content];
        return await this.post({ embeds });
    }

    /**
     * Another way to create a message to a discord channel, but catching
     * @param {Eris.MessageContent} content
     * @param {Eris.FileContent | Eris.FileContent[]} file
     */
    async post(content, file) {
        return await this.channel.createMessage(content, file).catch((err) => {
            this.sakura.logger.custom("Unable to post to channel", "message#channel", "red")();
        });
    }
}

module.exports = ExtendedMessage;