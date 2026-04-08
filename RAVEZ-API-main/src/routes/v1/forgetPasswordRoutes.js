// ForgetPasswordRoutes.js
import { Router } from 'express';
// import ForgetPasswordController from './ForgetPasswordController.js';
import ForgetPasswordController from '../../controllers/v1/forgetPasswordController.js';

const forgetPasswordRouter = new Router();
const forgetPassword = new ForgetPasswordController();


// Route to request password reset
forgetPasswordRouter.post('/send-email/:email', forgetPassword.sendResetEmail);
forgetPasswordRouter.post('/change-password', forgetPassword.changePassword);

export default forgetPasswordRouter;
