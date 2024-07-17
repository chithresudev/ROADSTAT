import express from 'express';
import {
  getAllTrackLocations,
  getTrackLocationByTrailerNo,
  createTrackLocation,
  updateTrackLocationByTrailerNo,
  deleteTrackLocationByTrailerNo
} from '../Controllers/trackLocationController.js';

const trackLocationRouter = express.Router();

trackLocationRouter.get('/track-location', getAllTrackLocations);
trackLocationRouter.get('/track-location/:trailerNo', getTrackLocationByTrailerNo);
trackLocationRouter.post('/track-location', createTrackLocation);
trackLocationRouter.put('/track-location/:trailerNo', updateTrackLocationByTrailerNo);
trackLocationRouter.delete('/track-location/:trailerNo', deleteTrackLocationByTrailerNo);

export default trackLocationRouter;
