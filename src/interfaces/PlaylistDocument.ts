import { Document } from 'mongoose';

export interface PlaylistDocument extends Document {
  user: string;
  userId: string;
  title: string;
  songs: string[];
}
