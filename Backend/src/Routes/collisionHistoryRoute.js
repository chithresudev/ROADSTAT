import express from 'express';
import { 
    getAllCollisionHistory, 
    getCollisionHistoryById, 
    addCollisionHistory, 
    updateCollisionHistoryById, 
    deleteCollisionHistoryById 
} from '../Controllers/collisionHistoryController.js';

const collisionHistoryRouter = express.Router();

collisionHistoryRouter.get('/', getAllCollisionHistory);
collisionHistoryRouter.get('/:id', getCollisionHistoryById);
collisionHistoryRouter.post('/', addCollisionHistory);
collisionHistoryRouter.put('/:id', updateCollisionHistoryById);
collisionHistoryRouter.delete('/:id', deleteCollisionHistoryById);

export default collisionHistoryRouter;
