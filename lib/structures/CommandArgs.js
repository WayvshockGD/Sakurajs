const SakuraCommandError = require("../errors/SakuraCommandError");
const Util = require("../utils/Util");
const ExtendedMessage = require("./ExtendedMessage");

module.exports = class CommandArgs {
    /**
     * @param {any[]} args 
     * @param {ExtendedMessage} message 
     */
    constructor(args, message) {

        this.args = args;

        this.message = message;

        this.parsed = this.parse();
    }

    parse() {
        let type = Util.commandArgsConstants[this.args[0]][this.args[1]];

        if (!type) {
            throw new SakuraCommandError(`type#${this.args[0]}`, "Doesn't exist");
        }

        switch (this.args[0]) {
            case "user":
                let pre = this.message.mentions[0];

                if (!pre) {
                    type = type.replace("{id}", this.message.author.id);
                } else {
                    type = type.replace("{id}", pre.id);
                }
                break;
            case "channel":
                let pre = this.message.channelMentions[0];

                if (!pre) {
                    type = type.replace("{id}", this.message.channel.id);
                } else {
                    type = type.replace("{id}", pre.id);
                }
                break;
            case "role":
                let pre = this.message.roleMentions[0];

                if (!pre) {
                    type = type.replace("{id}", this.message.member.roles[0]);
                } else {
                    type = type.replace("{id}", pre.id);
                }
                break;
        }
        return type;
    }
}