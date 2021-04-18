import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { PlaylistDocument } from '../../interfaces/PlaylistDocument';
import { Playlist } from '../../models/Playlist';

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

  async findByTitleAndId(title: string, userId: string) {
    const titleRegEx = new RegExp(title, 'i');
    const userIdRegEx = new RegExp(userId, 'i');

    return Playlist.find(
      { title: titleRegEx, userId: userIdRegEx },
      { _id: 0, __v: 0 },
    );
  }

  async findByTitle(title: string): Promise<PlaylistDocument[]> {
    const titleRegEx = new RegExp(title, 'i');
    return Playlist.find({ title: titleRegEx }, { _id: 0, __v: 0 });
  }

  async findByUserId(userId: string): Promise<PlaylistDocument[]> {
    const userIdRegEx = new RegExp(userId, 'i');
    return Playlist.find({ userId: userIdRegEx }, { _id: 0, __v: 0 });
  }

  async exec(msg: Message, { title, userId }: Args) {
    let docs: PlaylistDocument[];

    if (!title && !userId)
      return msg.channel.send(
        'You need to provide at least one search parameter. Use flag --title to search by title and/or --userId to search by user ID!',
      );

    if (title && userId) {
      docs = await this.findByTitleAndId(title, userId);
      return msg.channel.send(`${docs}`);
    }

    if (title) {
      docs = await this.findByTitle(title);
      return msg.channel.send(`${docs}`);
    }

    if (userId) {
      docs = await this.findByUserId(userId);
      return msg.channel.send(`${docs}`);
    }
  }
}
