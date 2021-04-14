import { Message, VoiceChannel, VoiceConnection } from 'discord.js';

export interface QueueConstruct {
  tc: Message['channel'];
  vc: VoiceChannel;
  connection: Promise<VoiceConnection> | null;
  songs: [];
  volume: number;
  playing: boolean;
}
