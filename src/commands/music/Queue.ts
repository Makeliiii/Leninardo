import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Song } from '../../interfaces/Song';

export default class Queue extends Command {
  public constructor() {
    super('queue', {
      aliases: ['queue', 'que', 'q'],
      ratelimit: 1,
      category: 'music',
      description: 'Get the songs currently in the queue.',
    });
  }

  async exec(msg: Message): Promise<Message> {
    const serverQue = this.client.queue;

    if (!serverQue.length)
      return msg.channel.send('There is nothing playing...');

    const songs = serverQue
      .map((song: Song, index: number) => {
        return `${index + 1}. ${song.title}\n`;
      })
      .join('');

    return msg.channel.send(`Songs in the queue:\n${songs}`);
  }
}
