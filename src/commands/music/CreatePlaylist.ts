import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { CreatePlaylistDto } from '../../dto/CreatePlaylistDto';
import { PlaylistDocument } from '../../interfaces/PlaylistDocument';
import { Song } from '../../interfaces/Song';
import { searchByUrl } from '../../utils/youtube';

interface Args {
  title: string;
  songs: string;
}

export default class CreatePlaylist extends Command {
  public constructor() {
    super('createplaylist', {
      aliases: ['cp', 'createplaylist', 'createp'],
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

  async exec(msg: Message, { title, songs }: Args): Promise<Message> {
    const songsArr = songs.split(' ');
    const songsMap: Song[] = [];
    const user = msg.member!.user;
    const userId = msg.member!.id;

    for (const song of songsArr) {
      await searchByUrl(song).then((song) => {
        const newSong: Song = {
          title: song.title,
          url: song.url,
        };

        songsMap.push(newSong);
      });
    }

    const playlist: CreatePlaylistDto = {
      user,
      userId,
      title,
      songs: songsMap,
    };

    if (!title || !songs)
      return msg.channel.send(
        'You must provide a title and song urls (youtube only for now)!',
      );

    try {
      return await this.client.playlist
        .createPlaylist(playlist)
        .then((playlist: PlaylistDocument) => {
          return msg.channel.send(`Created playlist: ${playlist.title}`);
        });
    } catch (error) {
      return msg.channel.send(`Error: ${error}`);
    }
  }
}
