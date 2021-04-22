import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { PlaylistDocument } from '../../interfaces/PlaylistDocument';

interface Args {
  title: string;
  userId: string;
}

export default class ListPlaylists extends Command {
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
          match: 'option',
          flag: ['--title', '-t'],
        },
        {
          id: 'userId',
          match: 'option',
          flag: ['--userId', '-id'],
        },
      ],
    });
  }

  async exec(msg: Message, { title, userId }: Args) {
    let docs: PlaylistDocument[];

    if (!title && !userId)
      return msg.channel.send(
        'You need to provide at least one search parameter. Use flag --title to search by title and/or --userId to search by user ID!',
      );

    if (title && userId) {
      docs = await this.client.playlist.findByTitleAndId(title, userId);
      return msg.channel.send(`${docs}`);
    }

    if (title) {
      docs = await this.client.playlist.findByTitle(title);
      return msg.channel.send(`${docs}`);
    }

    if (userId) {
      docs = await this.client.playlist.findByUserId(userId);
      return msg.channel.send(`${docs}`);
    }
  }
}
