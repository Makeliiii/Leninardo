import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { PlaylistDocument } from '../../interfaces/PlaylistDocument';
import { Playlist } from '../../models/Playlist';

export default class ModifyPlaylist extends Command {
  public constructor() {
    super('modifyplaylist', {
      aliases: ['mp', 'modigy', 'modifyplaylist', 'modifyp'],
      ratelimit: 1,
      category: 'music',
      description: 'Add, remove, sort songs in a playlist.',
      args: [
        {
          id: 'title',
          type: 'string',
        },
      ],
    });
  }

  async exec(msg: Message) {}
}
