import express from 'express';
import { 
    getAllCollisionHistory, 
    getCollisionHistoryById, 
    addCollisionHistory, 
    updateCollisionHistoryById, 
    deleteCollisionHistoryById 
} from '../Controllers/collisionHistoryController.js';

const collisionHistoryRouter = express.Router();

collisionHistoryRouter.get('/collision-history', getAllCollisionHistory);
collisionHistoryRouter.get('/collision-history/:id', getCollisionHistoryById);
collisionHistoryRouter.post('/collision-history', addCollisionHistory);
collisionHistoryRouter.put('/collision-history/:id', updateCollisionHistoryById);
collisionHistoryRouter.delete('/collision-history/:id', deleteCollisionHistoryById);

export default collisionHistoryRouter;
