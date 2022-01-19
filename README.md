# 🌸 Sakurajs

PLEASE NOTE THIS FRAMEWORK IS NOT FINISHED!

# 🔧 Examples

```js
let { SakuraClient } = require("sakurajs");
let Eris = require("eris");

let erisClient = new Eris.Client("TOKEN", {});
let client = new SakuraClient(erisClient, {}); // Call the eris client in the main constructor.

// Its a extended message so there are more methods!
client.on("message", (message) => {
       if (message.content.startsWith("!embed") {
           message.post("Hi this is a message from the sakurajs framework"); // message.post() works the same way channel.createMessage() but it catches the error.
       }
});
```

# 📄 Embeds and Colors

The framework uses a larger color pallet than Discord.js so you can choose what you like!
The avalible pallets: `Original`, `Pastel`, `Light`, `Dark`, And more to come!

Embed:
```js
let { ErisMessageEmbed } = require("sakurajs");

let embed = new ErisMessageEmbed()
    .setDescription("This is a embed!")
    .setColor("pasOrange"); // Prefix the color with either "pas", "light", "dark" or the original color
    
message.createEmbedMessage([embed]) // Don't worry about doing embed.toJson(), the method already does it.
```
