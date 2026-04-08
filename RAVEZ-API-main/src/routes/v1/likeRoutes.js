import express from 'express';

import LikeController from '../../controllers/v1/likeController.js';

import authorization from '../../middlewares/authorization.js';
import authentication from '../../middlewares/authentication.js';

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.use(authorization)

// * An All in One like where at the same time you can Create, Update a specific like on a thread post without hassle 🧙‍♂️🪄
likeRouter.put('/like/:thread_id', authentication, likeController.automatedLike.bind(likeController))

// likeRouter.post('/like/:thread_id', authentication, likeController.addLike.bind(likeController));

// likeRouter.put('/like-status/:thread_id', authentication, likeController.removeLike.bind(likeController));

likeRouter.get('/likers/:thread_id', likeController.getLikerist.bind(likeController));

export default likeRouter;
