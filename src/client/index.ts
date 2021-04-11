import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { join } from "path";

export class LeninardoClient extends AkairoClient {
  public constructor(ownerID: string, token: string) {
    super({ ownerID });
    this.token = token;
  }

  private commandHandler = new CommandHandler(this, {
    directory: join(__dirname, "..", "commands"),
    prefix: "!",
    defaultCooldown: 1000,
  });

  private listenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, "..", "listeners"),
  });

  private init(): void {
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }

  public start(): Promise<string> {
    this.init();
    return this.login(this.token);
  }
}
