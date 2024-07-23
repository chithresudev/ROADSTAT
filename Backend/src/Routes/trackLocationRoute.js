import express from 'express';
import {
  getAllTrackLocations,
  getTrackLocationByTrailerNo,
  createTrackLocation,
  updateTrackLocationByTrailerNo,
  deleteTrackLocationByTrailerNo
} from '../Controllers/trackLocationController.js';

const trackLocationRouter = express.Router();

trackLocationRouter.get('/', getAllTrackLocations);
trackLocationRouter.get('/:trailerNo', getTrackLocationByTrailerNo);
trackLocationRouter.post('/', createTrackLocation);
trackLocationRouter.put('/:trailerNo', updateTrackLocationByTrailerNo);
trackLocationRouter.delete('/:trailerNo', deleteTrackLocationByTrailerNo);

export default trackLocationRouter;
