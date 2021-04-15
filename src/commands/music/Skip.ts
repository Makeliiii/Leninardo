import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Skip extends Command {
  constructor() {
    super('skip', {
      aliases: ['skip', 'skippaa'],
      ratelimit: 1,
      category: 'music',
      description: 'Skip the current song.',
    });
  }

  async exec(msg: Message): Promise<Message> {
    const channel = msg.member?.voice.channel;
    const serverQue = this.client.queue;

    if (!channel)
      return msg.channel.send('You must be in a voice channel to pause music!');
    if (!serverQue.length) return msg.channel.send(`There's nothing playing!`);

    this.client.voiceConnection?.dispatcher.end();
    return msg.channel.send(`**${serverQue[0].title}** skipped!`);
  }
}
