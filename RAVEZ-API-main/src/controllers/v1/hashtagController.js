import { query } from 'express';
import Hashtags from '../../models/Hashtags.js';

class HashtagController {
    constructor() {
      this.hashtagModel = new Hashtags();
    }


    async findThreadByHashtag(req, res) {
      const searchQuery = req.query.query || null

      try {

        if (!searchQuery) {
          return res.json({
            success: false,
            message: "Make sure you have a \"query\" on your url🚩",
            data: searchQuery // ! of course null lol
          })
        }

        const findedThreads = await this.hashtagModel.find(searchQuery)

        if(findedThreads.length === 0) {
          return res.json({
            success: false,
            message: "Cant find the hashtag that youre lookin for 🚩",
            data: null
          })
        }

        return res.json({
          success: true,
          message: `Succesfully searched ${findedThreads.length} thread by its hashtag 🌷🐝`,
          data: findedThreads
        })
      }catch(err) {
        console.error('Error on findingThreadByHashag:', err)
        return res.json({
          success: false,
          message: "Something is wrong on your search hashtag 🚩",
          data: null
        })
      };
    }

    async getTrendingTopics(req, res) {
      try {
        
      } catch(err) {
        console.error(err)
        return res.json({
          success: false,
          message: 'Error on getting trends by hashtags 🚩',
          data: null
        })
      }
    }
    async create(req, res) {
        const { thread_id, hashtag_name, created_at } = req.body || {};
    
        // Basic validation
        if (!thread_id || !hashtag_name || !created_at) {
          return res.status(400).json({
            success: false,
            data: "Oops something is wrong, can't put the hashtag on record 🚩"
          });
        }
    
        try {
          const result = await this.hashtagModel.create(thread_id, hashtag_name, created_at);
    
          res.json({
            success: true,
            message: "Hashtag has been successfully recorded on the database"
          });
        } catch (err) {
          console.error('Error in creating hashtag:', err);
          res.status(500).json({
            success: false,
            data: "Oops something is wrong, can't put the hashtag on record 🚩"
          });
        }
    }


    // async getByThreadId(req, res) {
    //     const { thread_id } = req.params;
    
    //     try {
    //       const hashtags = await this.hashtagModel.getByThreadId(thread_id);
    //       res.json({
    //         success: true,
    //         data: hashtags
    //       });
    //     } catch (err) {
    //       console.error('Error fetching hashtags:', err);
    //       res.status(500).json({
    //         success: false,
    //         data: "An error occurred while fetching hashtags. 🚩"
    //       });
    //     }
    //   }
}

export default HashtagController;