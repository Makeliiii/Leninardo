import { Document } from 'mongoose';

export interface PaskapostDocument extends Document {
  user: string;
  userId: string;
  title: string;
  post: string;
}
