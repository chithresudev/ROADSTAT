import express from 'express';
import {
    getAllAlerts,
    getAllWarnings,
    trackTruckMetrics,
    deleteWarningById,
    deleteAlertById,
    deleteAllAlerts,
    deleteAllWarnings
} from '../Controllers/truckMetricsController.js';

const truckMetricsRouter = express.Router();

truckMetricsRouter.get('/alerts', getAllAlerts);
truckMetricsRouter.get('/warnings', getAllWarnings);
truckMetricsRouter.post('/metrics/:truckId', trackTruckMetrics);
truckMetricsRouter.delete('/warnings/:id', deleteWarningById);
truckMetricsRouter.delete('/alerts/:id', deleteAlertById);
truckMetricsRouter.delete('/alerts', deleteAllAlerts);
truckMetricsRouter.delete('/warnings', deleteAllWarnings);

export default truckMetricsRouter;
