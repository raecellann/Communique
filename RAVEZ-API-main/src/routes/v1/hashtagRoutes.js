import { Router } from 'express';

import HashtagController from '../../controllers/v1/hashtagController.js';
import authorization from '../../middlewares/authorization.js';
import authentication from '../../middlewares/authentication.js';

const hashtagRouter = new Router();
const hashtagController = new HashtagController();

// * Ensure that all endpoints implement authorization
hashtagRouter.use(authorization);

// // * Route for creating a hashtag for a specific thread
// hashtagRouter.post('/:thread_id/hashtags', hashtagController.create.bind(hashtagController));

// * Route for fetching all hashtags for a specific thread
// hashtagRouter.get('/:thread_id/hashtags', hashtagController.getByThreadId.bind(hashtagController));

hashtagRouter.get('/hashtag/search', hashtagController.findThreadByHashtag.bind(hashtagController))

hashtagRouter.get('/hashtag/trends', hashtagController.getTrendingTopics.bind(hashtagController));

export default hashtagRouter;