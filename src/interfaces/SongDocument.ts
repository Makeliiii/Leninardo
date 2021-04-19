import { Document } from 'mongoose';

export interface SongDocument extends Document {
  url: string;
  title: string;
}
