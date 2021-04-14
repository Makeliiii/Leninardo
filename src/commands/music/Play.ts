import { Command } from 'discord-akairo';
import { Collection, Message, VoiceConnection } from 'discord.js';
import isUrl from 'is-url';
import { Video } from 'popyt';
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
    return channel?.join();
  }

  async dlAudio(song: Song) {
    return ytdl(song.url, { filter: 'audioonly' });
  }

  // babbys first recursion
  async play(msg: Message, song: Song) {
    const queue = this.client.queue;

    if (!song) {
      msg.member?.voice.channel?.leave();
      queue.shift();
      return;
    }

    await this.join(msg).then(
      async (connection: VoiceConnection | undefined) => {
        // foul language === check
        if (!connection)
          return msg.channel.send(
            'How about you join a focken voice channel before playing music dumb cunt?!',
          );

        // dl that sweet audio pog
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
        const songs: Song[] = videos.results.map((video: Video) => {
          return {
            url: video.url,
            title: video.title,
          };
        });

        const responses: number[] = [1, 2, 3, 4, 5];
        // i have no idea what type the response is i think i'm dumb
        const filter = (response: any): boolean => {
          return responses.some((res) => res.toString() === response.content);
        };

        msg.channel
          .send(
            `**Found these videos:**\n\n1. **${songs[0].title}**\n2. **${songs[1].title}**\n3. **${songs[2].title}**\n4. **${songs[3].title}**\n5. **${songs[4].title}**\n`,
          )
          .then(() => {
            msg.channel
              .awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
              .then(async (collected: Collection<string, Message>) => {
                console.log(collected);

                // this seems retarded but i am a troglodyte so it's ok let's go
                const song: Song = {
                  url:
                    songs[parseInt(collected.first()?.content || '') - 1].url,
                  title:
                    songs[parseInt(collected.first()?.content || '') - 1].title,
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
          });
      });
    }
  }
}
