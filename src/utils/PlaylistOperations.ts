import { PlaylistDocument } from '../interfaces/PlaylistDocument';
import { Playlist } from '../models/Playlist';
import { CreatePlaylistDto } from '../dto/CreatePlaylistDto';
import { searchByUrl } from './youtube';
import { SongDocument } from '../interfaces/SongDocument';
import { Model } from 'mongoose';

export class PlaylistOperations {
  playlist: Model<PlaylistDocument>;
  constructor(playlist: Model<PlaylistDocument>) {
    this.playlist = playlist;
  }

  async findByTitleAndId(
    title: string,
    userId: string,
  ): Promise<PlaylistDocument[]> {
    const titleRegEx = new RegExp(title, 'i');
    const userIdRegEx = new RegExp(userId, 'i');

    return Playlist.find(
      { title: titleRegEx, userId: userIdRegEx },
      { _id: 0, __v: 0 },
    );
  }

  async findByTitle(title: string): Promise<PlaylistDocument[]> {
    const titleRegEx = new RegExp(title, 'i');
    return Playlist.find({ title: titleRegEx }, { _id: 0, __v: 0 });
  }

  async findBySpecificTitle(title: string): Promise<PlaylistDocument | null> {
    return Playlist.findOne({ title }, { _id: 0, __v: 0 });
  }

  async findByUserId(userId: string): Promise<PlaylistDocument[]> {
    const userIdRegEx = new RegExp(userId, 'i');
    return Playlist.find({ userId: userIdRegEx }, { _id: 0, __v: 0 });
  }

  async createPlaylist(
    createPlaylistDto: CreatePlaylistDto,
  ): Promise<PlaylistDocument> {
    const playlist = await Playlist.create(createPlaylistDto);
    return playlist.save();
  }

  async findByTitleAndUpdate(
    title: string,
    songs: string[],
  ): Promise<string | PlaylistDocument> {
    return await Playlist.findOneAndUpdate({ title }, {}, { upsert: false })
      .then(async (playlist) => {
        if (!playlist)
          return `Could not find a playlist with the title: ${title}`;

        for (const song of songs) {
          await searchByUrl(song).then(async (song) => {
            const newSong = <SongDocument>{
              title: song.title,
              url: song.url,
            };

            playlist.songs.push(newSong);
          });
        }

        playlist.save();
        return playlist;
      })
      .catch((err) => {
        return `Vituiks meni: ${err}`;
      });
  }

  /* async findByTitleAndSort(title: string, x: number, y: number) {
  return await Playlist.findOneAndUpdate({ title }, {}, { upsert: false }).then(
    async (playlist) => {
      if (!playlist)
        return `Could not find a playlist with the title: ${title}`;

      const temp = playlist.songs[x];
      playlist.songs[x] = playlist.songs[y];
      playlist.songs[y] = temp;

      await playlist.save();
      return playlist;
    },
  );
}; */

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

  async findByTitleAndDeleteSong(
    title: string,
    index: number,
  ): Promise<string | PlaylistDocument> {
    return await Playlist.findOneAndUpdate({ title }, {}, { upsert: false })
      .then(async (playlist) => {
        if (!playlist)
          return `Could not find a playlist with the title: ${title}`;
        if (index > playlist.songs.length)
          return `Ain't that number a bit too big?`;
        if (index < 0) return `Index can't be zero or negative!`;

        playlist.songs.splice(index, 1);
        playlist.save();
        return playlist;
      })
      .catch((err) => {
        return `Vituiks meni: ${err}`;
      });
  }
}
