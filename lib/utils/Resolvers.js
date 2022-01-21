const Eris = require("eris");
const ExtendedMessage = require("../structures/ExtendedMessage");

module.exports = class Resolvers {
    
    /**
     * @param {ExtendedMessage} message 
     */
    constructor(message, args) {

        this.message = message;

        this.args = args;
    }

    /**
     * @returns {Eris.Guild}
     */
    get guild() {
        return this.message.guild;
    }

    get rArgs() {
        return this.args[0];
    }

    resolveMember() {
        return this.guild.members.find(m => m.id === this.rArgs) ??
               this.guild.members.find(m => m.username === this.rArgs) ??
               this.guild.members.find(m => m.mention === this.rArgs) ??
               false;
    }

    resolveChannel() {
        return this.guild.channels.find(c => c.id === this.rArgs) ??
               this.guild.channels.find(c => c.name === this.rArgs) ??
               this.guild.channels.find(c => c.mention === this.rArgs) ??
               false;
    }

    resolveRole() {
        return this.guild.roles.find(r => r.id === this.rArgs) ??
               this.guild.roles.find(r => r.name === this.rArgs) ??
               this.guild.roles.find(r => r.mention === this.rArgs) ??
               false;
    }
}