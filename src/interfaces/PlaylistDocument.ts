import { Document } from 'mongoose';
import { SongDocument } from './SongDocument';

export interface PlaylistDocument extends Document {
  user: string;
  userId: string;
  title: string;
  songs: SongDocument[];
}
