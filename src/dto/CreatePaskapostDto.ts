import { User } from 'discord.js';

export class CreatePaskapostDto {
  user: User;
  userId: string;
  title: string;
  post: string;
}
