import mongoose from 'mongoose';

export const connect = async (mongoUri: string) => {
  return await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
