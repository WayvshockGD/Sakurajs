import chalk from "chalk";
import { CronJob } from "cron";
import Eris from "eris";
import EventEmitter from "events";
import moment from "moment";

declare module "sakura.js" {

    interface SakuraClientOptions {
        log?: {
            debug?: boolean;
            ISO?: boolean;
        };
        maxAttempts?: number;
        responses?: SakuraClientResponses;
        command: SakuraClientCommandOptions;
    }

    interface MessageCollectorOptions {
        time?: number;
        idle?: number;
        dispose?: boolean;
    }

    interface ReactionCollectorOptions {
        time?: number;
        maxMatches?: number;
    }

    interface SakuraClientCommandOptions {
        defaultPrefix: string;
        initHandler: boolean;
    }

    interface ExtendedStructureClients {
        eris: Eris.Client;
        sakura: SakuraClient;
    }

    interface SakuraClientResponses {
        error?: string | false;
        noArgs?: string | false;
        noCommand?: string | false;
        forChannel?: string | false;
        cooldown?: (time: number) => string | false;
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

    interface MessageCollectorEvents<T> {
        (event: "collect", listener: (message: Eris.Message) => void): T;
        (event: "dispose", listener: (message: Eris.Message) => void): T;
        (event: "end", listener: (collected: number, cause: string) => void): T;
    }

    interface ReactionCollectorEvents<T> {
        (event: "reacted", listener: (data: ReactionCollectorReactedData) => void): T;
        (event: "end", listener: (collected: number, reason: string) => void): T;
    }

    interface ReactionCollectorReactedData {
        msg: Eris.Message;
        emoji: Eris.PartialEmoji;
        reactor: Eris.Uncached | Eris.Member;
    }

    interface LoggerFormatOptions {
        color: keyof (typeof chalk);
        useISO: boolean;
        content: string;
    }

    interface PluginOptions {
        name: string;
    }

    interface EventCreateOptions<T extends keyof Eris.ClientEvents> {
        event: T;
        once: boolean;
        execute?: boolean;
        run(logger: Logger, ...data: Eris.ClientEvents[T]): any;
    }

    interface CommandCreatorOptions<T extends CommandCreatorContextArgTypes, D extends SakuraCommandArgData> {
        names: string[];
        onlyForChannels?: CommandCreatorChannelForOptions;
        description?: string;
        enabled?: boolean;
        args?: CommandArgsOptions<T, D>;
        owner?: boolean;
        cooldown?: number;
        execute(ctx: CommandContext<T, D>, util: CommandUtil): any;
    }

    interface CommandCreatorChannelForOptions {
        ids: string[];
        message: string;
    }

    interface CommandArgData<T, K> {
        parsed: T extends "data" ? K : string;
        raw: string[];
    }
    
    interface CommandContext<T, K> {
        message: ExtendedMessage;
        instances: ExtendedStructureClients;
        args: CommandArgData<T, K>;
    }

    type CollectorFilter = (m: Eris.Message, collected: number) => boolean;

    type ReactionCollectorFilter = (id: string) => boolean;

    type SakuraCommandArgData = (Eris.User | Eris.TextableChannel | Eris.Role);

    type SakuraCronTypeArgs = string | Date | moment.Moment;

    type CommandArgsOptions<T extends CommandCreatorContextArgTypes, K extends SakuraCommandArgData> = [CommandCreatorContextMentionTypes, T];

    type CommandCreatorContextMentionTypes = "member" | "channel" | "role";
    
    type CommandCreatorContextArgTypes = "mention" | "id" | "data";

    type ErisColorResolve = ErisColorPalletResolve | ErisPastelColorResolve | ErisDarkColorResolve | ErisLightColorResolve | ErisPrideColorResolve | ErisDiscordColorResolve;

    type ErisPastelColorResolve = "pasRed" | "pasOrange" | "pasYellow" | "pasGreen" | "pasBlue" | "pasPurple";

    type ErisColorPalletResolve = "red" | "orange" | "yellow" | "green" | "lime" | "blue" | "violet" | "white" | "fuchsia" | "luminousVividPink" | "navy";

    type ErisDarkColorResolve = "darkRed" | "darkOrange" | "darkYellow" | "darkGreen" | "darkBlue" | "darkPurple" | "darkGold";

    type ErisLightColorResolve = "lightRed" | "lightOrange" | "lightYellow" | "lightGreen" | "lightBlue" | "lightPurple";

    type ErisPrideColorResolve = "cornFlowerBlue" | "pacificBlue" | "corn" | "rajah" | "bigDripOruby" | ErisPridePalletColorResolve;

