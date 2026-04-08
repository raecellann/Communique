import { connection } from '../core/database.js';
import { Thread, ThreadHelper } from './thread.js';

class Hashtags {
    constructor() {
        this.thread_db = connection;
        this.thread = new Thread();
        this.threadHelper = new ThreadHelper();
    }

    async find(searchQuery) {
      const hashtag = `%${searchQuery}%`
      try {
        const [result] = await connection.execute(
          `SELECT hashtag_id, hashtag_name FROM hashtags WHERE hashtag_name LIKE ?`,
          [hashtag]
        )

        if (result.length === 0) return [];
        
        console.log(result)
        const threadIds = [];
        for (const { hashtag_id } of result) {
            const [threadResults] = await connection.execute(
                `SELECT thread_id FROM thread_hashtags WHERE hashtag_id = ?`,
                [hashtag_id]
            );
            threadIds.push(...threadResults.map((thread) => thread.thread_id));
        }

        if (threadIds.length === 0) return [];

        const threadDetails = await Promise.all(
          threadIds.map(async (threadId) => {
              const [details] = await connection.execute(
                  `SELECT * FROM threads WHERE thread_id = ?`,
                  [threadId]
              );
              return details[0];
            })
        );

        
        const arranged = await this.threadHelper.arrangeListOfData(threadDetails)

        return arranged.length ? arranged : []

      } catch(err) {
        console.error(err)
        throw err
      }
    }

    async trends() {
      
    }

    async create(threadId, hashtagName, createdAt) {
        try {
          const [results] = await connection.execute(
            'INSERT INTO hashtags (thread_id, hashtag_name, created_at) VALUES (?, ?, ?)',
            [threadId, hashtagName, createdAt]
          );
          return results;
        } catch (err) {
          console.error('<error> hashtag.create', err);
          throw err;
        }
    }


    async getByThreadId(threadId) {
        try {
          const [results] = await connection.execute(
            'SELECT hashtag_name FROM hashtags WHERE thread_id = ?',
            [threadId]
          );
          return results;
        } catch (err) {
          console.error('<error> hashtag.getByThreadId', err);
          throw err;
        }
    }
}

export default Hashtags;
