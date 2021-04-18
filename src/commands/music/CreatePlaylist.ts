import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { CreatePlaylistDto } from '../../dto/CreatePlaylistDto';
import { PlaylistDocument } from '../../interfaces/PlaylistDocument';
import { Playlist } from '../../models/Playlist';

interface Args {
  title: string;
  songs: string;
}

export default class CreatePlaylist extends Command {
  public constructor() {
    super('createplaylist', {
      aliases: ['cp', 'create', 'createplaylist', 'createp'],
      ratelimit: 1,
      category: 'music',
      description: 'Create a playlist.',
      args: [
        {
          id: 'title',
          type: 'string',
        },
        {
          id: 'songs',
          type: 'string',
          match: 'restContent',
        },
      ],
    });
  }

  async createPlaylist(
    createPlaylistDto: CreatePlaylistDto,
  ): Promise<PlaylistDocument> {
    const playlist = await Playlist.create(createPlaylistDto);
    return playlist.save();
  }

  async exec(msg: Message, { title, songs }: Args): Promise<Message> {
    const songsArr: string[] = songs.split(' ');
    const user = msg.member!.user;
    const userId = msg.member!.id;
    const playlist: CreatePlaylistDto = {
      user,
      userId,
      title,
      songs: songsArr,
    };

    if (!title || !songs)
      return msg.channel.send(
        'You must provide a title and song urls (youtube only for now)!',
      );

    try {
      return await this.createPlaylist(playlist).then(
        (playlist: PlaylistDocument) => {
          return msg.channel.send(`Created playlist: ${playlist.title}`);
        },
      );
    } catch (error) {
      return msg.channel.send(`Error: ${error}`);
    }
  }
}
