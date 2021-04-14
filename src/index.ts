import LeninardoClient from './client';
import * as dotenv from 'dotenv';

dotenv.config();
const ownerID = process.env.OWNERID;
const token = process.env.TOKEN;

const client = new LeninardoClient({ token, ownerID });

client.start();
