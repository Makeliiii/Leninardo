import mongoose, { Schema } from 'mongoose';

const PlaylistSchema = new Schema({
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

export const Playlist = mongoose.model('Playlist', PlaylistSchema);
