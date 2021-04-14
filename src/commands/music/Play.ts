import { Command } from 'discord-akairo';
import { Message, VoiceConnection } from 'discord.js';
import isUrl from 'is-url';
import ytdl from 'ytdl-core';
import { Song } from '../../interfaces/Song';
import { searchByString, searchByUrl } from '../../utils/youtube';

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

  async join(msg: Message): Promise<VoiceConnection | undefined> {
    const channel = msg.member?.voice.channel;

    try {
      return channel?.join();
    } catch (error) {
      msg.channel.send('You must be in a voice channel to play music dipshit!');
    }
  }

  async dlAudio(song: Song) {
    return ytdl(song.url, { filter: 'audioonly' });
  }

  async play(msg: Message, song: Song) {
    const queue = this.client.queue;

    if (!song) {
      msg.member?.voice.channel?.leave();
      queue.shift();
      return;
    }

    await this.join(msg).then(
      async (connection: VoiceConnection | undefined) => {
        if (!connection) return msg.channel.send("I'm retarded");
        const audio = await this.dlAudio(song);
        connection
          .play(audio)
          .on('finish', () => {
            queue.shift();
            this.play(msg, this.client.queue[0]);
          })
          .on('error', (error) => {
            msg.member?.voice.channel?.leave();
            return msg.channel.send(`No vittu ei: ${error}`);
          });

        msg.channel.send(`Started playing: **${song.title}**`);
      },
    );
  }

  async exec(msg: Message, { url }: { url: string }) {
    if (!url)
      return msg.channel.send('Please provide a link or something idk?!?!?11!');

    const serverQue = this.client.queue;

    if (isUrl(url)) {
      await searchByUrl(url).then(async (video) => {
        const song: Song = {
          url: video.url,
          title: video.title,
        };

        if (serverQue.length === 0) {
          serverQue.push(song);
          return this.play(msg, serverQue[0]);
        } else {
          serverQue.push(song);
          console.log(serverQue);
          msg.channel.send(`Added **${song.title}** to the queue!`);
        }
      });
    } else {
      await searchByString(url).then(async (videos) => {
        console.log(videos);
      });
    }
  }
}
