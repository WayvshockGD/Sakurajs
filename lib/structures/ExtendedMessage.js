const Eris = require("eris");
const SakuraClient = require("../SakuraClient");
const Util = require("../utils/Util");
const ErisMessageEmbed = require("./ErisMessageEmbed");
const MessageCollector = require("./MessageCollector");
const ReactionHandler = require("./ReactionCollector");

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

        if (this.guild.name && this.member.roles.length) {
            this.memberGuildRoles = this.getGuildRoles();
        } else {
            this.memberGuildRoles = [];
        }
    }

    getGuildRoles() {
        let roles = [];

        for (let role of this.member.roles) {
            roles.push(this.guild.roles.get(role));
        }

        return roles;
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

    createMessageCollector(filter, options) {
        return new MessageCollector(this.channel.client, this.channel, filter, options);
    }

    createReactionCollector(filter, perma, options) {
        return new ReactionHandler(this, filter, perma, options);
    }
}

module.exports = ExtendedMessage;