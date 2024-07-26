import express from 'express';
import { 
    getAllDrivers, 
    getDriverById, 
    addDriver, 
    updateDriverById, 
    deleteDriverById 
} from '../Controllers/driverController.js';

const driverRouter = express.Router();

driverRouter.get('/', getAllDrivers);
driverRouter.get('/:driverId', getDriverById);
driverRouter.post('/', addDriver);
driverRouter.put('/:driverId', updateDriverById);
driverRouter.delete('/:driverId', deleteDriverById);

export default driverRouter;
