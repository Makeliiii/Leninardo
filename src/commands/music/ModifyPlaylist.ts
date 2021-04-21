import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { findByTitleAndUpdate } from '../../utils/mongoOperations';

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
  }
}
