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

    type ErisColorResolve = ErisColorPalletResolve | ErisPastelColorResolve | ErisDarkColorResolve | ErisLightColorResolve;
    type ErisPastelColorResolve = "pasRed" | "pasOrange" | "pasYellow" | "pasGreen" | "pasBlue" | "pasPurple";
    type ErisColorPalletResolve = "red" | "orange" | "yellow" | "green" | "lime" | "blue" | "violet" | "white";
    type ErisDarkColorResolve = "darkRed" | "darkOrange" | "darkYellow" | "darkGreen" | "darkBlue" | "darkPurple";
    type ErisLightColorResolve = "lightRed" | "lightOrange" | "lightYellow" | "lightGreen" | "lightBlue" | "lightPurple";

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
        createEmbedMessage(content: Eris.EmbedOptions | Eris.EmbedOptions[] | ErisMessageEmbed | ErisMessageEmbed[]): Eris.Message;
        post(content: Eris.MessageContent, file: Eris.FileContent | Eris.FileContent[]): Eris.Message;
    }
}

declare module "eris" {
    interface Channel {
        guild: Eris.Guild;
    }
}