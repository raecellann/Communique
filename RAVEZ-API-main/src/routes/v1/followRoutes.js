import { Router } from 'express';

import FollowController from '../../controllers/v1/followController.js';

import authorization from "../../middlewares/authorization.js";
import authentication from '../../middlewares/authentication.js';

const followRouter = new Router();
const follow = new FollowController();

followRouter.use(authorization)

followRouter.get('/follow/follower/:account_id', follow.getFollowerAccount.bind(follow))

followRouter.get('/follow/following/:account_id', follow.getFollowingAccount.bind(follow))

// * Follow and Unfollow by Posting if a record doesnt have on database
followRouter.post('/follow/:account_id', authentication, follow.followAccount.bind(follow));

export default followRouter;