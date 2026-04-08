import { connection } from '../core/database.js';
import { Thread, ThreadHelper } from './thread.js';

class Repost {
  constructor() {
    this.threadHelper = new ThreadHelper();
    this.thread = new Thread();
  }

  /**
   * Create a repost for a specific thread.
   * @param {number} thread_id - ID of the thread to repost.
   * @param {number} account_id - ID of the account making the repost.
   * @returns {Promise<object>} - The newly created repost.
   */
  async create(thread_id, account_id, content) {
    try {
      
      const [result] = await connection.execute(
        `INSERT INTO threads (parent_thread_id, account_id, content, is_repost) VALUES (?, ?, ?, 1)`,
        [thread_id, account_id, content]
      );


      const repost_id = result.insertId;
      return await this.thread.getSpecificThread(repost_id);
    } catch (error) {
      console.error('Error creating repost:', error.message);
      throw error;
    }
  }

  /**
   * Fetch reposts by thread ID.
   * @param {number} thread_id - ID of the original thread.
   * @param {number} limit - Maximum number of reposts to fetch.
   * @param {number} offset - Starting point for fetching reposts.
   * @returns {Promise<array>} - List of reposts.
   */
  async fetchReposts(thread_id, limit = 10, offset = 0) {
    try {
      const [reposts] = await connection.execute(
        `SELECT * FROM threads WHERE parent_thread_id = ?
         ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        [thread_id, limit, offset]
      );


      return await this.threadHelper.arrangeListOfData(reposts);
    } catch (error) {
      console.error('Error fetching reposts:', error.message);
      throw error;
    }
  }
}

export default Repost;
