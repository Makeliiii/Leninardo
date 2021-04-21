import { PlaylistDocument } from '../interfaces/PlaylistDocument';
import { Playlist } from '../models/Playlist';
import { CreatePlaylistDto } from '../dto/CreatePlaylistDto';
import { searchByUrl } from './youtube';
import { SongDocument } from '../interfaces/SongDocument';

const findByTitleAndId = async (
  title: string,
  userId: string,
): Promise<PlaylistDocument[]> => {
  const titleRegEx = new RegExp(title, 'i');
  const userIdRegEx = new RegExp(userId, 'i');

  return Playlist.find(
    { title: titleRegEx, userId: userIdRegEx },
    { _id: 0, __v: 0 },
  );
};

const findByTitle = async (title: string): Promise<PlaylistDocument[]> => {
  const titleRegEx = new RegExp(title, 'i');
  return Playlist.find({ title: titleRegEx }, { _id: 0, __v: 0 });
};

const findBySpecificTitle = async (
  title: string,
): Promise<PlaylistDocument | null> => {
  return Playlist.findOne({ title }, { _id: 0, __v: 0 });
};

const findByUserId = async (userId: string): Promise<PlaylistDocument[]> => {
  const userIdRegEx = new RegExp(userId, 'i');
  return Playlist.find({ userId: userIdRegEx }, { _id: 0, __v: 0 });
};

const createPlaylist = async (
  createPlaylistDto: CreatePlaylistDto,
): Promise<PlaylistDocument> => {
  const playlist = await Playlist.create(createPlaylistDto);
  return playlist.save();
};

const findByTitleAndUpdate = async (
  title: string,
  songs: string[],
): Promise<string | PlaylistDocument> => {
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
};

const findByTitleAndDelete = async (
  title: string,
  userId: string,
): Promise<string | PlaylistDocument> => {
  const titleRegEx = new RegExp(title, 'i');
  const found = await Playlist.findOneAndDelete({
    title: titleRegEx,
    userId,
  });

  if (!found) {
    return "Could not delete playlist. Are you sure you're the owner of the playlist?";
  }

  return found;
};

const findByTitleAndDeleteSong = async (
  title: string,
  index: number,
): Promise<string | PlaylistDocument> => {
  console.log(index);
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
};

export {
  findByTitleAndId,
  findByTitle,
  findBySpecificTitle,
  findByUserId,
  createPlaylist,
  findByTitleAndUpdate,
  findByTitleAndDelete,
  findByTitleAndDeleteSong,
};
