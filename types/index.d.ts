import chalk from "chalk";
import Eris from "eris";
import EventEmitter from "events";

declare module "sakura.js" {

    interface SakuraClientOptions {
        log?: {
            debug?: boolean;
            ISO?: boolean;
        };
        maxAttempts?: number;
    }

    interface ExtendedStructureClients {
        eris: Eris.Client;
        sakura: SakuraClient;
    }

    interface ErisEmbed {
        image: Eris.EmbedImageOptions;
        thumbnail: Eris.EmbedImageOptions;
        author: Eris.EmbedAuthorOptions;
        title: Eris.EmbedOptions["title"];
        description: Eris.EmbedOptions["description"];
        fields: Eris.EmbedField[];
        timestamp: Eris.EmbedOptions["timestamp"];
        footer: Eris.EmbedFooterOptions;
        color: number | ErisColorResolve;
    }
    
    interface ExtendedClientEvents<T> {
        (event: "message", listener: (message: ExtendedMessage) => void): T;
    }

    interface LoggerFormatOptions {
        color: keyof (typeof chalk);
        useISO: boolean;
        content: string;
    }

    interface EventCreateOptions<T extends keyof Eris.ClientEvents> {
        event: T;
        once: boolean;
        execute?: boolean;
        run(data: Eris.ClientEvents[T], logger: Logger): any;
    }

    interface CommandCreatorOptions {
        names: string[];
        onlyForChannels?: CommandCreatorChannelForOptions;
        description?: string;
        enabled?: boolean;
        args?: CommandArgsOptions;
        owner?: boolean;
        execute(ctx: CommandContext, util: CommandUtil): any;
    }

    interface CommandCreatorChannelForOptions {
        ids: string[];
        message: string;
    }

    interface CommandArgData {
        parsed: string;
        raw: string[];
    }
    
    interface CommandContext {
        message: ExtendedMessage;
        instances: ExtendedStructureClients;
        args: CommandArgData;
    }

    type CommandArgsOptions = [CommandCreatorContextMentionTypes, CommandCreatorContextArgTypes];

    type CommandCreatorContextMentionTypes = "member" | "channel" | "role";
    
    type CommandCreatorContextArgTypes = "mention" | "id";

    type ErisColorResolve = ErisColorPalletResolve | ErisPastelColorResolve | ErisDarkColorResolve | ErisLightColorResolve | ErisPrideColorResolve | ErisDiscordColorResolve;

    type ErisPastelColorResolve = "pasRed" | "pasOrange" | "pasYellow" | "pasGreen" | "pasBlue" | "pasPurple";

    type ErisColorPalletResolve = "red" | "orange" | "yellow" | "green" | "lime" | "blue" | "violet" | "white" | "fuchsia" | "luminousVividPink" | "navy";

    type ErisDarkColorResolve = "darkRed" | "darkOrange" | "darkYellow" | "darkGreen" | "darkBlue" | "darkPurple" | "darkGold";

    type ErisLightColorResolve = "lightRed" | "lightOrange" | "lightYellow" | "lightGreen" | "lightBlue" | "lightPurple";

    type ErisPrideColorResolve = "cornFlowerBlue" | "pacificBlue" | "corn" | "rajah" | "bigDripOruby" | ErisPridePalletColorResolve;

    type ErisPridePalletColorResolve = "prideRed" | "prideOrange" | "prideYellow" | "prideGreen" | "prideBlue" | "pridePurple";
    
    type ErisDiscordColorResolve = "blurple" | "greyple" | "notQuiteBlack" | "darkButNotQuiteBlack";

    export class SakuraClient extends EventEmitter {
        client: Eris.Client;
        options: SakuraClientOptions;
        on: ExtendedClientEvents<this>;
        logger: Logger;
        private attempts: number;
        constructor(client: Eris.Client, options?: SakuraClientOptions);
        login(): Promise<string>;
        processEvents(): void;
        getClients(): ExtendedStructureClients;
    }

    export class Logger {
        options: SakuraClientOptions["log"];
        constructor(options: SakuraClientOptions["log"]);
        success(content: string): void;
        info(content: string): void;
        warn(content: string): void;
        error(content: string): void;
        custom(content: string, type: string, color: LoggerFormatOptions["color"]): () => void;
        formatLoggerTime(type: string, options: LoggerFormatOptions): string;
    }

    export class SakuraError extends TypeError {}

    export class SakuraCommandError extends Error {
        public id: string;
        constructor(id: string, content: string);
    }

    export class ErisMessageEmbed {
        title: string;
        description: string;
        url: string;
        fields: Eris.EmbedField[];
        color: number;
        author: Eris.EmbedAuthorOptions;
        image: Eris.EmbedImageOptions;
        thumbnail: Eris.EmbedImageOptions;
        timestamp: Date;
        public constructor(data?: Eris.EmbedOptions);
        /** Checks if two exact embeds are the same */
        equal(embed1: Eris.EmbedOptions, embed2: Eris.EmbedOptions): boolean;
        setTitle(str: string): this;
        setURL(url: string): this;
        setDescription(str: string): this;
        setAuthor(data: ErisEmbed["author"]): this;
        setFooter(data: ErisEmbed["footer"]): this;
        addField(field: Eris.EmbedField): this;
        setFields(fields: ErisEmbed["fields"]): this;
        setColor(color: ErisColorResolve | number): this;
        toJSON(): Eris.EmbedOptions;
    }

    export class ExtendedMessage extends Eris.Message {
        sakura: SakuraClient;
        guild: Eris.Guild;
        createEmbedMessage(content: ErisEmbed | ErisEmbed[] | ErisMessageEmbed | ErisMessageEmbed[]): Eris.Message;
        post(content: Eris.MessageContent, file: Eris.FileContent | Eris.FileContent[]): Eris.Message;
    }

    export class CommandUtil {
        private command: CommandCreator;
        private message: ExtendedMessage;
        constructor(command: CommandCreator, message: ExtendedMessage);
        public createEmbed(data: ErisEmbed): ErisMessageEmbed;
    }

    export class CommandArgs {
        private message: ExtendedMessage;
        private args: CommandArgsOptions;
        public parsed: string;
        public constructor(arg: CommandArgsOptions, message: ExtendedMessage);
        parse(): string;
    }

    export class Util {
        static parseColor(color: ErisColorResolve): number;
    }

    class CommandCreator implements CommandCreatorOptions {
        public names: string[];
        public description?: string | undefined;
        public owner?: boolean | undefined;
        public enabled?: boolean | undefined;
        public options: CommandCreatorOptions;
        public constructor(options: CommandCreatorOptions);
        initArgs(message: ExtendedMessage): CommandArgs;
        execute(ctx: CommandContext, util: CommandUtil): any;
        private verify();
    }

    export class Event<K extends keyof Eris.ClientEvents> implements EventCreateOptions<K> {
        public event: K;
        public once: boolean;
        public execute?: boolean | undefined;
        public run(data: Eris.ClientEvents[K], logger: Logger): any;
    }

    export let Command: { 
        creator: CommandCreator 
    };
}

declare module "eris" {
    interface Channel {
        guild: Eris.Guild;
    }
}