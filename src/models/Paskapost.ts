import mongoose, { Schema } from 'mongoose';
import { PaskapostDocument } from '../interfaces/PaskapostDocument';

const PaskapostSchema = new Schema<PaskapostDocument>({
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
  post: {
    type: String,
    required: true,
  },
});

export const Paskapost = mongoose.model<PaskapostDocument>(
  'Paskapost',
  PaskapostSchema,
);
