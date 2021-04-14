import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { search } from '../../utils/youtube';

export default class Play extends Command {
  constructor() {
    super('play', {
      aliases: ['play', '+', 'soita', 'p'],
      ratelimit: 1,
      category: 'music',
      description: 'Play a video from youtube.',
      args: [
        {
          id: 'url',
          type: 'string',
          match: 'content',
        },
      ],
    });
  }

  async exec(msg: Message, { url }: { url: string }) {
    const channel = msg.member?.voice.channel;

    if (!url) return msg.channel.send('Please provide an argument!');
    if (!channel)
      return msg.channel.send('You must be in a voice channel to play music!');

    await search(url).then((video) => {
      if (!video)
        return msg.channel.send('Could not find requested song/video!');

      msg.channel.send(video?.url);
    });
  }
}
