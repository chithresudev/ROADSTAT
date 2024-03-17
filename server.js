// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

// import userRoutes from './src/api/user.js';
// Import other API route files as needed

// import { router } from '@/api/truck-location/route.js';

import destinationRouter from './src/api/destination-details/route.js';
import accidentDetailsRouter from './src/api/accident-details/route.js';
import driverRouter from './src/api/driver-details/route.js';
import driverHealthRouter from './src/api/driver-health-details/route.js';
import trailerDetailsRouter from './src/api/trailer-details/route.js';
import trailerLocationRouter from './src/api/trailer-location/route.js';
import truckControlRouter from './src/api/truck-control/route.js';
import truckDetailsRouter from './src/api/truck-details/route.js';
import truckDrivingRouter from './src/api/truck-driving/route.js';
import truckLocationRouter from './src/api/truck-location/route.js';
import userRouter from './src/api/user-details/route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));

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
app.use('/api', destinationRouter);
app.use('/api', accidentDetailsRouter);
app.use('/api', driverRouter);
app.use('/api', driverHealthRouter);  
app.use('/api', trailerDetailsRouter);
app.use('/api', trailerLocationRouter);
app.use('/api', truckControlRouter);
app.use('/api', truckDetailsRouter);
app.use('/api', truckDrivingRouter);
app.use('/api', truckLocationRouter);
app.use('/api', userRouter);
// Use other API routes as needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
