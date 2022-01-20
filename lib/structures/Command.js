const SakuraCommandError = require("../errors/SakuraCommandError");

class CommandCreator {
    constructor(options) {

        this.options = options;

        this.verify();
    }

    exec(ctx, util) {
        this.options.execute(ctx, util);
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