// server.js
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware


const __dirname = path.resolve();
dotenv.config({path: __dirname + '/.env'}); // Load environment variables from .env file
// import userRoutes from './src/api/user.js';
// Import other API route files as needed

// import { router } from '@/api/truck-location/route.js';

import destinationRouter from './src/Controllers/destination-details/route.js';
import collisionHistoryRouter from './src/Controllers/collision-history/route.js';
import driverRouter from './src/Controllers/driver-details/route.js';
import driverHealthRouter from './src/Controllers/driver-health-details/route.js';
import trailerDetailsRouter from './src/Controllers/trailer-details/route.js';
import trackLocationRouter from './src/Controllers/track-location/route.js';
import truckControlRouter from './src/Controllers/truck-control/route.js';
import truckDetailsRouter from './src/Controllers/truck-details/route.js';
import truckInformationRouter from './src/Controllers/truck-information/route.js';
import truckLocationRouter from './src/Controllers/truck-location/route.js';
import userRouter from './src/Controllers/user-details/route.js';
import truckEfficiencyRouter from './src/Controllers/truck-efficiency/route.js'
import EngineHealthRouter from './src/Controllers/maintenance/Engine-health.js';
import brakeSystemRouter from './src/Controllers/maintenance/Brake-system.js';
import fuelSystemRouter from './src/Controllers/maintenance/Fuel-system.js';
import tireHealthRouter from './src/Controllers/maintenance/Tire-health.js';
import batteryStatusRouter from './src/Controllers/maintenance/Battery-status.js';
import trucksMetricRouter from './src/Controllers/truck-alerts--warnings/route.js'
import transmissionRouter from  './src/Controllers/maintenance/Transmission-status.js';

// import transmissionRouter from  './src/api/maintenance/Transmission-status.js';


const app = express();
const PORT = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
  res.send('Welcome to the Truck Management System API');
});

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