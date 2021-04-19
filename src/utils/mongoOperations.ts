import { PlaylistDocument } from '../interfaces/PlaylistDocument';
import { Playlist } from '../models/Playlist';
import { CreatePlaylistDto } from '../dto/CreatePlaylistDto';

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

export {
  findByTitleAndId,
  findByTitle,
  findBySpecificTitle,
  findByUserId,
  createPlaylist,
  findByTitleAndDelete,
};
