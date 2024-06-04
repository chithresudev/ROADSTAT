// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware


dotenv.config(); // Load environment variables from .env file
// import userRoutes from './src/api/user.js';
// Import other API route files as needed

// import { router } from '@/api/truck-location/route.js';

import destinationRouter from './src/api/destination-details/route.js';
import collisionHistoryRouter from './src/api/collision-history/route.js';
import driverRouter from './src/api/driver-details/route.js';
import driverHealthRouter from './src/api/driver-health-details/route.js';
import trailerDetailsRouter from './src/api/trailer-details/route.js';
import trackLocationRouter from './src/api/track-location/route.js';
import truckControlRouter from './src/api/truck-control/route.js';
import truckDetailsRouter from './src/api/truck-details/route.js';
import truckInformationRouter from './src/api/truck-information/route.js';
import truckLocationRouter from './src/api/truck-location/route.js';
import userRouter from './src/api/user-details/route.js';
import truckEfficiencyRouter from './src/api/truck-efficiency/route.js'
import EngineHealthRouter from './src/api/maintenance/Engine-health.js';
import brakeSystemRouter from './src/api/maintenance/Brake-system.js';
import fuelSystemRouter from './src/api/maintenance/Fuel-system.js';
import tireHealthRouter from './src/api/maintenance/Tire-health.js';
import batteryStatusRouter from './src/api/maintenance/Battery-status.js';
import trucksMetricRouter from './src/api/truck-alerts--warnings/route.js'
import transmissionRouter from  './src/api/maintenance/Transmission-status.js';

// import transmissionRouter from  './src/api/maintenance/Transmission-status.js';


const app = express();
const PORT = process.env.PORT || 3000;

// Set the environment variable
//process.env.VITE_API_URL = ; // Example URL

// Connect to MongoDB
mongoose.connect(process.env.VITE_MONGO_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());
app.use(cors());

// Use API routes
//app.use('/api', userRouter);

app.use('/api', destinationRouter); 
app.use('/api', collisionHistoryRouter);
app.use('/api', driverRouter);
app.use('/api', driverHealthRouter);  
app.use('/api', trailerDetailsRouter);
app.use('/api', trackLocationRouter);
app.use('/api', truckControlRouter);
app.use('/api', truckDetailsRouter);
app.use('/api', truckInformationRouter);
app.use('/api', truckLocationRouter);
app.use('/api', userRouter);
app.use('/api', truckEfficiencyRouter);
app.use('/api', EngineHealthRouter);
app.use('/api', brakeSystemRouter);
app.use('/api', fuelSystemRouter);
app.use('/api', tireHealthRouter);
app.use('/api', batteryStatusRouter);
app.use('/api', trucksMetricRouter);
app.use('/api', transmissionRouter);

// Use other API routes as needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});