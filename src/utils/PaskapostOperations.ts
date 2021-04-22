import { Model } from 'mongoose';
import { CreatePaskapostDto } from '../dto/CreatePaskapostDto';
import { PaskapostDocument } from '../interfaces/PaskapostDocument';

export class PaskapostOperations {
  paskapost: Model<PaskapostDocument>;
  constructor(paskapost: Model<PaskapostDocument>) {
    this.paskapost = paskapost;
  }

  async createPaskaPost(createPaskaPostDto: CreatePaskapostDto) {
    const paskapost = await this.paskapost.create(createPaskaPostDto);
    return paskapost.save();
  }
}
