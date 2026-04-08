import Like from '../../models/Like.js';

class LikeController {
  constructor() {
    this.like = new Like();
  }

  /**
   *  At the same time it can `Update` ,`Create` a specific thread post , helps also to avoid a work of backend on frontend
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async automatedLike(req, res) {
    const { thread_id } = req.params;
    const { account_id } = res.locals;

    try {
      if (!account_id) {
        return res.json({
          success: false,
          message: '[Login First] In order to like a post, you need to login first 🚩',
          data: null
        })
      }

      if (!thread_id) {
        return res.json({
          success: false,
          message: 'Please give a specific thread ID in order to like ✌️🚩',
          data: null
        })
      }

      const result = await this.like.automaticLike(thread_id, account_id);

      if (!result) {
        return res.json({
          success: false,
          message: 'The thread is not existing for liking 🚩',
          data: null
        })
      }

      // * SUCCESS RESPONSE 🟢
      return res.json({
        success: true,
        message: `Successfuly ${result.message} a thread post 🎉🎈 `,
        data: result.data
      })
    } catch(err) {
      // ! ERROR RESPONSE 🔴
      console.error('Error on automatedLike:', err);
      return res.json({
        success: false,
        message: 'Uh oh, Something is wrong on your smart like 🚩⚠️',
        data: null
      });

    }
  }

  /**
   * Get likes for a specific post
   * 
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {void}
   */
  async getLikerist(req, res) {
    const { thread_id } = req.params;

    if (!thread_id) {
      return res.json({
        success: false,
        message: 'Please give a specific thread ID in order to get the poeple who like ✌️🚩',
        data: null
      })
    }

    try {
      const likes = await this.like.getAllLikers(thread_id);
      
      
      res.json({
        success: true,
        message: "Successfully get the likers of the thread ✨( •̀ ω •́ )✧",
        data: likes 
      });
    } catch (err) {
      res.json({
        success: false,
        message: 'Jeez something is wrong, i cant get the liker\'s Data 🐝 - - 🚩',
      });
    }
  }
}

export default LikeController;
