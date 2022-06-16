# all old changelogs go here

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