    type ErisPridePalletColorResolve = "prideRed" | "prideOrange" | "prideYellow" | "prideGreen" | "prideBlue" | "pridePurple";
    
    type ErisDiscordColorResolve = "blurple" | "greyple" | "notQuiteBlack" | "darkButNotQuiteBlack";

    export class SakuraClient extends EventEmitter {
        plugins: ExtendedCollection<string, Plugin>;
        commandPlugins: ExtendedCollection<string, CommandCreator>;
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
        memberGuildRoles: Eris.Role[];
        createEmbedMessage(content: ErisEmbed | ErisEmbed[] | ErisMessageEmbed | ErisMessageEmbed[]): Eris.Message;
        post(content: Eris.MessageContent, file: Eris.FileContent | Eris.FileContent[]): Eris.Message;
        createMessageCollector(filter: CollectorFilter, options: MessageCollectorOptions): MessageCollector;
        createReactionCollector(filter: ReactionCollectorOptions, perma: boolean, options: ReactionCollectorOptions): ReactionCollector;
    }

    export class Plugin {
        get name(): string;
        public commands: ExtendedCollection<string, CommandCreator>;
        public constructor(options: PluginOptions);
        setCommands(commands: CommandCreator): any;
    }

    export class CommandUtil {
        private command: CommandCreator;
        private message: ExtendedMessage;
        constructor(command: CommandCreator, message: ExtendedMessage);
        cron(time: SakuraCronTypeArgs, fn: () => any): SakuraCron;
        public createEmbed(data: ErisEmbed): ErisMessageEmbed;
    }

    export class CommandArgs<T extends CommandCreatorContextArgTypes, K extends SakuraCommandArgData> {
        private message: ExtendedMessage;
        private args: CommandArgsOptions<T, K>;
        public parsed: string;
        public constructor(arg: CommandArgsOptions<T, K>, message: ExtendedMessage);
        parse(): string;
    }

    export class Util {
        static parseColor(color: ErisColorResolve): number;
    }

    class CommandCreator<K extends SakuraCommandArgData = SakuraCommandArgData, T extends CommandCreatorContextArgTypes = CommandCreatorContextArgTypes> {
        public names: string[];
        public description?: string | undefined;
        public owner?: boolean | undefined;
        public enabled?: boolean | undefined;
        public options: CommandCreatorOptions<T, K>;
        public args?: CommandArgsOptions<T, K> | undefined;
        public onlyForChannels?: CommandCreatorChannelForOptions | undefined;
        public cooldown?: number;
        public constructor(options: CommandCreatorOptions<T, K>);
        initArgs(message: ExtendedMessage): CommandArgs<T, K>;
        execute(ctx: CommandContext<T, K>, util: CommandUtil): any;
        private verify();
    }

    export class Event<K extends keyof Eris.ClientEvents> implements EventCreateOptions<K> {
        public event: K;
        public once: boolean;
        public execute?: boolean | undefined;
        private options: EventCreateOptions<K>;
        public constructor(options: EventCreateOptions<K>);
        public run(logger: Logger, ...data: Eris.ClientEvents[K]): any;
    }

    export class CommandHandler {
        public cooldowns: Map<string, number>;
        public client: SakuraClient;
        public options: SakuraClientCommandOptions;
        constructor(options: SakuraClientCommandOptions);
        get responses(): SakuraClientResponses;
        setup(): any;
    }

    export class SakuraCron extends CronJob {
        constructor(time: SakuraCronTypeArgs, func: () => void);
        static init(time: SakuraCronTypeArgs, func: () => void): SakuraCron;
    }

    export class MessageCollector extends EventEmitter {
        results: number;
        filter: CollectorFilter;
        collected: Map<any, any>; // IDK the types
        finished: boolean;
        private channel: Eris.TextableChannel;
        on: MessageCollectorEvents<this>;
        constructor(client: Eris.Client, channel: Eris.TextableChannel, filter: CollectorFilter, options?: MessageCollectorOptions);
        collect(message: Eris.Message): string;
        dispose(message: Eris.Message): string | null;
        endCause(): "max" | "maxProcessed" | null;
    }

    export class ReactionCollector extends EventEmitter {
        public constructor(message: ExtendedMessage, filter: ReactionCollectorFilter, permanent: boolean, options: ReactionCollectorOptions);
        on: ReactionCollectorEvents<this>;
        checkPrecondition(msg: Eris.Message, emoji: Eris.PartialEmoji, reactor: Eris.Uncached | Eris.Member): boolean;
        stopListening(reason: string): void;
    }

    export class ExtendedCollection<K, V> extends Map<K, V> {}
}

declare module "eris" {
    interface Channel {
        guild: Eris.Guild;
    }
}