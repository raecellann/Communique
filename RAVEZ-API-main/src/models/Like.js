import { connection } from '../core/database.js';
import { Thread } from './thread.js';

class Like {
  constructor() {
    this.thread_db = connection;
    this.helper = new LikeHelper();
    this.thread = new Thread();
  }

  /**
   * Add a like to a post
   * @param {number} post_id - The ID of the post being liked
   * @param {number} account_id - The ID of the user who likes the post
   * @returns {Promise<object>} - The result of the insert query
   */
  async addLike(thread_id, account_id) { 
    try {
      // * Tutel 🐢👍
      const like = await connection.execute(
        `INSERT INTO likes (account_id, thread_id, liked) VALUES (?, ?, 1)`,
        [account_id, thread_id]
      );
      
      return 'Liked';
    } catch (err) {
      console.error('Error adding like:', err.message);
      throw err;
    }
  }

  async updateLikeStatus(thread_id, account_id) {
    const existedLike = await this.helper.likeInRecord(thread_id, account_id);

    try {
      const newLikeStatus = existedLike[0].liked === 1 ? 0 : 1;

      const updatedLikeStatus = await connection.execute(
        `UPDATE likes SET liked = ? WHERE account_id = ? AND thread_id = ?`,
        [newLikeStatus, account_id, thread_id]
      )

      return newLikeStatus === 1 ? 'liked' : 'unliked';
    } catch(err) {
      console.error('Error on updating like status:', err)
      throw err;
    }
  }


  /**
   * * An All in one function that perform Create, Update at the same time
   * @param {*} thread_id 
   * @param {*} account_id 
   * @returns 
   */
  async automaticLike(thread_id, account_id) {
    const threadExist = await this.helper.checkThreadExist(thread_id);

    if (!threadExist) {
      return null
    }

    const existedLike = await this.helper.likeInRecord(thread_id, account_id);

    try {
      if (existedLike.length > 0) {
        
        const update = await this.updateLikeStatus(thread_id, account_id);

        const updatedThread = await this.thread.getSpecificThread(thread_id)

        return {
          message: update,
          data: updatedThread
        }

      } else {
        const recordedLike = await this.addLike(thread_id, account_id);

        const updatedThread = await this.thread.getSpecificThread(thread_id);

        return {
          message: recordedLike,
          data: updatedThread
        }
      }
    } catch(err) {
      console.error('Error in automaticLike:', err);
      throw err;
    }
  }

  // /**
  //  * Remove a like from a post
  //  * 
  //  * @param {number} post_id - The ID of the post to unlike
  //  * @param {number} account_id - The ID of the user who wants to remove the like
  //  * @returns {Promise<void>}
  //  */
  // async remove(thread_id, account_id) {
  //   console.log('thread_id:', thread_id);
  //   console.log('account_id:', account_id);

  //   const query = `
  //     DELETE FROM likes
  //     WHERE thread_id = ? AND account_id = ?
  //   `;

  //   try {
  //     const [result] = await connection.execute(query, [thread_id, account_id]);
  //     console.log('Delete result:' );
  //     return result;
  //   } catch (err) {
  //     console.error('Error removing like:', err.message);
  //     throw err;
  //   }
  // }

  /**
   * Get all likes for a specific post
   * 
   * @param {number} post_id - The ID of the post
   * @returns {Promise<object[]>} - An array of likes
   */
  async getAllLikers(thread_id) {
    try {
        const [likes] = await connection.execute(
          `SELECT account_id FROM Likes WHERE thread_id = ? AND liked = 1`,
          [thread_id]
        );
        
        const user = await Promise.all(
          likes.map(async (user) => {
              return await this.helper.getLikersUsernames(user.account_id); 
            })
          )

        return user
    } catch (err) {
        console.error('Error fetching likes:', err.message);
        throw err;
    }
  }
}

class LikeHelper {
  constructor() {
    this.thread_db = connection;
  }

  async likeInRecord(thread_id, account_id) {
    try {
      const checkExist = await connection.execute(
        `SELECT liked FROM likes WHERE account_id = ? AND thread_id = ?`,
        [account_id, thread_id]
      )

      return checkExist[0];
    } catch(err) {
      console.error('Error in likeInRecord:',err);
      throw err;
    }
  }

  async checkThreadExist(thread_id) {
    try {
      const [existedThread] = await connection.execute(
        `SELECT thread_id, account_id FROM threads WHERE thread_id = ?`,
        [thread_id]
      )

      console.log(existedThread)
      if (existedThread.length > 0) return existedThread[0];

      return null
    } catch(err) {
      console.error('Error on checkThreadExist:', err);
      throw err;
    }
  }

  async getLikersUsernames(account_id) {
    try {
      const [user] = await connection.execute(
        `SELECT username, profile_image FROM account WHERE account_id = ?`,
        [account_id]
      )

      return user[0]
    } catch(err) {
      console.error('Something is wrong on getLikersUsername:', err);
      throw err;
    }
  }
}

export default Like;
