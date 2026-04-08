// controllers/v1/postsController.js
import { Thread } from '../../models/thread.js'; 

class threadController {
  constructor() {
    this.thread = new Thread();
  }

  async reportThread(req, res) {
    const { thread_id } = req.params;
    const { reasons } = req.body;
    const accountId = parseInt(res.locals.account_id)

    const validReason = ["Bullying","Sexual","False Information"]
    

    if (!reasons) {
      return res.status(400).json({
        success: false,
        message: 'Missing reasons on the request body, check your payload 🚩',
        data: null
      });
    }

    if (!reasons.every(reason => validReason.includes(reason))) {
      return res.json({
        succes: false,
        message: `Invalid reasons, We have only 3 reason which is ${validReason} 🚩`,
        data: null
      })
    }

    if (!thread_id) {
      return res.json({
        success: false,
        message: "Looks like you forgot to put your thread_id on params 🚩",
        data: null
      })
    }
    
    if (!Array.isArray(reasons)) {
      return res.json({
        success: false,
        message: "reasons on your payload should be an array 🚩",
        data: null
      })
    }

    try {
      const reportResult = await this.thread.report(thread_id, accountId, reasons);

      if (!reportResult) {
        return res.json({
          succes: false,
          message: "Cant find the specified thread to report 🚩",
          data: null
        })
      }

      if (reportResult === 'exist') {
        const justGetTheGendah  = await this.thread.getTheGendah(accountId)

        return res.json({
          succes: false,
          message: `Chill out ${justGetTheGendah}, you just reported this thread already 🧊🚩`,
          data: null
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Thread reported successfully 📣🎉',
        data: reportResult
      });
    } catch (error) {
      console.error('Error reporting thread:', error);
      return res.status(500).json({
        success: false,
        message: 'Something is wrong on report, you might wanna check for it 🚩',
      });
    }
  }
  

  /**
    * Get all threads for a specific user by account_id.
    */
  async getUserThreads(req, res) {
    const accountId = parseInt(req.params.account_id);

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const sortBy = req.query.sortBy || 'created_at';

    const validQuery = ['created_at','comments','repost','likes']

    if (!validQuery.includes(sortBy)) {
      return res.json({
        success: false,
        message: `Invalid query choose on the following query: ${validQuery} 🚩`,
        data: null
      })
    }

    try {
      if (!accountId) {
        return res.json({
          success: false,
          message: 'Missing account_id on the URL, pls check it 🚩',
          data: null
        })
      }

      const threads = await this.thread.fetchAllByAccountId(accountId, limit, offset, sortBy);

      // if (threads.length === 0) {
      //   return res.json({
      //     success: false,
      //     message: "Can't find any Thread's on your account🚩",
      //     data: null
      //   });
      // }

      // * SUCCESS RESPONSE 🟢
      return res.json({
        success: true,
        message: `${threads.length} Thread's has been found ✨🎉`,
        data: threads,
      });
    } catch (error) {
      // ! ERROR RESPONSE 🔴
      console.error('Error fetching user threads:', error.message);
      res.json(
        { success: false,
          message: 'Something is wrong on getting user thread posts 🚩',
          data: null
      });
    }
  }


  /**
   * Search for threads 🎊
   */
  async searchThreads(req, res) {
    try {
      const { query } = req.query;
    
      if (!query) {
        return res.status(400).json({
          success: false,
          data: "query keyword on your URL is required 🚩"
        });
      }
      const threads = await this.thread.searchByContent(query);
  
      return res.json({
        success: true,
        message: threads.length 
                  ? `${threads.length} threads found based on your search 🔍🪄` 
                  : "Oops! Can't find any threads based on your search 🚩",
        data: threads.length ? threads : [],
      });
    } catch (error) {
      console.error('Error searching threads:', error.message);
      res.status(500).json({ success: false, message: 'Failed to search threads' });
    }
  }


  /**
   * Get all posts with optional limits, offset, and sortBy query parameters.
   */
  async getAllPosts(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const sortBy = req.query.sortBy || 'created_at';
      const validQuery = ['created_at','comments','repost','likes']

      if (!validQuery.includes(sortBy)) {
        return res.json({
          success: false,
          message: `Invalid query choose on the following query: ${validQuery} 🚩`,
          data: null
        })
      }

      const threads = await this.thread.fetchAllThreads(limit, offset, sortBy);

      if (threads.length === 0) {
        return res.json({
          success: false,
          message: "Looks like you reach the end, No Threads for now ✌️🚩",
          data: null
        });
      }

      res.json({
        success: true,
        message: `${threads.length} Thread Succesfuly fetched 🎉✨`,
        data: threads,
      });
    } catch (error) {
      console.error('Error fetching all threads:', error.message);
      res.status(500).json({
        success: false,
        message: 'Uh oh, Something is wrong on getting all of the thread posts 🚩',
        data: null
      });
    }
  }  
  
  
  /**
   * Get a post by its specific ` thread_id `
   */
  async getSpecificPost(req, res) {
    try {
      const { thread_id } = req.params;
      const post = await this.thread.getSpecificThread(thread_id);

      if (!thread_id) {
        return res.json({
          success: false,
          message: 'Missing thread_id on your params, pls check on it 🚩',
          data: null
        })
      }

      if (!post) {
        return res.json({
          success: false,
          message: 'Cant find the Post your lookin for 🚩',
          data: null
        });
      }

      return res.json({
        success: true,
        message: '✨ Succesfuly get the Post youre lookin for 🎉',
        data: post
      });

    } catch(err) {
      console.error('Error fetching post:', err.message);
      return res.json(
        { success: false,
          message: 'Uh oh, something is wrong on getting the specific thread post 🚩',
          data: null
      });
    }
  }

