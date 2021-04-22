import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import {
  findByTitleAndDeleteSong,
  //findByTitleAndSort,
  findByTitleAndUpdate,
} from '../../utils/mongoOperations';

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

    if (add) {
      const songs = content.split(' ');
      return await findByTitleAndUpdate(title, songs).then((playlist) => {
        if (typeof playlist === 'string') return msg.channel.send(playlist);
        return msg.channel.send(`Added songs to playlist ${playlist.title}`);
      });
    }

    if (remove) {
      const index = parseInt(content);
      return await findByTitleAndDeleteSong(title, index - 1).then(
        (playlist) => {
          if (typeof playlist == 'string') return msg.channel.send(playlist);
          return msg.channel.send(
            `Removed song at index: ${index} from playlist: ${playlist.title}`,
          );
        },
      );
    }

    /* if (sort) {
      const indexes = content.split(' ');

      if (indexes.length > 2)
        return msg.channel.send('Only two indexes allowed!');

      const x = parseInt(indexes[0]);
      const y = parseInt(indexes[1]);
      return await findByTitleAndSort(title, x - 1, y - 1).then((playlist) => {
        if (typeof playlist == 'string') return msg.channel.send(playlist);
        return msg.channel.send(`Swapped songs at indexes: ${x} and ${y}`);
      });
    } */
  }
}
