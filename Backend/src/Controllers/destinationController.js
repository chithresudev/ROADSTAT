import { Destination } from '../Models/Destination.js';

export const getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        console.error('Error fetching destination details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getDestinationByTruckId = async (req, res) => {
    try {
        const { truckId } = req.params;
        const destination = await Destination.findOne({ truckId: truckId });
        if (!destination) {
            return res.status(404).json({ message: "Destination details not found for the specified truckId" });
        }
        res.json(destination);
    } catch (error) {
        console.error('Error fetching destination details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addDestination = async (req, res) => {
    try {
        const { _id, destinationId, destinationName, truckId, driverId, latitude, longitude, source, status } = req.body;
        const destination = await Destination.create({ _id, destinationId, destinationName, truckId, driverId, latitude, longitude, source, status });
        res.json(destination);
    } catch (error) {
        console.error('Error adding destination details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateDestinationById = async (req, res) => {
    try {
        const { id } = req.params;
        const { destinationId, destinationName, truckId, driverId, latitude, longitude, source, status } = req.body;
        const updatedDestination = await Destination.findByIdAndUpdate(id, {
            destinationId, destinationName, truckId, driverId, latitude, longitude, source, status
        }, { new: true });
        if (!updatedDestination) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.json(updatedDestination);
    } catch (error) {
        console.error('Error updating destination details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteDestinationById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDestination = await Destination.findByIdAndDelete(id);
        if (!deletedDestination) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.json({ message: "Destination deleted successfully" });
    } catch (error) {
        console.error('Error deleting destination details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};