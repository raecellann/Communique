// postsRoutes.js
import express from 'express';
// import PostsController from '../../controllers/v1/threadController.js';
import threadController from '../../controllers/v1/threadController.js';
import authorization from '../../middlewares/authorization.js';
import authentication from '../../middlewares/authentication.js';

const threadRouter = express.Router();

threadRouter.use(authorization);

// * Allow for creation of post for a logged in user
threadRouter.post('/:account_id', authentication, threadController.createPost.bind(threadController));

// *  Allow for reporting a post on a specified reasons
threadRouter.post('/report/:thread_id', authentication, threadController.reportThread.bind(threadController));

// TODO: On the way of inspection:  * Search route 🔍
threadRouter.get('/search', threadController.searchThreads.bind(threadController));

// * Allow for viewing the parent or main thread with the given comments also
threadRouter.get('/:thread_id', authentication, threadController.getSpecificPost.bind(threadController));

// * Route to get All posts with optional query parameters: limits, offset, sortBy
threadRouter.get('/', threadController.getAllPosts.bind(threadController));


// * get all threads for a specific user
threadRouter.get('/profile/:account_id',authentication, threadController.getUserThreads.bind(threadController));

// * Delete youre hated thread >:} pero syempre thread molang bruh 🤨
threadRouter.delete('/remove/:thread_id', authentication, threadController.deleteSpecificThread.bind(threadController))

// Route to get comments for a specific post
// threadRouter.get('/:postId/comments', threadController.getPostComments.bind(threadController));

// Route to get replies for a specific comment on a post
// threadRouter.get('/:postId/comments/:commentId/replies', threadController.getCommentReplies.bind(threadController));

export default threadRouter;
