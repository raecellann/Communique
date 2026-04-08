import { connection } from '../core/database.js';

class Thread {
  constructor() {
    this.thread_db = connection;
    this.helper = new ThreadHelper()
  }

  async report(thread_id, account_id, reasons) {
    const [threadResults] = await connection.execute(
      `SELECT * FROM threads WHERE thread_id = ?`,
      [thread_id]
    );

    if (threadResults.length === 0) {
      return null
    }

    const [existingReport] = await connection.execute(
      `SELECT * FROM report WHERE thread_id = ? AND account_id = ?`,
      [thread_id, account_id]
    );

    if (existingReport.length > 0) {
        return 'exist'
    }

    try {
      for (const reason of reasons) {
        await connection.execute(
          `INSERT INTO report (thread_id, account_id, reason) VALUES (?, ?, ?)`,
          [thread_id, account_id, reason]
        );
      }
      
      const updatedThread = await this.getSpecificThread(thread_id)

      return updatedThread

    } catch (error) {
      console.error('Error reporting thread in model:', error.message);
      throw error;
    }
  }

  /**
   * 
   * @param {*} query 
   * @returns 
   */
  async searchByContent(query) {
    try {
      const [postResults] = await connection.execute(
        `SELECT * FROM threads WHERE content LIKE ?`,
        [`%${query}%`]
      )

      if (!postResults) {
        return;
      }
     
      const results = await this.helper.arrangeListOfData(postResults);

      return results;
    } catch (err) {
      console.error('<error> thread.searchByContent', err);
      throw err;
    }
  }

  /**
   * For viewing specific post that allows viewing of comments too
   * @param {*} thread_id 
   * @returns 
   */
  async getSpecificThread(thread_id) {
    try {

      const [postResults] = await connection.execute(
        `SELECT * FROM threads WHERE thread_id = ?`,
        [thread_id]
      )

      const post = postResults[0];

      if (!post) {
        return null
      }

      const user = await this.helper.getUser(post.account_id);
      const hashtags = await this.helper.getHashtags(post.thread_id);
      const numLikes = await this.helper.getNumLikes(post.thread_id);
      const numComments = await this.helper.getNumComments(post.thread_id);
      const numReposts = await this.helper.getNumReposts(post.thread_id);
      const numReports = await this.helper.getNumReports(post.thread_id)
     
      const result = {
        thread_id: post.thread_id,
        is_repost: post.is_repost === 1 ? true : false,
        account_id: post.account_id,
        username: user.username,
        user_profile: user.profile_image,
        parent_thread_id: post.parent_thread_id,
        content: post.content,
        hashtags: hashtags,
        likes: numLikes,
        comments: numComments,
        repost: numReposts,
        reports: numReports,
        created_at: post.created_at
      }

      return result

    } catch(err) {
      console.error(err)
      return res.json({
        success: false,
        message: "Oops, Something is wrong on getting specific thread post 🚩",
        data: null
      })
    }
  }

  /**
   * Create a new thread (post)
   *
   * @param {string} title
   * @param {string} content
   * @param {number} accountId
   * @param {number} relevanceScore
   * @returns {Object}
   * @throws {Error}
   */
  async create(account_id, content, hash_tags) {
    try {
      const [result] = await connection.execute(
        `INSERT INTO threads (account_id, content) VALUES (?, ?)`,
        [account_id, content]
      );


      const thread_id = result.insertId;

      if (hash_tags && hash_tags.length > 0) {
        for (const tag of hash_tags) {
          let [existingHashtag] = await connection.execute(
            `SELECT hashtag_id FROM hashtags WHERE hashtag_name = ?`,
            [tag]
          );

          let hashtag_id = null;

          if (existingHashtag.length === 0) {
            const [newHashtag] = await connection.execute(
              `INSERT INTO hashtags (hashtag_name) VALUES (?)`,
              [tag]
            );

            hashtag_id = newHashtag.insertId
          } else {
            hashtag_id = existingHashtag[0].hashtag_id;
          }

          await connection.execute(
            `INSERT INTO thread_hashtags (thread_id, hashtag_id) VALUES (?, ?)`,
            [thread_id, hashtag_id]
          );
        }
      }

      const threadAdded = await this.getSpecificThread(thread_id);

      return threadAdded
    } catch (err) {
      console.error('Error creating thread:', err);
      throw new Error('Could not create thread.');
    }
  }


  // /**
  //  * Fetch a thread by its ID
  //  *
  //  * @param {number} id
  //  * @returns {Object}
  //  * @throws {Error}
  //  */
  // async findById(thread_id) {
  //   try {
  //     const [results] = await this.thread_db.execute(
  //       'SELECT * FROM threads WHERE thread_id = ?',
  //       [thread_id]
  //     );

  //     return results.length ? results[0] : null;
  //   } catch (err) {
  //     console.error('<error> thread.findById', err);
  //     throw err;
  //   }
  // }

