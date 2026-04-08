import { connection } from '../core/database.js'; // Adjust the path as necessary
import { Thread, ThreadHelper } from './thread.js';


class Comment {
  constructor() {
    this.threadHelper = new ThreadHelper();
    this.thread = new Thread();
    this.reply = new Reply();
  }

  /** !Fix this pls
   * Create a new comment for the parent thread.
   * @param {number} parent_thread_id - ID of the post the comment is associated with.
   * @param {string} content - The content of the comment.
   * @param {number} account_id - ID of the account making the comment.
   * @returns {Promise<object>} - Result of the insert operation.
   */
  async create(parent_thread_id, content, account_id, hash_tags) {
    console.log(parent_thread_id, content, account_id, hash_tags)
    try {
      const [result] = await connection.execute(
        `INSERT INTO threads (account_id, parent_thread_id, content) VALUES (?, ?, ?)`,
        [account_id, parent_thread_id, content]
      );
      
      const comment_id = result.insertId;

      if (hash_tags && hash_tags.length > 0) {
        for (const tag of hash_tags) {
          let [existingHashTag] = await connection.execute(
            `SELECT hashtag_id FROM hashtags WHERE hashtag_name = ?`,
            [tag]
          );

          let hashtag_id = null;

          if (existingHashTag.length === 0) {
            const [newHashtag] = await connection.execute(
              `INSERT INTO hashtags (hashtag_name) VALUES (?)`,
              [tag]
            );
            
            hashtag_id = newHashtag[0];
          } else {
            hashtag_id = existingHashTag[0].hashtag_id
          }

          await connection.execute(
            `INSERT INTO thread_hashtags (thread_id, hashtag_id) VALUES (?, ?)`,
            [comment_id, hashtag_id]
          );
        }
      }

      const threadAdded = await this.thread.getSpecificThread(comment_id)

      return threadAdded

    } catch (error) {
      console.error(error)
      console.error('Error creating comment:', error.message);
      throw error;
    }
  }


  /**
   * Fetch comments by thread ID.
   * @param {number} postId - ID of the post to get comments for.
   * @returns {Promise<array>} - List of comments.
   */
  async fetchCommentsReplies(thread_id, limit = 10, offset = 0, sortBy = 'created_at') { 
    try {

      const [comments] = await connection.execute(
        `SELECT * FROM threads WHERE parent_thread_id = ?
        ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        [thread_id,  limit, offset]
      );

      const arrangedData = await this.threadHelper.arrangeListOfData(comments);

      if (sortBy !== 'created_at') {
        arrangedData.sort((postA, postB) => postB[sortBy] - postA[sortBy]);
      }

      return arrangedData
    } catch (error) {
      console.error('Error fetching comments by post ID:', error.message);
      throw error;
    }
  }

  // /**
  //  * Fetch replies for a specific comment.
  //  * @param {number} commentId - ID of the parent comment to get replies for.
  //  * @returns {Promise<array>} - List of replies.
  //  */
  // async fetchRepliesByCommentId(commentId) {
  //   const query = `
  //     SELECT * FROM replies
  //     WHERE parent_comment_id = ?
  //     ORDER BY created_at DESC
  //   `;
    
  //   try {
  //     const [replies] = await connection.execute(query, [commentId]);
  //     return replies;
  //   } catch (error) {
  //     console.error('Error fetching replies by comment ID:', error.message);
  //     throw error;
  //   }
  // }
}

class Reply {
    constructor() {
        this.helper = null
    }

    async isReply(thread_id) {
        try {
          const [checkIfReplyingComment] = await connection.execute(
            `SELECT parent_thread_id, thread_id FROM threads WHERE thread_id = ?`,
            [thread_id]
          )

          if (checkIfReplyingComment.length > 0) {
            const { parent_thread_id } = checkIfReplyingComment[0];

            if (parent_thread_id !== null) {
              return await this.replyValidation(parent_thread_id);
            } else {
              return 'comment';
            }
          }
        } catch(err) {
          console.error(err)
          throw err
        }
    }

    async replyValidation(parent_thread_id) {
      const [validation] = await connection.execute(
        `SELECT parent_thread_id FROM threads WHERE thread_id = ?`,
        [parent_thread_id]
      )

      if (validation[0].parent_thread_id !== null) {
        return 'not allowed';
      } else {
        return 'reply'
      }
    }
}

class CommentHelper {
  constructor() {
    
  }
}


export { Comment, Reply };
