module.exports = class Event {
    constructor(options) {
        this.options = options;
    }

    run(log, data) {
        this.options.run(log, data);
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