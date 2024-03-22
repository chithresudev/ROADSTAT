import express from 'express';
import { CollisionHistory } from '../../models/CollisionHistory.js';

const collisionHistoryRouter = express.Router();

// GET route handler for fetching all collision history
collisionHistoryRouter.get('/collision-history', async (req, res) => {
    try {
        const collisions = await CollisionHistory.find();
        res.json(collisions);
    } catch (error) {
        console.error('Error fetching collision history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route handler for fetching collision history by ID
collisionHistoryRouter.get('/collision-history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collision = await CollisionHistory.findById(id);
        if (!collision) {
            return res.status(404).json({ message: "Collision history not found" });
        }
        res.json(collision);
    } catch (error) {
        console.error('Error fetching collision history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler for adding new collision history
collisionHistoryRouter.post('/collision-history', async (req, res) => {
    try {
        const { _id, truckId, date, driverName, time, location, speedMPH, brakingMS2, collisionType, severity, description } = req.body;
        const newCollision = await CollisionHistory.create({ _id, truckId, date, driverName, time, location, speedMPH, brakingMS2, collisionType, severity, description });
        res.json(newCollision);
    } catch (error) {
        console.error('Error adding collision history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler for updating collision history by ID
collisionHistoryRouter.put('/collision-history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { truckId, date, driverName, time, location, speedMPH, brakingMS2, collisionType, severity, description } = req.body;
        const updatedCollision = await CollisionHistory.findByIdAndUpdate(id, {
            truckId, date, driverName, time, location, speedMPH, brakingMS2, collisionType, severity, description
        }, { new: true });
        if (!updatedCollision) {
            return res.status(404).json({ message: "Collision history not found" });
        }
        res.json(updatedCollision);
    } catch (error) {
        console.error('Error updating collision history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler for deleting collision history by ID
collisionHistoryRouter.delete('/collision-history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCollision = await CollisionHistory.findByIdAndDelete(id);
        if (!deletedCollision) {
            return res.status(404).json({ message: "Collision history not found" });
        }
        res.json({ message: "Collision history deleted successfully" });
    } catch (error) {
        console.error('Error deleting collision history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default collisionHistoryRouter;
