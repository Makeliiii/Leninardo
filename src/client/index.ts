import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { VoiceConnection } from 'discord.js';
import { join } from 'path';
import { Song } from '../interfaces/Song';

declare module 'discord-akairo' {
  interface AkairoClient {
    queue: Song[];
    voiceConnection: VoiceConnection | null;
    config: LeninardoOpts;
  }
}

interface LeninardoOpts {
  ownerID?: string;
  token?: string;
}

export default class LeninardoClient extends AkairoClient {
  public constructor(opts: LeninardoOpts) {
    super({ ownerID: opts.ownerID });
    this.token = opts.token!;
  }

  private commandHandler = new CommandHandler(this, {
    directory: join(__dirname, '..', 'commands'),
    prefix: '!',
    defaultCooldown: 1000,
  });

  private listenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, '..', 'listeners'),
  });

  private async init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
    this.queue = [];
    this.voiceConnection = null;
  }

  public async start(): Promise<string> {
    await this.init();
    return this.login(this.token!);
  }
}
