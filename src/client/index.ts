import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { VoiceConnection } from 'discord.js';
import { Mongoose } from 'mongoose';
import { join } from 'path';
import { Song } from '../interfaces/Song';
import { connect } from '../utils/mongoConnection';

declare module 'discord-akairo' {
  interface AkairoClient {
    queue: Song[];
    voiceConnection: VoiceConnection | null;
    mongoConnection: Mongoose | null;
    config: LeninardoOpts;
    mongoUri: string;
  }
}

interface LeninardoOpts {
  ownerID?: string;
  token?: string;
  mongoUri?: string;
}

export default class LeninardoClient extends AkairoClient {
  public constructor(opts: LeninardoOpts) {
    super({ ownerID: opts.ownerID });
    this.token = opts.token!;
    this.mongoConnection = null;
    this.mongoUri = opts.mongoUri!;
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
    await connect(this.mongoUri)
      .then((connection) => {
        this.mongoConnection = connection;
        console.log('MongoDB connection established!');
      })
      .catch((err) => {
        console.log('Error: ', err);
      });

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
