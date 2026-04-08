import Repost from '../../models/Repost.js';
import { Thread } from '../../models/thread.js';

class RepostController {
  constructor() {
    this.repost = new Repost();
    this.thread = new Thread();
  }

  /**
   * Create a repost for a specific thread.
   */
  async createRepost(req, res) {
    try {
      const thread_id = req.params.thread_id;
      const account_id = res.locals.account_id;
    //   const content = req.body;


      const { repostData } = req.body || {};
      const { content } = repostData[0] || {};



      if (!thread_id) {
        return res.json({
          success: false,
          message: 'Thread ID is missing in your request 🚩',
          data: null
        });
      }

      const threadExist = await this.thread.getSpecificThread(thread_id);

      if (!threadExist) {
        return res.json({
          success: false,
          message: 'The thread you are trying to repost does not exist 🚩',
          data: null
        });
      }

    //   console.log(threadExist);
      let result;
      if (threadExist.parent_thread_id || threadExist.is_repost) {
        result = await this.repost.create(threadExist.parent_thread_id, account_id, content);
      } else {
        result = await this.repost.create(thread_id, account_id, content);
      }

      res.json({
        success: true,
        message: 'Successfully reposted the thread 🎉✨',
        data: result
      });
    } catch (error) {
      console.error('Error creating repost:', error.message);
      res.status(500).json({
        success: false,
        message: 'Failed to create a repost 🚩',
        data: null
      });
    }
  }

  /**
   * Get reposts for a specific thread.
   */
  async getRepostsByThreadId(req, res) {
    try {
      const { thread_id } = req.params;
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;

      const threadExist = await this.thread.getSpecificThread(thread_id);

      if (!threadExist) {
        return res.json({
          success: false,
          message: 'The thread ID you provided does not exist 🚩',
          data: null
        });
      }

      const reposts = await this.repost.fetchReposts(thread_id, limit, offset);

      res.json({
        success: true,
        message: reposts.length
          ? `Found ${reposts.length} reposts for the thread 🎉✨`
          : 'No reposts found for the thread 🌷🐝',
        data: reposts
      });
    } catch (error) {
      console.error('Error fetching reposts:', error.message);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch reposts 🚩',
        data: null
      });
    }
  }
}

export default RepostController;
