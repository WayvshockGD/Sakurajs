module.exports = class Event {
    constructor(options) {
        this.options = options;
    }

    run(data, log) {
        this.options.run(data, log);
    }

    get event() {
        return this.options.event;
    }

    get once() {
        return this.options.once;
    }

    get execute() {
        return this.options.execute ?? true;
    }
}