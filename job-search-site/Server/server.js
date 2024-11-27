import { connectToServer } from './connect.js';
import userRoutes from './userRoutes.js';
import jobRoutes from './jobRoutes.js';
import express from 'express';
import cors from 'cors';

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const startServer = async () => {
    try {
      await connectToServer();

      app.use(userRoutes);
      app.use(jobRoutes);
      
      // Start the Express server
      app.listen(PORT, () => {
        console.log(`Server running on Port: ${PORT}`);
      });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };
startServer();