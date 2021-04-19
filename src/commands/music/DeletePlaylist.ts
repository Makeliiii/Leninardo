import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { findByTitleAndDelete } from '../../utils/mongoOperations';

export default class DeletePlaylist extends Command {
  public constructor() {
    super('deleteplaylist', {
      aliases: ['dp', 'delete', 'deleteplaylist', 'deletep'],
      ratelimit: 1,
      category: 'music',
      description: 'Delete a playlist by a title.',
      args: [
        {
          id: 'title',
          type: 'string',
        },
      ],
    });
  }

  async exec(msg: Message, { title }: { title: string }): Promise<Message> {
    if (!title)
      return msg.channel.send(
        'Provide the title of the playlist you want to delete!',
      );

    const userId = msg.member!.id;

    return await findByTitleAndDelete(title, userId)
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
