# 🌸 Sakurajs

PLEASE NOTE THIS FRAMEWORK IS NOT FINISHED!

A Eris framework based on Discord.js.

# 🔧 Examples

```js
let { SakuraClient } = require("sakurajs");
let Eris = require("eris");

let erisClient = new Eris.Client("TOKEN", {});
let client = new SakuraClient(erisClient, { maxAttempts: 3 }); // Call the eris client in the main constructor.

// Its a extended message so there are more methods!
client.on("message", (message) => {
       if (message.content.startsWith("!embed") {
           message.post("Hi this is a message from the sakurajs framework"); // message.post() works the same way channel.createMessage() but it catches the error.
       }
});

client.login(); // The login method will connect the bot, but if it is unable to, it will try to connect using the maxAttempts options or the default 5
```

# 📄 Embeds and Colors

The framework uses a better color pallet than Discord.js so you can choose what you like!
The avalible pallets: `Original`, `Pastel`, `Light`, `Dark`, And more to come!
If you would like more pallets, fork this repo and make a pull request.

Embed:
```js
let { ErisMessageEmbed } = require("sakurajs");

let embed = new ErisMessageEmbed()
    .setDescription("This is a embed!")
    .setColor("pasOrange"); // Prefix the color with either "pas", "light", "dark" or the original color
    
message.createEmbedMessage([embed]) // Don't worry about doing embed.toJSON(), the method already does it.
```

# 📙 Logger
The logger class is the main class of the client.

Usage:
```js
let { Logger } = require("sakurajs");

let log = new Logger();

log.warn("hi") // It will output a red message with a regular timestamp.

let logger = new Logger({ ISO: true }); // Will use the .toISOString() method in the Date constructor.

logger.custom("he", "idk", "blue")(); // A custom logger function to create a custom log. It returns a function because its a custom.
```
