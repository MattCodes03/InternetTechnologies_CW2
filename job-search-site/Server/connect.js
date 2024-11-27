import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

let database

export const connectToServer = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    database = client.db("JobSearchSite");
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export const getDB = () => {
  return database;
};