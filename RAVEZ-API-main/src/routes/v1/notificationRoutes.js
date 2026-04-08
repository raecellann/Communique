import { Router } from 'express';

import NotificationController from '../../controllers/v1/notificationController.js';

import authorization from '../../middlewares/authorization.js';
import authentication from '../../middlewares/authentication.js';

const notificationRouter = new Router();
const notificationController = new NotificationController();

// * Ensure that all endpoints implement authorization
notificationRouter.use(authorization);

notificationRouter.get('/notify', authentication, notificationController.getNotifications.bind(notificationController));

export default notificationRouter;