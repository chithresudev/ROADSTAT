// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file
// import userRoutes from './src/api/user.js';
// Import other API route files as needed

// import { router } from '@/api/truck-location/route.js';

import truckLocationRouter from './src/api/truck-location/route.js'
import truckDetailsRouter from './src/api/truck-details/route.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());

// Use API routes
// app.use('/api', userRoutes);
// app.use('/api', truckLocationRouter);
app.use('/api', truckDetailsRouter);
// Use other API routes as needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
