import { Trailer } from '../Models/Trailer.js';

export const getAllTrailers = async (req, res) => {
    try {
        const trailers = await Trailer.find();
        res.json(trailers);
    } catch (error) {
        console.error('Error fetching trailer details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTrailerById = async (req, res) => {
    try {
        const { id } = req.params;
        const trailer = await Trailer.findById(id);
        if (!trailer) {
            return res.status(404).json({ message: "Trailer details not found" });
        }
        res.json(trailer);
    } catch (error) {
        console.error('Error fetching trailer details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createTrailer = async (req, res) => {
    try {
        const {
            _id,
            length,
            width,
            height,
            weight,
            capacity,
            condition,
            manufacturer,
            model,
            manufacturedYear
        } = req.body;
        const trailer = await Trailer.create({
            _id,
            length,
            width,
            height,
            weight,
            capacity,
            condition,
            manufacturer,
            model,
            manufacturedYear
        });
        res.json(trailer);
    } catch (error) {
        console.error('Error adding trailer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTrailerById = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            length,
            width,
            height,
            weight,
            capacity,
            condition,
            manufacturer,
            model,
            manufacturedYear
        } = req.body;

        const updatedTrailer = await Trailer.findByIdAndUpdate(id, {
            length,
            width,
            height,
            weight,
            capacity,
            condition,
            manufacturer,
            model,
            manufacturedYear
        }, { new: true });

        if (!updatedTrailer) {
            return res.status(404).json({ message: "Trailer not found" });
        }

        res.json(updatedTrailer);
    } catch (error) {
        console.error('Error updating trailer details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTrailerById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTrailer = await Trailer.findByIdAndDelete(id);

        if (!deletedTrailer) {
            return res.status(404).json({ message: "Trailer not found" });
        }

        res.json({ message: "Trailer deleted successfully" });
    } catch (error) {
        console.error('Error deleting trailer details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};