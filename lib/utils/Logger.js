const chalk = require("chalk");
const SakuraError = require("../errors/SakuraError");

/**
 * @example
 * let logger = new LoggerCreator();
 * logger.custom("This is a custom message", "blue")();
 */
class Logger {

    /**
     * @param {SakuraLoggerOptions} options
     */
    constructor(options) {

        /**
         * @type {SakuraLoggerOptions}
         */
        this.options = options;
    }

    /**
     * Console logs a green message
     * @param {string} content
     * @returns {void}
     */
    success(content) {
        console.log(this.format("success", content, "green"));
    }

    /**
     * Console logs a blue message
     * @param {string} content
     * @returns {void}
     */
    info(content) {
        console.log(this.format("info", content, "blue"));
    }

    /**
     * Console logs a yellow message
     * @param {string} content
     * @returns {void}
     */
    warn(content) {
        console.log(this.format("warn", content, "yellow"));
    }

    /**
     * Console logs a red message
     * @param {string} content
     * @returns {void}
     */
    error(content) {
        console.log(this.format("error", content, "red"));
    }

    /**
     * The method custom, returns a void function because its custom
     * @param {string} content
     * @param {string} type
     * @param {string} color
     */
    custom(content, type, color) {
        return (() => {
            color = typeof color === "undefined" ? "white" : color;
            type = typeof type === "undefined" ? "custom" : type;
            console.log(this.format(type, content, color));
        });
    }

    /**
     * @param {string} type 
     * @param {string} content 
     * @param {string} color 
     * @returns {string}
     * @private
     */
    format(type, content, color) {
        return this.formatLoggerTime(type, {
            content,
            color,
            useISO: this.options.ISO
        });
    }

    /**
     * Formats the time and content into a new string
     * @param {string} type 
     * @param {LoggerFormatOptions} options
     * @returns {string}
     */
    formatLoggerTime(type, { color, content, useISO } = {}) {
        let chalkColor = chalk[color];
        let time = new Date();
        let date = useISO ? time.toISOString() : time;

        if (!chalkColor) {
            throw new SakuraError(`Color chalk#${color} does not exist`);
        }

        return `((${date})(${type.toUpperCase()}) >> (${chalkColor(content)}))`;
    }
}

module.exports = Logger;