import { YouTube } from 'popyt';
import isUrl from 'is-url';

const yt = new YouTube(process.env.YOUTUBE);

export const search = async (videoUrl: string): Promise<any> => {
  try {
    if (isUrl(videoUrl)) {
      return await yt.getVideo(videoUrl);
    } else {
      return await yt.searchVideos(videoUrl, 5);
    }
  } catch (error) {
    return error;
  }
};
