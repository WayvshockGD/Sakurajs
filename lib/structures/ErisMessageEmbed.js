const Eris = require("eris");
const { compact } = require("../utils/Util");

module.exports = class ErisMessageEmbed {

    /**
     * @param {Eris.EmbedOptions} data 
     */
    constructor(data = {}) {
        
        this.title = data.title ?? "";

        this.url = data.url ?? "";

        this.description = data.description ?? "";

        this.fields = data.fields ?? [];

        this.author = data.author ?? {};

        this.footer = data.footer ?? {};

        this.image = data.image ?? {};

        this.thumbnail = data.thumbnail ?? {};

        this.color = data.color ?? 0;

        this.timestamp = data.timestamp ?? new Date();
    }

    setTitle(str) {
        return this.setField(["setTitle", str]);
    }

    setURL(url) {
        return this.setField(["url", url]);
    }

    setDescription(str) {
        return this.setField(["description", str])
    }

    /**
     * @param {Array<keyof (ErisMessageEmbed)> | Array<string>} items 
     * @returns {ErisMessageEmbed}
     */
    setField(items) {
        this[items[0]] = items[1];
        return this;
    }

    /**
     * @returns {Eris.EmbedOptions}
     */
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            url: this.url
        };
    }
}