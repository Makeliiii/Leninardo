import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { PlaylistDocument } from '../../interfaces/PlaylistDocument';
import { Playlist } from '../../models/Playlist';

export default class DeletePlaylist extends Command {
  public constructor() {
    super('deleteplaylist', {
      aliases: ['dp', 'delete', 'deleteplaylist', 'deletep'],
      ratelimit: 1,
      category: 'music',
      description:
        'List all playlists from the database or by the specified flag.',
      args: [
        {
          id: 'title',
          type: 'string',
        },
      ],
    });
  }

  async findByTitleAndDelete(title: string, userId: string): Promise<void> {
    const titleRegEx = new RegExp(title, 'i');
    Playlist.findOneAndDelete({ title: titleRegEx, userId });
  }

  async exec(msg: Message, { title }: { title: string }) {
    if (!title)
      return msg.channel.send(
        'Provide the title of the playlist you want to delete!',
      );

    const userId = msg.member!.id;

    await this.findByTitleAndDelete(title, userId)
      .then(() => {
        console.log(`Success:`);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
}
