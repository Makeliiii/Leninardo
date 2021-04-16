import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Playlist } from '../../models/Playlist';

interface Args {
  title: string;
  songs: string;
}

export default class NowPlaying extends Command {
  public constructor() {
    super('listplaylists', {
      aliases: ['lp', 'list', 'listplaylists', 'listp'],
      ratelimit: 1,
      category: 'music',
      description:
        'List all playlists from the database or by the specified flag.',
      args: [
        {
          id: 'title',
          type: 'option',
          flag: ['--title', '-t'],
        },
        {
          id: 'userId',
          type: 'option',
          flag: ['--userId', '-id'],
        },
      ],
    });
  }

  async exec(msg: Message, { title, songs }: Args): Promise<Message | void> {}
}
