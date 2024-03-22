import express from 'express';
import { Role } from '../../models/Role.js';

const roleRouter = express.Router();

// GET route handler for fetching all role details
roleRouter.get('/roles', async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        console.error('Error fetching role details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route handler for fetching role details by ID
roleRouter.get('/roles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.json(role);
    } catch (error) {
        console.error('Error fetching role details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler for creating a new role
roleRouter.post('/roles', async (req, res) => {
    try {
        const { _id, roleName } = req.body;
        const role = await Role.create({ _id, roleName });
        res.json(role);
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler for updating role details by ID
roleRouter.put('/roles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { roleName } = req.body;
        const updatedRole = await Role.findByIdAndUpdate(id, {
            roleName
        }, { new: true });
        if (!updatedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.json(updatedRole);
    } catch (error) {
        console.error('Error updating role details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler for deleting role by ID
roleRouter.delete('/roles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRole = await Role.findByIdAndDelete(id);
        if (!deletedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.json({ message: "Role deleted successfully" });
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default roleRouter;
