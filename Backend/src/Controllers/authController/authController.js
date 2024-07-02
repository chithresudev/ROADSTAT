import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//const nodemailer = require('nodemailer');
import {User} from '../../Models/User.js'
import dotenv from 'dotenv'
dotenv.config()

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });


const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    if(!(firstName && lastName && email && password)){
      return res.status(409).json({message: "Some fields are empty"})
    }

    // Convert email and username to lowercase
    const lowerCaseEmail = email.toLowerCase();

    // Check if email/username already exists
    const existingUser = await User.findOne({ email: lowerCaseEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random verification code
    //const verificationCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code

    const user = new User({
      firstName,
      lastName,
      email: lowerCaseEmail,
      password: hashedPassword,
      userType: userType
      //verificationCode,
    });

    // Save user to database
    await user.save();
    

    // Send the verification code to the user's email
    /** const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    }; 

    await transporter.sendMail(mailOptions); **/

    res.status(200).json({ message: 'User registered successfully.', success: true, data: user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error: ' + error.message, success: false });
  }
};


/** const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.verificationCode !== user.verificationCode) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.verificationCode = null; // Clear the verification code
    user.isVerified = true; // Mark the user as verified
    await user.save();

    // Send a confirmation email using Nodemailer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Email Verification Successful',
      text: 'Your email has been successfully verified.',
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email verified successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' + error.message, success: false });
  }
}; **/


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email not registered. Please sign up.' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '72h' });

    const userId = user._id;
    res.status(200).json({ message: 'Login successful.',  success: true, token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error: ' + error.message, success: false });
  }
};

export { register, login };
