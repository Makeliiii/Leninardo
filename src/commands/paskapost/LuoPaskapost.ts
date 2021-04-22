import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

interface Args {
  title: string;
  post: string;
}

export default class LuoPaskapost extends Command {
  public constructor() {
    super('luopaskapost', {
      aliases: ['l', 'luo', 'luopaskapost', 'luop'],
      ratelimit: 1,
      category: 'paskapost',
      description: 'Tee uus paskaposti',
      args: [
        {
          id: 'title',
          type: 'string',
        },
        {
          id: 'post',
          type: 'string',
          match: 'restContent',
        },
      ],
    });
  }

  async exec(msg: Message, { title, post }: Args): Promise<Message> {
    return msg.channel.send(`Paskapost`);
  }
}
