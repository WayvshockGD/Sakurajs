// Message Collector copied and repurposed
const Emitter = require('events');

class Main extends Emitter {
  constructor(filter, options = {}){
    super();
    this._timeouts = new Set();
    this.filter = filter;
    this.options = options;
    this.collected = new Map();
    this.finished = false;
    this._timeout = null;
    this._inactivetimeout = null;
    this.messageCollect = this.messageCollect.bind(this);
    this.messageDispose = this.messageDispose.bind(this)
    if(options.time) this._timeout = this.setTimeout(() => this.stop("time"), options.time);
    if(options.idle) this.__inactivetimeout = this.setTimeout(() => this.stop("idle"), options.idle)
  }

  setTimeout(fn, delay, ...args){
    const timeout = setTimeout(() => {
      fn(...args);
      this._timeouts.delete(timeout);
    }, delay);
    this._timeouts.add(timeout);
    return timeout;
  }

  clearTimeout(timeout){
    clearTimeout(timeout);
    this._timeouts.delete(timeout);
  }

  messageDispose(...args){
    if(!this.options.dispose) return;
    const dispose = this.dispose(...args);
    if(!dispose || !this.filter(...args) || !this.collected.has(dispose)) return;
    this.collected.delete(dispose);
    this.emit("dispose", ...args);
    this.checkEnd();
  }

  messageCollect(...args){
    const collect = this.collect(...args);

    if(collect && this.filter(...args, this.collected)){
      this.collected.set(collect, args[0]);
      this.emit("collect", ...args);

      if(this._inactivetimeout){
        this.clearTimeout(this._inactivetimeout);
        this._inactivetimeout = this.setTimeout(() => this.stop("idle"), this.options.idle)
      }
    }
    this.checkEnd()
  }

  get next(){
    return new Promise((resolve, reject) => {
      if(this.finished){
        reject(this.collected);
        return;
      };

      const cleanup = () => {
        this.removeListener("collect", onCollect);
        this.removeListener("end", onEnd)
      };

      const onCollect = item => {
        cleanup();
        resolve(item);
      };

      const onEnd = () => {
        cleanup();
        reject(this.collected);
      };

      this.on("collect", onCollect);
      this.on("end", onEnd)
    });
  }

  stop(cause = "user") {
    if (this.finished) return;

    if (this._timeout) {
      this.clearTimeout(this._timeout);
      this._timeout = null;
    }
    if (this._inactivetimeout) {
      this.clearTimeout(this._inactivetimeout);
      this._inactivetimeout = null;
    }
    this.finished = true;
    this.emit("end", this.collected, cause);
  }

  resetTimer({ time, idle } = {}) {
    if (this._timeout) {
      this.clearTimeout(this._timeout);
      this._timeout = this.setTimeout(() => this.stop("time"), time || this.options.time);
    }

    if (this._inactivetimeout) {
      this.clearTimeout(this._inactivetimeout);
      this._inactivetimeout = this.setTimeout(() => this.stop("idle"), idle || this.options.idle);
    }
  }

  checkEnd() {
    const reason = this.endCause();
    if (reason) this.stop(reason);
  }

  async *[Symbol.asyncIterator](){
    const queue = [];
    const onCollect = item => queue.push(item);
    this.on("collect", onCollect);

    try {
      while(queue.length || !this.finished){
        if(queue.length){
          yield queue.shift();
        } else {
          await new Promise(resolve => {
            const tick = () => {
              this.removeListener("collect", tick);
              this.removeListener("end", tick);
              return resolve();
            };
            this.on("collect", tick);
            this.on("end", tick)
          });
        }
      }
    } finally {
      this.removeListener("collect", onCollect)
    }
  }

  collect() {}
  dispose() {}
  endCause() {}
}

class MessageCollector extends Main {
  constructor(client, channel, filter, options = {}){
    super(filter, options);
    this.channel = channel;
    this.results = 0;

    const massDeleteListener = messages => {
      for(const message of messages.values()) this.messageDispose(message)
    };

    this._handleChannelRemoval = this._handleChannelRemoval.bind(this);
    this._handleGuildRemoval = this._handleGuildRemoval.bind(this);

    client.on("messageCreate", this.messageCollect);
    client.on("messageDelete", this.messageDispose);
    client.on("messageDeleteBulk", massDeleteListener);
    client.on("channelDelete", this._handleChannelRemoval);
    client.on("guildDelete", this._handleGuildRemoval);

    this.once("end", () => {
      client.removeListener("messageCreate", this.messageCollect);
      client.removeListener("messageDelete", this.messageDispose);
      client.removeListener("messageDeleteBulk", massDeleteListener);
      client.removeListener("channelDelete", this._handleChannelRemoval);
      client.removeListener("guildDelete", this._handleGuildRemoval);
    })
  }

  collect(message){
    if(this.channel.id !== message.channel.id) return null;
    this.results++;
    return message.id
  }

  dispose(message){
    return this.channel.id === message.channel.id ? message.id : null
  }

  endCause(){
    if(this.options.max && this.collected.size >= this.options.max) return "max";
    if(this.options.maxLimit && this.received === this.options.maxLimit) return "maxProcessed";
    return null;
  }

  _handleChannelRemoval(channel){
    if(this.channel.id === channel.id){
      this.stop("channelDelete");
    }
  }

  _handleGuildRemoval(guild){
    if(this.channel.guild && guild.id === this.channel.guild.id){
      this.stop("guildDelete");
    }
  }
}

module.exports = MessageCollector;