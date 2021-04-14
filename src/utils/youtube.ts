import { Video, YouTube } from 'popyt';
import isUrl from 'is-url';

const yt = new YouTube(process.env.YOUTUBE);

export const search = async (videoUrl: string): Promise<Video | undefined> => {
  try {
    if (isUrl(videoUrl)) {
      return yt.getVideo(videoUrl);
    }
  } catch (error) {
    return error;
  }
};
