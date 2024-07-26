import express from 'express';
import { 
    getAllDriverHealthDetails, 
    getDriverHealthDetailsById, 
    addDriverHealthDetails, 
    updateDriverHealthDetailsById, 
    deleteDriverHealthDetailsById 
} from '../Controllers/driverHealthController.js';

const driverHealthRouter = express.Router();

driverHealthRouter.get('/', getAllDriverHealthDetails);
driverHealthRouter.get('/:driverId', getDriverHealthDetailsById);
driverHealthRouter.post('/', addDriverHealthDetails);
driverHealthRouter.put('/:driverNo', updateDriverHealthDetailsById);
driverHealthRouter.delete('/:driverId', deleteDriverHealthDetailsById);

export default driverHealthRouter;
