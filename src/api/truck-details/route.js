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
import {Truck} from '../../models/Truck.js'; // Import Truck model

const truckDetailsRouter = express.Router();

// GET route handler
truckDetailsRouter.get('/truck-details', async (req, res) => {
    try {
        const truck = await Truck.find();
        res.json(truck);
    } catch (error) {
      console.error('Error fetching truck location:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler
truckDetailsRouter.post('/truck-details', async (req, res) => {
  try {
    // const categoryDoc = await Category.create({ name });
    // return NextResponse.json(categoryDoc);
    console.log(req)
    const { 
        length,
        width,
        height,
        weight,
        capacity,
        engineType,
        horsePower,
        transmission,
        condition,
        manufacturer,
        model,
        manufacturedYear
      } = req.body;
    const truck = await Truck.create({length,
        width,
        height,
        weight,
        capacity,
        engineType,
        horsePower,
        transmission,
        condition,
        manufacturer,
        model,
        manufacturedYear});
    // await truckLocation.save();
    res.json(truck);
  } catch (error) {
    console.error('Error adding truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route handler
truckDetailsRouter.put('/:id', async (req, res) => {
  try {
    // Handle PUT request here
  } catch (error) {
    console.error('Error updating truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler
truckDetailsRouter.delete('/:id', async (req, res) => {
  try {
    // Handle DELETE request here
  } catch (error) {
    console.error('Error deleting truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default truckDetailsRouter;

