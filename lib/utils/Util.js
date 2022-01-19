const { ALL_COLOR_PALLETS } = require("../Colors");
const Logger = require("./Logger");

let logger = new Logger({ ISO: true });

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
}