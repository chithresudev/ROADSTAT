// // src/api/user.js
// import { Router } from 'express';

// const router = Router();

// router.get('/users', (req, res) => {
//   // Handle GET request for users
// });

// router.post('/users', (req, res) => {
//   // Handle POST request to create a new user
// });

// // Other route handlers for users...

// export default router;

// truckLocationAPI.js

import express from 'express';
import {TruckLocation} from '../../models/TruckLocation.js'; // Import TruckLocation model

const truckLocationRouter = express.Router();

// GET route handler
truckLocationRouter.get('/truck-locations', async (req, res) => {
    try {
        const truckLocations = await TruckLocation.find();
        res.json(truckLocations);
    } catch (error) {
      console.error('Error fetching truck location:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler
truckLocationRouter.post('/truck-locations', async (req, res) => {
  try {
    // const categoryDoc = await Category.create({ name });
    // return NextResponse.json(categoryDoc);
    const {latitude, longitude } = req.body;
    const truckLocation = await TruckLocation.create({latitude, longitude });
    // await truckLocation.save();
    res.json(truckLocation);
  } catch (error) {
    console.error('Error adding truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route handler
truckLocationRouter.put('/:id', async (req, res) => {
  try {
    // Handle PUT request here
  } catch (error) {
    console.error('Error updating truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler
truckLocationRouter.delete('/:id', async (req, res) => {
  try {
    // Handle DELETE request here
  } catch (error) {
    console.error('Error deleting truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default truckLocationRouter;

