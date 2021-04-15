import LeninardoClient from './client';
import * as dotenv from 'dotenv';

dotenv.config();
const ownerID = process.env.OWNERID;
const token = process.env.TOKEN;
const mongoUri = process.env.MONGODB;

const client = new LeninardoClient({ token, ownerID, mongoUri });

client.start();
