# Updates

`1.1.2`:
```
The module when using typescript is now `eris-sakura.js` instead of `sakura.js`.
Fixed typings for message.post() so you don't have to put in a file while using ts.
Added resolver types, Because they weren't added yet.
`Resolvers` is now a exported member.
CommandHandler#options no longer shows `responses` when used and now uses the client options instead.
The bot now sends a messsage if the command is disabled.
```
QuickFix:
```
Changed SakuraClient.loadCommands() to .loadPlugins().
The client no longer runs from Event.execute its now .run() for some reason.
```

# 🌸 Sakura.js

A Eris framework based on Discord.js.

# ⚙ Setup
```shell
npm install eris-sakura.js
```

```ts
import sakura from "eris-sakura.js";
```
```js
let sakura = require("eris-sakura.js");
```

# 🔧 Examples

```js
let { SakuraClient } = require("eris-sakura.js");
let Eris = require("eris");

let erisClient = new Eris.Client("TOKEN", {});
let client = new SakuraClient(erisClient, { maxAttempts: 3 }); // Call the eris client in the main constructor.

// Its a extended message so there are more methods!
client.on("message", (message) => {
       if (message.content.startsWith("!send") {
           message.post("Hi this is a message from the eris-sakura.js framework"); // message.post() works the same way channel.createMessage() but it catches the error.
       }
});

client.login(); // The login method will connect the bot, but if it is unable to, it will try to connect using the maxAttempts options or the default 5
```

# 📄 Embeds and Colors

The framework uses a better color pallet than Discord.js so you can choose what you like!
The avalible pallets: `Original`, `Pastel`, `Light`, `Dark`, `Pride`, `Discord`  And more to come!

If you would like more pallets, fork this repo and make a pull request.

Embed:
```js
let { ErisMessageEmbed } = require("eris-sakura.js");

let embed = new ErisMessageEmbed()
    .setDescription("This is a embed!")
    .setColor("pasOrange"); // Prefix the color with either "pas", "light", "dark", "pride" or the original color
    
message.createEmbedMessage([embed]) // Don't worry about doing embed.toJSON(), the method already does it.
```

# 👷 Collectors

The reaction and message collectors are copied code from
[Eris-Reactions](https://github.com/knht/eris-reactions)
[Eris-Message-Collector](https://github.com/GodyFromDiscord/eris-message-collector)

Example of usage
```js
let { MessageCollector, ReactionCollector } = require("eris-sakura.js"); // Import it

client.on("message", (message) => {
    if (message.content.startsWith("!collect")) {
        message.createMessageCollector(filter, options) // Or use it through the extended Message!
        message.createReactionCollector(filter, perma, options);
    }
})
```

# 💬 Responses
The client comes with responses that are customizable.

```js
let client = new SakuraClient(new Eris("TOKEN"), {
    responses: {
        cooldown: (time) => `You can run this command again in ${time}!`,
        error: "OH NO an error!"
    }
});
```

# 📙 Logger
The logger class is the main class of the client.

Usage:
```js
let { Logger } = require("eris-sakura.js");

let log = new Logger();

log.warn("hi") // It will output a red message with a regular timestamp.

let logger = new Logger({ ISO: true }); // Will use the .toISOString() method in the Date constructor.

logger.custom("he", "idk", "blue")(); // A custom logger function to create a custom log. It returns a function because its a custom.
```
