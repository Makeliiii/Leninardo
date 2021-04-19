import mongoose, { Schema } from 'mongoose';
import { PlaylistDocument } from '../interfaces/PlaylistDocument';
import { SongDocument } from '../interfaces/SongDocument';

const SongSchema = new Schema<SongDocument>({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

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
