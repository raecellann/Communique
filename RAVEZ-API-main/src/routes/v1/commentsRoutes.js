// import { Router } from 'express';

// import CommentController from '../controllers/v1/commentController';

// import authorization from '../../middlewares/authorization.js';
// import authentication from '../../middlewares/authentication.js'

// const commentRouter = new Router();
// const comment = new CommentController();

// commentRouter.use(authorization);

// // TODOl Unahin muna to ✌️✨
// commentRouter.post('/comment/:parent_thread_id', authentication ,comment.createComment.bind(comment));

// commentRouter.get('/:thread_id/comments', commentController.getCommentByThreadId.bind(commentController));

// // Route to get replies for a specific comment on a post
// // commentRouter.get('/:postId/comments/:commentId/replies', commentController.getCommentReplies.bind(commentController));

// export default commentRouter;

import { Router } from "express";

import CommentController from "../../controllers/v1/commentController.js";

import authorization from "../../middlewares/authorization.js";
import authentication from '../../middlewares/authentication.js';

const commentRouter = new Router();
const comment = new CommentController();

commentRouter.use(authorization);

// TODOl Unahin muna to ✌️✨
commentRouter.post('/comment/:thread_id', authentication, comment.createComment.bind(comment));

commentRouter.get('/comments-replies/:thread_id', comment.getCommentReplies.bind(comment));

export default commentRouter;