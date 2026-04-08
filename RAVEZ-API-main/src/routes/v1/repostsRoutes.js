import { Router } from "express";
import RepostController from "../../controllers/v1/repostController.js";
import authorization from "../../middlewares/authorization.js";
import authentication from "../../middlewares/authentication.js";

const repostRouter = new Router();
const repost = new RepostController();

repostRouter.use(authorization);

// Endpoint to create a repost
repostRouter.post('/repost/:thread_id', authentication, repost.createRepost.bind(repost));

// Endpoint to fetch reposts of a specific thread
repostRouter.get('/reposts/:thread_id', repost.getRepostsByThreadId.bind(repost));

export default repostRouter;
