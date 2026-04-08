// index.js in routes/v1
import { Router } from 'express';
import homeRouter from './homeRoutes.js';
import accountRouter from './accountRoutes.js';
import forgetPasswordRouter from './forgetPasswordRoutes.js';
import threadRouter from './threadRoutes.js';
import commentRouter from './commentsRoutes.js';
import likeRouter from './likeRoutes.js';
import hashtagRouter from './hashtagRoutes.js';
import repostRouter from './repostsRoutes.js';
import followRouter from './followRoutes.js';
import notificationRouter from './notificationRoutes.js';

const v1 = new Router();

v1.use('/account', accountRouter);
v1.use('/forget-password', forgetPasswordRouter);
v1.use('/thread', threadRouter); // Correctly register postsRouter here
v1.use('/thread', commentRouter); // Correctly register postsRouter here
v1.use('/thread', likeRouter); // Correctly register postsRouter here
v1.use('/thread', repostRouter); // Correctly register postsRouter here
v1.use('/thread', hashtagRouter);
v1.use('/account', followRouter)
v1.use('/notification', notificationRouter)
v1.use('/', homeRouter); // Ensure this is at the end

export default v1;
