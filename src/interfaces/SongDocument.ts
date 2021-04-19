import { Types } from 'mongoose';

export interface SongDocument extends Types.Subdocument {
  url: string;
  title: string;
}
