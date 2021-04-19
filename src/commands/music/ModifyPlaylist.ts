import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { PlaylistDocument } from '../../interfaces/PlaylistDocument';
import { SongDocument } from '../../interfaces/SongDocument';
import { Playlist } from '../../models/Playlist';
import { findBySpecificTitle } from '../../utils/mongoOperations';
import { searchByUrl } from '../../utils/youtube';

interface Args {
  title: string;
  add: boolean;
  remove: boolean;
  sort: boolean;
  content: string;
}

export default class ModifyPlaylist extends Command {
  public constructor() {
    super('modifyplaylist', {
      aliases: ['mp', 'modify', 'modifyplaylist', 'modifyp'],
      ratelimit: 1,
      category: 'music',
      description: 'Add, remove, sort songs in a playlist.',
      args: [
        {
          id: 'title',
          type: 'string',
        },
        {
          id: 'add',
          match: 'flag',
          flag: ['--add', '-a'],
        },
        {
          id: 'remove',
          match: 'flag',
          flag: ['--remove', '-r'],
        },
        {
          id: 'sort',
          match: 'flag',
          flag: ['--sort', '-s'],
        },
        {
          id: 'content',
          match: 'restContent',
          type: 'string',
        },
      ],
    });
  }

  async exec(msg: Message, { title, add, remove, sort, content }: Args) {
    if (!title) return msg.channel.send('Provide a title to search by!');

    const playlist = await findBySpecificTitle(title);

    if (!playlist)
      return msg.channel.send(
        `Could not find a playlist with the title: ${title}`,
      );

    if (add) {
      const songs = content.split(' ');
      // any cause i can't really use the "SongDocument" interface here
      // as it will be missing a bunch of methods and such cause it
      // extends the "Document" interface from mongooses typings zzz
      for (const song of songs) {
        await searchByUrl(song).then(async (song) => {
          // read comment above, same applies
          const newSong = <SongDocument>{
            title: song.title,
            url: song.url,
          };

          playlist.songs.push(newSong);
        });
      }

      await playlist.save();
      return msg.channel.send(`Saved songs to playlist: ${playlist.title}.`);
    }

    return msg.channel.send(`Found ${playlist.title}.`);
  }
}
