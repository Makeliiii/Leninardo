import { Schema } from 'mongoose';
import { SongDocument } from '../interfaces/SongDocument';

export const SongSchema = new Schema<SongDocument>({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
