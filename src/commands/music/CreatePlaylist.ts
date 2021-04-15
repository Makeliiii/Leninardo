import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Playlist } from '../../models/Playlist';

interface Args {
  title: string;
  songs: string;
}

export default class NowPlaying extends Command {
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

  async exec(msg: Message, { title, songs }: Args): Promise<Message | void> {
    const songsArr: string[] = songs.split(' ');
    const user = msg.member?.user;
    const userId = msg.member?.id;

    try {
      const playlist = await Playlist.create({
        user,
        userId,
        title,
        songs: songsArr,
      });

      await playlist
        .save()
        .then(() => {
          return msg.channel.send(`Playlist **${title}** created!`);
        })
        .catch((err) => {
          return msg.channel.send(`Error: ${err}`);
        });
    } catch (error) {
      return msg.channel.send(`Error: ${error}`);
    }
  }
}
