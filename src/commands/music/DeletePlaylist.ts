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

  async findByTitleAndDelete(
    title: string,
    userId: string,
  ): Promise<string | PlaylistDocument> {
    const titleRegEx = new RegExp(title, 'i');
    const found = await Playlist.findOneAndDelete({
      title: titleRegEx,
      userId,
    });

    if (!found) {
      return "Could not delete playlist. Are you sure you're the owner of the playlist?";
    }

    return found;
  }

  async exec(msg: Message, { title }: { title: string }): Promise<Message> {
    if (!title)
      return msg.channel.send(
        'Provide the title of the playlist you want to delete!',
      );

    const userId = msg.member!.id;

    return await this.findByTitleAndDelete(title, userId)
      .then((asd) => {
        if (typeof asd === 'string') {
          return msg.channel.send(asd);
        } else {
          return msg.channel.send(`Deleted playlist ${asd.title}.`);
        }
      })
      .catch((err) => {
        return msg.channel.send(`Error: ${err}`);
      });
  }
}
