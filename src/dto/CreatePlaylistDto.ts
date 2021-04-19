import { User } from 'discord.js';
import { Song } from '../interfaces/Song';

export class CreatePlaylistDto {
  user: User;
  userId: string;
  title: string;
  songs: Song[];
}
