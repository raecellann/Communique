import { Thread } from '../../models/thread.js';
import { Comment, Reply } from '../../models/Comment.js'; // Adjust the path as necessary

class CommentController {
  constructor() {
    this.comment = new Comment();
    this.thread = new Thread();
    this.reply = new Reply();
  }

  /**
   * Create a new comment for a post.
   */
  async createComment(req, res) {
    try {
      const { thread_id } = req.params;
      const { account_id } = res.locals;
      const { content } = req.body;

      // Validate the required fields
      if (!thread_id) {
        return res.json({
          success: false,
          message: 'Your missing thread_id on your link, pls check it 🚩',
          data: null
        })
      }

      if (!content) {
        return res.json({
          success: false,
          message: 'Your missing a content on your body or payload 🚩',
          data: null
        })
      }

      if (!account_id) {
        return res.json({
          success: false,
          message: '[Login First] You need to login first in order to post this comment 🚩',
          data: null
        })
      }
      const threadExist = await this.thread.getSpecificThread(thread_id);

      if (!threadExist) {
        return res.json({
          success: false,
          message: 'The Thread you want to comment didnt exist 🚩',
          data: null
        })
      }

      const validation = await this.reply.isReply(thread_id);

      if (validation === 'not allowed') {
        return res.json({
          success: false,
          message: 'End of recursion, We are currently sorry for that as this temporary for now 🚩 🌷🐝 - -',
          data: null
        })
      }

      const hash_tags = content.match(/#[-\w]+/g) || [];

      // * Use the Comment model's create method to add the comment to the database
      const result = await this.comment.create(thread_id, content, account_id, hash_tags);
      
      return res.json({
        success: true,
        message: `Successfully post a ${validation} at a thread 🎉✨`,
        data: result
      })

    } catch (error) {
      console.error('Error creating comment:', error.message);
      return res.json({
        success: false,
        message: 'Jeez, Something is wrong on creating a comment, mind check it out? ✌️🚩',
        data: null
      });
    }
  }

  /**
   * Get comments for a specific post.
   */
  async getCommentReplies(req, res) {
    try {
      const { thread_id } = req.params;

      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const sortBy = req.query.sortBy || 'created_at';
      const validQuery = ['created_at','comments', 'likes']

      if (!validQuery.includes(sortBy)) {
        return res.json({
          success: false,
          message: `Invalid query choose on the following query: ${validQuery} 🚩`,
          data: null
        })
      }
  
      const threadExist = await this.thread.getSpecificThread(thread_id);

      if (!threadExist) {
        return res.json({
          success: false,
          message: 'The Thread ID you give cant find its existence 🚩',
          data: null
        })
      }
      
      let validation = await this.reply.isReply(thread_id);


      if (validation === 'not allowed') {
        validation = 'nested replies for now, stay tuned ✌️'
      }

      const comments = await this.comment.fetchCommentsReplies(thread_id, limit, offset, sortBy);

      res.json({
          success: true,
          message: comments.length ? `Found ${comments.length} ${validation} on the selected thread Post ✨🎉 `: `No ${validation} available 🌷🐝 - - -`,
          data: comments
      });
    } catch (error) {
      console.error(error)
      console.error('Error fetching comments:', error.message);
      res.status(500).json({ success: false, message: 'Failed to fetch comments or replies 🚩' });
    }
  }

  /**
   * Get replies for a specific comment.
   */
  async getRepliesByCommentId(req, res) {
    try {
      const { commentId } = req.params;
      const replies = await this.comment.fetchRepliesByCommentId(commentId);

      if (!replies.length) {
        return res.status(200).json({ success: true, message: 'No replies available', data: [] });
      }

      res.json({ success: true, data: replies });
    } catch (error) {
      console.error('Error fetching replies:', error.message);
      res.status(500).json({ success: false, message: 'Failed to fetch replies' });
    }
  }
}

// Export an instance of the CommentsController
export default CommentController;
