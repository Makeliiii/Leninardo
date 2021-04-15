import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Resume extends Command {
  public constructor() {
    super('resume', {
      aliases: ['resume', 'jatka'],
      ratelimit: 1,
      category: 'music',
      description: 'Resume the current song.',
    });
  }

  async exec(msg: Message): Promise<Message> {
    const channel = msg.member?.voice.channel;
    const serverQue = this.client.queue;

    if (!channel)
      return msg.channel.send('You must be in a voice channel to pause music!');
    if (!serverQue.length) return msg.channel.send(`There's nothing playing!`);

    this.client.voiceConnection?.dispatcher.resume();
    return msg.channel.send(`**${serverQue[0].title}** resumed!`);
  }
}