  /**
   * Create a new post.
   */
  async createPost(req, res) {
    const accountId = parseInt(req.params.account_id);
    const authenticatedAccountId = res.locals.account_id

    const { content} = req.body;

    if (accountId !== authenticatedAccountId) {
      return res.json({
        success: false,
        message: '[Login First] Unauthorized this is for personal accounts only ⚠️🚩 '
      })
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Missing content in the request body. 🚩',
        data: null
      });
    }

    try {
      // * Using regex 🍯✨
      const hash_tags = content.match(/#[-\w]+/g) || [];

      const result = await this.thread.create(accountId, content, hash_tags);

      return res.status(201).json({
        success: true,
        message: 'Thread succesfuly Created!, Hooray 🎉',
        data: result
      });
      
    } catch (error) {
      console.error('Error in ThreadController.createPost:', error);
      return res.status(500).json({
        success: false,
        message: 'Jeez , Cant create the thread post, something wrong on post creation 🚩',
        data: null
      });
    }
  }

  async deleteSpecificThread(req, res) {
    const threadId = req.params.thread_id

    console.log('no')

    const authenticatedAccountId = res.locals.account_id;

    try {
      if (!authenticatedAccountId) {
        return res.json({
          success: false,
          message: '[Login First] Looks like youre missing a token 🚩',
          thread_id: null
        })
      }

      const deletionResult = await this.thread.deletePost(threadId, authenticatedAccountId)

      if (!deletionResult) {
        return res.json({
          success: false,
          message: 'Cant find your thread to delete for 🚩',
          thread_id: null
        });
      }

      return res.json({
        success: true,
        message: 'Successfully Deleted a Thread ♻️🗑️',
        thread_id: deletionResult
      })
    } catch(err) {
      console.error(err)
      return res.json({
        success: false,
        message: 'Oops Something is not right, cant delete a thread sorry 🚩',
        thread_id: null
      })
    }
  }

  /**
   * Get comments for a specific post.
   */
  async getPostComments(req, res) {
    try {
      const { postId } = req.params;
      const [comments] = await this.thread.fetchCommentsByPostId(postId); // You need to implement this method in Thread

      res.json({ success: true, data: comments });
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      res.status(500).json({ success: false, message: 'Failed to fetch comments' });
    }
  }

  /**
   * Get replies for a specific comment on a post.
   */
  async getCommentReplies(req, res) {
    try {
      const { postId, commentId } = req.params;
      const [replies] = await this.thread.fetchRepliesByCommentId(postId, commentId); // You need to implement this method in Thread

      res.json({ success: true, data: replies });
    } catch (error) {
      console.error('Error fetching replies:', error.message);
      res.status(500).json({ success: false, message: 'Failed to fetch replies' });
    }
  }

 
}

// Export an instance of the PostsController
export default new threadController();
