import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { PlaylistDocument } from '../../interfaces/PlaylistDocument';
import { Playlist } from '../../models/Playlist';

interface Args {
  title: string;
  userId: string;
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
          type: 'string',
          match: 'flag',
        },
        {
          id: 'userId',
          type: 'option',
          flag: ['--userId', '-id'],
        },
      ],
    });
  }

  async findByTitle(title: string): Promise<PlaylistDocument[]> {
    const titleRegEx = new RegExp(title, 'i');
    return Playlist.find({ title: titleRegEx });
  }

  async exec(msg: Message, { title, userId }: Args): Promise<Message | void> {
    let docs: PlaylistDocument[];

    if (!title || !userId)
      return msg.channel.send(
        'You need to provide at least one search parameter. Use flag --title to search by title and/or --userId to search by user ID!',
      );

    if (title) {
      docs = await this.findByTitle(title);
      console.log(title);
      console.log(title);
      return msg.channel.send(`${docs}`);
    }
  }
}
