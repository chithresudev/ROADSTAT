import { TrailerLocation } from '../Models/TrailerLocation.js'; // Import TrailerLocation model

/**
 * GET route handler to fetch all trailer locations
 */
export const getAllTrailerLocations = async (req, res) => {
    try {
        const allTrailerLocations = await TrailerLocation.find();
        res.json(allTrailerLocations);
    } catch (error) {
        console.error('Error fetching trailer locations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET route handler to fetch a trailer location by trailerId
 */
export const getTrailerLocationById = async (req, res) => {
    try {
        const { trailerId } = req.params;
        // Find the trailer location by trailerId instead of _id
        const trailerLocation = await TrailerLocation.findOne({ trailerId });
        res.json(trailerLocation);
    } catch (error) {
        console.error('Error fetching trailer location:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * POST route handler to add a new trailer location
 */
export const addTrailerLocation = async (req, res) => {
    try {
        const { _id, truckId, trailerId, latitude, longitude, status, gps } = req.body;
        const trailerLocation = await TrailerLocation.create({ _id, truckId, trailerId, latitude, longitude, status, gps });
        res.json(trailerLocation);
    } catch (error) {
        console.error('Error adding trailer location:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PUT route handler to update a trailer location by trailerId
 */
export const updateTrailerLocation = async (req, res) => {
    try {
        const { trailerId } = req.params;
        const { truckId, latitude, longitude, status, gps } = req.body;

        // Find and update the trailer location by trailerId
        const updatedTrailerLocation = await TrailerLocation.findOneAndUpdate(
            { trailerId },
            { truckId, latitude, longitude, status, gps },
            { new: true }
        );

        if (!updatedTrailerLocation) {
            return res.status(404).json({ message: 'Trailer location not found' });
        }

        // Send the updated trailer location in the response
        res.json(updatedTrailerLocation);
    } catch (error) {
        console.error('Error updating trailer location:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * DELETE route handler to delete a trailer location by trailerId
 */
export const deleteTrailerLocation = async (req, res) => {
    try {
        const { trailerId } = req.params;

        // Find and delete the trailer location by trailerId
        const deletedTrailerLocation = await TrailerLocation.findOneAndDelete({ trailerId });

        if (!deletedTrailerLocation) {
            return res.status(404).json({ message: 'Trailer location not found' });
        }

        // Send a success message in the response
        res.json({ message: 'Trailer location deleted successfully' });
    } catch (error) {
        console.error('Error deleting trailer location:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
