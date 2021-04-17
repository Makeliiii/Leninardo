import mongoose, { Schema } from 'mongoose';
import { PlaylistDocument } from '../interfaces/PlaylistDocument';

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
  },
  songs: [String],
});

export const Playlist = mongoose.model<PlaylistDocument>(
  'Playlist',
  PlaylistSchema,
);
