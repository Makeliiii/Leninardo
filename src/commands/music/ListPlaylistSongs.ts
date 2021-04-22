import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class ListPlaylistSongs extends Command {
  public constructor() {
    super('listplaylistsongs', {
      aliases: ['lps', 'listsongs', 'listplaylistsongs', 'listps'],
      ratelimit: 1,
      category: 'music',
      description: 'List songs in a specific playlist.',
      args: [
        {
          id: 'title',
          type: 'string',
        },
      ],
    });
  }

  async exec(msg: Message, { title }: { title: string }) {
    if (!title) return msg.channel.send('Title param required.');
    const playlist = await this.client.playlist.findBySpecificTitle(title);
    if (!playlist) return msg.channel.send('Playlist not found!');
    const songs = playlist.songs.map((song, index) => {
      return `${index + 1}. ${song.title}\n`;
    });

    return msg.channel.send(
      `**${playlist.title}** songs:\n\n${songs.join('')}`,
    );
  }
}
