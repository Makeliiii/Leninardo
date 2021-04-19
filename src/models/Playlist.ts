import mongoose, { Schema } from 'mongoose';
import { PlaylistDocument } from '../interfaces/PlaylistDocument';
import { SongSchema } from './Song';

const PlaylistSchema = new Schema<PlaylistDocument>({
  user: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  songs: [SongSchema],
});

export const Playlist = mongoose.model<PlaylistDocument>(
  'Playlist',
  PlaylistSchema,
);
