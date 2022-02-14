const { ALL_COLOR_PALLETS } = require("../Colors");
const Logger = require("./Logger");

let logger = new Logger({ ISO: true });

let CommandArgsConstants = {
    user: {
        mention: "<@{id}>",
        id: "{id}"
    },
    channel: {
        mention: "<#{id}>",
        id: "{id}"
    },
    role: {
        mention: "<@&{id}>",
        id: "{id}"
    }
}

module.exports = class Util {
    /**
     * @param {string | number} color 
     * @returns {number}
     */
    static parseColor(color) {
        if (typeof color === "number") {
            return color;
        };
    
        let col = ALL_COLOR_PALLETS[color];
    
        if (typeof col === "undefined") {
            logger.custom(`${color} does not exist, using default color`, "parseColor", "yellow")();
            col  = ALL_COLOR_PALLETS.white;
        }
    
        return col;
    }

    static get commandArgsConstants() {
        return CommandArgsConstants;
    }

    /**
     * Verifies and returns the object passed
     * @param {object} object 
     * @returns {object}
     */
    static verifyObject(object) {
        if (typeof object !== "object") {
            throw new TypeError(`${typeof object} isn't an object`);
        }
        return object;
    }

    /**
     * @param {any} _default 
     * @returns {() => any}
     */
    static createFakeFunction(_default) {
        return (() => _default);
    }
}