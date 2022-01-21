const { CronJob } = require("cron");

module.exports = class SakuraCron extends CronJob {
    constructor(time, func) {
        super(time, func);
    }

    static init(time, func) {
        return new this(time, func);
    }
}