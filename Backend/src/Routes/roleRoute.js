import express from 'express';
import {
    getAllRoles,
    getRoleById,
    createRole,
    updateRoleById,
    deleteRoleById
} from '../Controllers/roleController.js';

const roleRouter = express.Router();

roleRouter.get('/roles', getAllRoles);
roleRouter.get('/roles/:id', getRoleById);
roleRouter.post('/roles', createRole);
roleRouter.put('/roles/:id', updateRoleById);
roleRouter.delete('/roles/:id', deleteRoleById);

export default roleRouter;
