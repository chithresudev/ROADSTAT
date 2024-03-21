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
import { Truck } from '../../models/Truck.js'; // Import Truck model

const truckDetailsRouter = express.Router();

// GET route handler
truckDetailsRouter.get('/trucks', async (req, res) => {
    try {
        const trucks = await Truck.find();
        res.json(trucks);
    } catch (error) {
      console.error('Error fetching truck details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

truckDetailsRouter.get('/trucks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const truck = await Truck.findById(id); // Pass the id to findById
    if (!truck) {
      return res.status(404).json({ message: "Truck details not found" });
    }
    res.json(truck);
  } catch (error) {
    console.error('Error fetching truck details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route handler
truckDetailsRouter.post('/trucks', async (req, res) => {
  try {
    const {
        truckNo,
        driverId,
        location,
        incidents,
        status,
        note
      } = req.body;
    const truck = await Truck.create({
        truckNo,
        driverId,
        location,
        incidents,
        status,
        note
    });
    res.json(truck);
  } catch (error) {
    console.error('Error adding truck details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route handler
truckDetailsRouter.put('/trucks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      truckNo,
      driverId,
      location,
      incidents,
      status,
      note
    } = req.body;

    const updatedTruck = await Truck.findByIdAndUpdate(id, {
      truckNo,
      driverId,
      location,
      incidents,
      status,
      note
    }, { new: true });

    if (!updatedTruck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    res.json(updatedTruck);
  } catch (error) {
    console.error('Error updating truck details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler
truckDetailsRouter.delete('/trucks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTruck = await Truck.findByIdAndDelete(id);

    if (!deletedTruck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    res.json({ message: "Truck deleted successfully" });
  } catch (error) {
    console.error('Error deleting truck details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default truckDetailsRouter;