import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class NowPlaying extends Command {
  public constructor() {
    super('nowplaying', {
      aliases: ['np', 'nowplaying'],
      ratelimit: 1,
      category: 'music',
      description: 'Get the song currently playing.',
    });
  }

  async exec(msg: Message): Promise<Message> {
    const serverQue = this.client.queue;

    if (!serverQue) return msg.channel.send('There is nothing playing...');

    return msg.channel.send(`Now playing: **${serverQue[0].title}**`);
  }
}
