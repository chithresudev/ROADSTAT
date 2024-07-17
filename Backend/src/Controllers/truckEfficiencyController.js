import { TruckEfficiency } from '../Models/TruckEfficiency.js';

export const getAllTruckEfficiency = async (req, res) => {
    try {
        const trucks = await TruckEfficiency.find();
        res.json(trucks);
    } catch (error) {
        console.error('Error fetching truck details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTruckEfficiencyById = async (req, res) => {
    try {
        const { id } = req.params;
        const truck = await TruckEfficiency.findById(id);
        if (!truck) {
            return res.status(404).json({ message: "Truck details not found" });
        }
        res.json(truck);
    } catch (error) {
        console.error('Error fetching truck details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createTruckEfficiency = async (req, res) => {
    try {
        const {
            _id,
            truckId,
            serviceHistory,
            level,
            status
        } = req.body;
        const truck = await TruckEfficiency.create({
            _id,
            truckId,
            serviceHistory,
            level,
            status
        });
        res.json(truck);
    } catch (error) {
        console.error('Error adding truck details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTruckEfficiencyById = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            truckId,
            serviceHistory,
            level,
            status
        } = req.body;

        const updatedTruck = await TruckEfficiency.findByIdAndUpdate(id, {
            truckId,
            serviceHistory,
            level,
            status
        }, { new: true });

        if (!updatedTruck) {
            return res.status(404).json({ message: "Truck not found" });
        }

        res.json(updatedTruck);
    } catch (error) {
        console.error('Error updating truck details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTruckEfficiencyById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTruck = await TruckEfficiency.findByIdAndDelete(id);

        if (!deletedTruck) {
            return res.status(404).json({ message: "Truck not found" });
        }

        res.json({ message: "Truck deleted successfully" });
    } catch (error) {
        console.error('Error deleting truck details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};