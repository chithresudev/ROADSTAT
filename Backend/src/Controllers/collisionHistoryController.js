import { CollisionHistory } from '../Models/CollisionHistory.js';

export const getAllCollisionHistory = async (req, res) => {
    try {
        const collisions = await CollisionHistory.find();
        res.json(collisions);
    } catch (error) {
        console.error('Error fetching collision history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCollisionHistoryById = async (req, res) => {
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
};

export const addCollisionHistory = async (req, res) => {
    try {
        const { _id, truckId, date, driverName, time, location, speedMPH, brakingMS2, collisionType, severity, description } = req.body;
        const newCollision = await CollisionHistory.create({ _id, truckId, date, driverName, time, location, speedMPH, brakingMS2, collisionType, severity, description });
        res.json(newCollision);
    } catch (error) {
        console.error('Error adding collision history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCollisionHistoryById = async (req, res) => {
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
};

export const deleteCollisionHistoryById = async (req, res) => {
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
};
