import { Video, YouTube } from 'popyt';
import * as dotenv from 'dotenv';

dotenv.config();

const yt = new YouTube(process.env.YOUTUBE);

export const searchByUrl = async (videoUrl: string): Promise<Video> => {
  return await yt.getVideo(videoUrl);
};

export const searchByString = async (
  videoString: string,
): Promise<{
  results: Video[];
  prevPageToken: string;
  nextPageToken: string;
}> => {
  return await yt.searchVideos(videoString, 5);
};
