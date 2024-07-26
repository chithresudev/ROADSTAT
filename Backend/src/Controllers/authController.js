import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import {User} from '../Models/User.js'
import dotenv from 'dotenv'
dotenv.config()
const { EMAIL_PASSWORD, EMAIL_USER, JWT_SECRET, SMTP_HOST, SMTP_SECURE, SMTP_PORT } = process.env

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  }
});

transporter.verify(function(error, success) {
  if (error) {
        console.log('Connection error:' + error);
  } else {
        console.log('Server is ready to take our messages');
  }
});


const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, username, userType } = req.body;

    if(!(firstName && lastName && email && username && password && userType)){
      return res.status(409).json({message: "Some fields are empty"})
    }

    // Convert email and username to lowercase
    const lowerCaseEmail = email.toLowerCase();
    const lowerCaseUsername = username.toLowerCase();

    // Check if email/username already exists
    const existingUser = await User.findOne({ $or : [{email: lowerCaseEmail}, {username: username}] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code


    const user = new User({
      firstName,
      lastName,
      email: lowerCaseEmail,
      username: lowerCaseUsername,
      password: hashedPassword,
      userType: userType,
      verificationCode,
    });

    // Save user to database
    await user.save();
    
    // Send the verification code to the user's email
    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: 'Verify your Email Address',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2>Welcome to ROADSTAT!</h2>
            <p>Hi ${user.firstName} ${user.lastName},</p>
            <p>Thank you for registering with us. To complete your registration process, please verify your email address using the 6-digit code below:</p>
            <h3>${verificationCode}</h3>
            <p>Please enter this code on the verification page to activate your account. If you didn't request this email, please ignore it.</p>
            <p>If you have any questions or need assistance, feel free to contact our support team.</p><br/>
            <p>Best regards,<br/>The Roadstat Team.</p><br/>
            <p style="font-size: 12px; color: #777;">&copy; 2024. ROADSTAT. All rights reserved.</p>
          </body>
        </html>
      `,
    }; 

    await transporter.sendMail(mailOptions);

    user.password = undefined;
    res.status(200).json({ message: 'User registered successfully. Please check and verify your email.', success: true, data: user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error: ' + error.message, success: false });
  }
};


const verifyEmail = async (req, res) => {
  try {
    if(!(req.body.email && req.body.verificationCode)){ 
      return res.status(409).json({message: "Some fields are empty"})
    }
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
      from: EMAIL_USER,
      to: user.email,
      subject: 'Email Verification Successful',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2>Email Verification Successful</h2>
            <p>Hi ${user.firstName},</p>
            <p>We are pleased to inform you that your email address has been successfully verified. You can now enjoy full access to all the features and benefits of Roadstat.</p>
            <p>If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
            <p>Thank you for choosing Roadstat. We are excited to have you on board!</p><br/>
            <p>Best regards,<br/>The Roadstat Team</p><br/>
            <p style="font-size: 12px; color: #777;">&copy; 2024. ROADSTAT. All rights reserved.</p>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email verified successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' + error.message, success: false });
  }
};

const login = async (req, res) => {
  try {
    if(!(req.body.email || req.body.username) || !req.body.password){ 
      return res.status(409).json({message: "Some fields are empty"})
    }
    const { email, username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ $or : [{email: email}, {username: username}] });
    if (!user) {
      return res.status(401).json({ message: 'Email not registered. Please sign up.' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '72h' });

    const userId = user._id;
    res.status(200).json({ message: 'Login successful.',  success: true, token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error: ' + error.message, success: false });
  }
};

export { register, login, verifyEmail };
