import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class GitHub extends Command {
  constructor() {
    super('github', {
      aliases: ['github', 'gh', 'repo', 'repository'],
      category: 'util',
      description: 'GitHub link.',
    });
  }

  async exec(msg: Message) {
    const repo = 'https://github.com/Makeliiii/Leninardo';
    return msg.channel.send(repo);
  }
}
