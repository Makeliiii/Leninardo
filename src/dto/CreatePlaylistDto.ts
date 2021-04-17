import { User } from 'discord.js';

export class CreatePlaylistDto {
  user: User;
  userId: string;
  title: string;
  songs: string[];
}
