import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Pause extends Command {
  public constructor() {
    super('pause', {
      aliases: ['pause', 'pauseta', 'pysäytä'],
      ratelimit: 1,
      category: 'music',
      description: 'Pause the current song.',
    });
  }

  async exec(msg: Message): Promise<Message> {
    const channel = msg.member?.voice.channel;
    const serverQue = this.client.queue;

    if (!channel)
      return msg.channel.send('You must be in a voice channel to pause music!');
    if (!serverQue.length) return msg.channel.send(`There's nothing playing!`);

    this.client.voiceConnection?.dispatcher.pause();
    return msg.channel.send(`**${serverQue[0].title}** paused!`);
  }
}
