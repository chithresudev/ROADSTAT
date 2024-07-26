import express from 'express';
import {
    getAllBatteryStatuses,
    getBatteryStatusById,
    addBatteryStatus,
    updateBatteryStatus,
    deleteBatteryStatus
} from '../../Controllers/maintenance-controllers/Battery-status.js';

const batteryStatusRouter = express.Router();

batteryStatusRouter.get('/', getAllBatteryStatuses);
batteryStatusRouter.get('/:id', getBatteryStatusById);
batteryStatusRouter.post('/', addBatteryStatus);
batteryStatusRouter.put('/:id', updateBatteryStatus);
batteryStatusRouter.delete('/:id', deleteBatteryStatus);

export default batteryStatusRouter;
