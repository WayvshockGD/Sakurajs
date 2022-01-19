const Eris = require("eris");
const Util = require("../utils/Util");

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

    /**
     * @param {Eris.EmbedOptions} embed1
     * @param {Eris.EmbedOptions} embed2
     * @returns {boolean}
     */
    equal(embed1, embed2) {
        return embed1.title === embed2.title && 
               embed1.description === embed2.description &&
               embed1.color === embed2.color;
    }

    setTitle(str) {
        this.title = str;
        return this;
    }

    setURL(url) {
        this.url = url;
        return;
    }

    setAuthor(data) {
        this.author = data;
    }

    setDescription(str) {
        this.description = str;
        return this;
    }

    setColor(color) {
        this.color = Util.parseColor(color);
        return this;
    }

    setImage(data) {
        this.image = data;
        return this;
    }

    setThumbnail(data) {
        this.thumbnail = data;
        return this;
    } 

    addField(field) {
        this.fields.push(fields);
        return this;
    }

    setFields(fields) {
        for (let f of fields) {
            this.addField(f);
        }
        return this;
    }

    /**
     * @returns {Eris.EmbedOptions}
     */
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            url: this.url,
            thumbnail: this.thumbnail,
            color: this.color,
            fields: this.fields,
            image: this.image,
            author: this.author
        };
    }
}