  /**
   * Fetch all threads by account ID with optional limit and offset
   *
   * @param {number} accountId
   * @param {number} limit
   * @param {number} offset
   * @param {string} sortBy
   * @returns {Array}
   * @throws {Error}
   */
  async fetchAllByAccountId(account_id, limit = 10, offset = 0, sortBy = 'created_at') {
    try {
      const [postResults] = await connection.execute(
        `SELECT thread_id, account_id, parent_thread_id, content, created_at
        FROM threads WHERE account_id = ? AND parent_thread_id IS NULL
        ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        [account_id, limit, offset]
      )

      const results = await this.helper.arrangeListOfData(postResults)
      
      if (sortBy !== 'created_at') {
        results.sort((postA, postB) => postB[sortBy] - postA[sortBy]);
      }

      return results.length ? results : [];
    } catch (err) {
      console.error('<error> thread.fetchAllByAccountId', err);
      throw err;
    }
  }

  /**
   * Fetch relevant posts with optional limit and offset
   *
   * @param {number} limit
   * @param {number} offset
   * @param {string} sortBy
   * @returns {Array}
   * @throws {Error}
   */
  async fetchAllThreads(limit = 10, offset = 0, sortBy = 'created_at') {
    try {
      const [postResults] = await connection.execute(
        `SELECT thread_id, account_id, parent_thread_id, content, created_at
        FROM threads WHERE parent_thread_id IS NULL
        ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        [limit, offset]
      )

      const results = await this.helper.arrangeListOfData(postResults);

      if (sortBy !== 'created_at') {
        results.sort((postA, postB) => postB[sortBy] - postA[sortBy]);
      }

      return results.length ? results : [];
    } catch (err) {
      console.error('<error> thread.fetchAllThreads', err.message);
      throw new Error('Database query failed');
    }
  }
  

  /**
   * Delete a thread by its ID
   *
   * @param {number} id
   * @returns {Object}
   * @throws {Error}
   */
  async deletePost(threadId, authenticatedAccountId) {
    try {
      const [existedThread] = await connection.execute(
        `SELECT thread_id FROM threads WHERE thread_id = ? AND account_id = ?`,
        [threadId, authenticatedAccountId]
      );

      if (existedThread.length === 0) return null

      const [results,] = await connection.execute(
        'DELETE FROM threads WHERE thread_id = ? AND account_id = ?',
        [threadId, authenticatedAccountId]
      );

      return threadId;
    } catch (err) {
      console.error('<error> thread.deleteById', err);
      throw err;
    }
  }

  /**
   *  Should i call you mistah?
   * @param {*} account_id 
   * @returns 
   */
  async getTheGendah(account_id) {
    try {
      const [gender] = await connection.execute(
        `SELECT gender FROM account WHERE account_id = ?`, 
        [account_id]
      )

      const gendah = gender[0]

      if (gendah === 'Male') {
        return 'bro'
      } else {
        return 'sis'
      }

    } catch(err) {
      console.error('Error ')
    }
  }

}



class ThreadHelper {
  constructor() {
    this.thread_db = connection
  }

  async getUser(account_id) {
    const [userResults] = await connection.execute(
      `SELECT username, profile_image FROM account WHERE account_id = ?`,
      [account_id]
    )

    const user = userResults[0];

    return user
  }

  async getNumLikes(thread_id) {
    const [likeResults] = await connection.execute(
      `SELECT COUNT(*) AS likes FROM likes WHERE thread_id = ? AND liked = 1`,
      [thread_id]
    );

    const likes = likeResults[0].likes

    return likes
  }

  async getNumComments(thread_id) {
    const [commentResults] = await connection.execute(
      `SELECT COUNT(*) AS comments FROM threads WHERE parent_thread_id = ?`,
      [thread_id]
    );

    const comments = commentResults[0].comments

    return comments
  }

  async getNumReposts(thread_id) {
    const [repostResults] = await connection.execute(
      `SELECT COUNT(*) AS reposts FROM threads WHERE parent_thread_id = ? AND is_repost = 1`,
      [thread_id]
    );

    const reposts = repostResults[0].reposts

    return reposts
  }

  async getHashtags(thread_id) {
    const [hashtagResults] = await connection.execute(
      `SELECT h.hashtag_name 
      FROM hashtags h 
      JOIN thread_hashtags th ON h.hashtag_id = th.hashtag_id 
      WHERE th.thread_id = ?`,
      [thread_id]
    );

    const hashtags = hashtagResults.map((row) => row.hashtag_name);
    return hashtags
  }

  async getNumReports(thread_id) {
    const [reportResults] = await connection.execute(
    `SELECT COUNT(DISTINCT account_id) AS reports FROM report WHERE thread_id = ?`,
    [thread_id]
    );

    const reports = reportResults[0].reports

    return reports
  }

  async arrangeListOfData(array) {
    const results = await Promise.all(
      array.map(async (post) => {
        const user = await this.getUser(post.account_id);
        const hashtags = await this.getHashtags(post.thread_id);
        const numLikes = await this.getNumLikes(post.thread_id);
        const numComments = await this.getNumComments(post.thread_id);
        const numReposts = await this.getNumReposts(post.thread_id);
        const numReports = await this.getNumReports(post.thread_id);

        return {
          thread_id: post.thread_id,
          is_repost: post.is_repost === 1 ? true : false,
          account_id: post.account_id,
          username: user.username,
          user_profile: user.profile_image,
          parent_thread_id: post.parent_thread_id,
          content: post.content,
          hashtags: hashtags,
          likes: numLikes,
          comments: numComments,
          repost: numReposts,
          reports: numReports,
          created_at: post.created_at,
        };
      })
    );

    return results
  }
}


export { Thread, ThreadHelper };
