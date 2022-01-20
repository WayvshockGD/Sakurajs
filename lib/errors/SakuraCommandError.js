module.exports = class SakuraCommandError extends Error {
    constructor(id, content) {
        super(`(${id}) (${content})`);

        this.id = id;
    }
}