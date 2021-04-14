import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { join } from 'path';

declare module 'discord-akairo' {
  interface AkairoClient {
    queue: Map<any, any>;
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
    this.queue = new Map();
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
  }

  public async start(): Promise<string> {
    await this.init();
    return this.login(this.token!);
  }
}
