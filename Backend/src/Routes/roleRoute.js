import express from 'express';
import {
    getAllRoles,
    getRoleById,
    createRole,
    updateRoleById,
    deleteRoleById
} from '../Controllers/roleController.js';

const roleRouter = express.Router();

roleRouter.get('/', getAllRoles);
roleRouter.get('/:id', getRoleById);
roleRouter.post('/', createRole);
roleRouter.put('/:id', updateRoleById);
roleRouter.delete('/:id', deleteRoleById);

export default roleRouter;
