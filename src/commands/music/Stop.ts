import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Stop extends Command {
  public constructor() {
    super('stop', {
      aliases: ['stop', 'lopeta'],
      ratelimit: 1,
      category: 'music',
      description: 'Stop playing music.',
    });
  }

  async exec(msg: Message): Promise<Message> {
    const channel = msg.member?.voice.channel;
    const serverQue = this.client.queue;

    if (!channel)
      return msg.channel.send('You must be in a voice channel to pause music!');
    if (!serverQue.length) return msg.channel.send(`There's nothing playing!`);

    this.client.queue = [];
    this.client.voiceConnection?.dispatcher.end();
    return msg.channel.send('Stopped playing music, queue cleared!');
  }
}
