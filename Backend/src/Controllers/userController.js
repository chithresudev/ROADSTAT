import { User } from '../Models/User.js';

// GET route handler for fetching all user details
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET route handler for fetching user details by ID
export const getUserByID = async (req, res) => {
    try {
        const { id } = req.params;
        if (id !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden. You are not authorized to update this profile.' });
        }

        const user = await User.findById(id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// PUT route handler for updating user details by ID
export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      if (id !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden. You are not authorized to update this profile.' });
      }
  
      // Find user by ID and update with data from req.body
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: req.body }, // Use $set to update only specified fields from req.body
        { new: true } // To return the updated document
      ).select('-password'); // To exclude the password field from the returned document
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'Profile updated successfully', success: true, user: updatedUser });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error: ' + error.message, success: false });
    }
};

// DELETE route handler for deleting user by ID
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden. You are not authorized to update this profile.' });
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
