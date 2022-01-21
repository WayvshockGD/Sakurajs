const SakuraCommandError = require("../errors/SakuraCommandError");
const CommandArgs = require("./CommandArgs");

module.exports = class CommandCreator {
    constructor(options) {

        this.options = options;

        this.verify();
    }

    execute(ctx, util) {
        this.options.execute(ctx, util);
    }

    initArgs(message) {
        if (this.options.args && this.options.args.length) {
            return new CommandArgs(this.options.args, message);
        }
    }

    get names() {
        return this.options.names;
    } 

    get onlyForChannels() {
        return this.options.onlyForChannels ?? [];
    }

    get description() {
        return this.options.description ?? "No description";
    }

    get enabled() {
        return this.options.enabled ?? true;
    }

    get args() {
        return this.options.args ?? [];
    }

    get owner() {
        return this.options.owner ?? false;
    }

    get cooldown() {
        return this.options.cooldown ?? 5000;
    }

    verify() {
        if (typeof this.options.names === "undefined") {
            throw new SakuraCommandError("options#names", "Is undefined");
        }

        if (Array.isArray(this.options.names)) {
            throw new SakuraCommandError("options#names", `Not a array, recieved: ${typeof this.options.names}`);
        }
    }
}