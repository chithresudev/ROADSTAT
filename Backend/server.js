// server.js
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import db from './src/Db/database.js';
import cors from 'cors'; // Import CORS middleware
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
dotenv.config({path: __dirname + '/.env'}); // Load environment variables from .env file
db.connect(); // Connect to the database

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

import userRouter from './src/Routes/userRoute.js';
import authRouter from './src/Routes/authRoute.js'
import collisionHistoryRouter from './src/Routes/collisionHistoryRoute.js';
import destinationRouter from './src/Routes/destinationRoute.js';
import driverRouter from './src/Controllers/driver-details/route.js';
import driverHealthRouter from './src/Controllers/driverHealth.js';
import trailerDetailsRouter from './src/Controllers/trailer-details/route.js';
import trackLocationRouter from './src/Controllers/track-location/route.js';
import truckControlRouter from './src/Controllers/truck-control/route.js';
import truckDetailsRouter from './src/Controllers/truck-details/route.js';
import truckInformationRouter from './src/Controllers/truck-information/route.js';
import truckLocationRouter from './src/Controllers/truck-location/route.js';
import truckEfficiencyRouter from './src/Controllers/truck-efficiency/route.js'
import EngineHealthRouter from './src/Controllers/maintenance/Engine-health.js';
import brakeSystemRouter from './src/Controllers/maintenance/Brake-system.js';
import fuelSystemRouter from './src/Controllers/maintenance/Fuel-system.js';
import tireHealthRouter from './src/Controllers/maintenance/Tire-health.js';
import batteryStatusRouter from './src/Controllers/maintenance/Battery-status.js';
import trucksMetricRouter from './src/Controllers/truck-alerts--warnings/route.js'
import transmissionRouter from  './src/Controllers/maintenance/Transmission-status.js';

// import transmissionRouter from  './src/api/maintenance/Transmission-status.js';


app.get('/api', (req, res) => {
  res.send('Welcome to the Truck Management System API');
});

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter);
app.use('/api/collision-history', collisionHistoryRouter);
app.use('/api/destination', destinationRouter); 

/**
 * 
app.use('/api', driverRouter);
app.use('/api', driverHealthRouter);  
app.use('/api', trailerDetailsRouter);
app.use('/api', trackLocationRouter);
app.use('/api', truckControlRouter);
app.use('/api', truckDetailsRouter);
app.use('/api', truckInformationRouter);
app.use('/api', truckLocationRouter);
app.use('/api', truckEfficiencyRouter);
app.use('/api', EngineHealthRouter);
app.use('/api', brakeSystemRouter);
app.use('/api', fuelSystemRouter);
app.use('/api', tireHealthRouter);
app.use('/api', batteryStatusRouter);
app.use('/api', trucksMetricRouter);
app.use('/api', transmissionRouter);**/


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});