import nodemailer from 'nodemailer';
import ForgetPasswordModel from '../../models/ForgetPassword.js'; // Ensure correct import path
import { token } from 'morgan';

class ForgetPasswordController {
    constructor() {
        this.OTP = null;

        // Create an instance of ForgetPasswordModel (ensure the case is correct)
        this.forgetPass = new ForgetPasswordModel(); 
        
        // Create transporter for sending email using nodemailer
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email provider here
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        this.sendResetEmail = this.sendResetEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    async sendResetEmail(req, res) {
        const email = req.params.email;
        console.log(email);
    
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
    
        try {
            // Step 1: Check if the user exists
            const user = await this.forgetPass.findUserByEmail(email);
            if (!user || user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Generate OTP and its expiration time
            const min = 10000;
            const max = 99999;
            const OTP = Math.floor(Math.random() * (max - min + 1)) + min; // Generates a 5-digit OTP
            const expirationTime = Date.now() + 30000; // Current time + 30 seconds
    
            // Store the OTP and expiration time
            this.otpStore = { email, OTP, expirationTime }; // Store it in a temporary in-memory object
            console.log('Generated OTP:', this.otpStore);
    
            // Email content
            const resetUrl = `http://localhost:3000/v1/forget-password/change-password`;
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset',
                text: `Hello, this is your token => ${OTP},\n\nPlease reset your password by visiting the following link:\n\n${resetUrl}\n\nIf you didn't request this, please ignore this email. This token is valid for 30 seconds.`,
            };
    
            // Send the email
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ message: 'Failed to send email', error });
                }
                res.status(200).json({ 
                    message: 'Reset Password email sent successfully',
                    data: { 'email': email, 'otp': OTP, 'exp_date': expirationTime }
                 });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }


    // Function to validate OTP
    async validateOTP(req, res) {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        try {
            // Check if the OTP is stored and matches the provided email and OTP
            if (
                this.otpStore &&
                this.otpStore.email === email &&
                this.otpStore.OTP == otp
            ) {
                // Check if the OTP is still valid
                if (Date.now() <= this.otpStore.expirationTime) {
                    return res.status(200).json({ message: 'OTP is valid' });
                } else {
                    return res.status(400).json({ message: 'OTP has expired' });
                }
            } else {
                return res.status(400).json({ message: 'Invalid OTP or email' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async changePassword(req, res) {
        // const email = req.body;
        // const new_password = req.body;

        const { changePassword } = req.body || {};

        // console.log(changePassword);

        const { email, new_password } = changePassword[0];

        // console.log(email, new_password, "hello adasdasd");

        await this.forgetPass.changePassword(new_password, email);

        return res.json({
            success: "true",
            message: "Successfuly Changing Password"
        })


    }
}

export default ForgetPasswordController;
