import { Role } from '../models/Role.js';

export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        console.error('Error fetching role details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getRoleById = async (req, res) => {
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
};

export const createRole = async (req, res) => {
    try {
        const { _id, roleName } = req.body;
        const role = await Role.create({ _id, roleName });
        res.json(role);
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const { roleName } = req.body;
        const updatedRole = await Role.findByIdAndUpdate(id, { roleName }, { new: true });
        if (!updatedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.json(updatedRole);
    } catch (error) {
        console.error('Error updating role details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteRoleById = async (req, res) => {
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
};