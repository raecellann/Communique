import { connection } from '../core/database.js'; // Adjust the path as necessary
import User from './User.js';

class Follow {
    constructor() {
        this.account = new User();
        this.helper = new FollowHelper();
    }

    /**
     * Update follow status on record
     * @param {*} account_id 
     * @returns 
     */
    async updateFollow(userFollowing) {
        const existedLike = await this.helper.followInRecord(userFollowing);

        try {
            const newFollowStatus = existedLike[0].status === 1 ? 0 : 1;

            const updatedFollowStatus = await connection.execute(
                `UPDATE user_relationship SET status = ? WHERE following_id = ?`,
                [newFollowStatus, userFollowing]
            )

            return newFollowStatus === 1 ? 'followed' : 'unfollowed';
        } catch(err) {
        console.error('Error on updating like status:', err)
        throw err;
        }
    }

    async addFollow(userFollower, userFollowing) {
        try {
            // * Tutel 🐢👍
            const like = await connection.execute(
              `INSERT INTO user_relationship (follower_id, following_id, status) VALUES (?, ?, 1)`,
              [userFollower, userFollowing]
            );
            
            return 'followed';
        } catch (err) {
        console.error('Error adding like:', err.message);
        throw err;
        }
    }

    async followAccount(userFollower, userFollowing) {

        const existedFollow = await this.helper.followInRecord(userFollowing);
        try {
            if (existedFollow.length > 0) {
                const update = await this.updateFollow(userFollowing)

                const updatedProfileFollower = await this.account.get(userFollower)
                const updatedProfileFollowing = await this.account.get(userFollowing)

                return {
                    message: update,
                    data: {
                        follower_profile: updatedProfileFollower,
                        following_profile: updatedProfileFollowing
                    }
                }
            } else {
                console.log('Follow recorded')
                const recordedFollow = await this.addFollow(userFollower, userFollowing);

                const updatedProfileFollower = await this.account.get(userFollower)
                const updatedProfileFollowing = await this.account.get(userFollowing)

                return {
                    message: recordedFollow,
                    data: {
                        follower_profile: updatedProfileFollower,
                        following_profile: updatedProfileFollowing
                    }
                }
            } 

        } catch(err) {
            console.error(err)
            throw err;
        }
    }

    async getFollower(account_id) {
        try {
            const [results] = await connection.execute(
                `SELECT follower_id FROM user_relationship WHERE following_id = ?`,
                [account_id]
            );

            const followingIds = results.map(row => row.follower_id);

         
            const followerDetails = await Promise.all(
                followingIds.map(account_id => this.account.get(account_id))
            );

            return followerDetails
            

        }catch(err) {
            console.error(err)
            throw err
        }
    }

    async getFollowing(account_id) {
        try {
            const [results] = await connection.execute(
                `SELECT following_id FROM user_relationship WHERE follower_id = ?`,
                [account_id]
            );

            const followingIds = results.map(row => row.following_id);

         
            const followingDetails = await Promise.all(
                followingIds.map(account_id => this.account.get(account_id))
            );

            return followingDetails
            

        }catch(err) {
            console.error(err)
            throw err
        }
    }
}

class FollowHelper {
    constructor() {
        this.connection = connection
    }

    async followInRecord(userFollower) {
        try {
            const checkExist = await connection.execute(
              `SELECT status FROM user_relationship WHERE following_id = ?`,
              [userFollower]
            )
      
            return checkExist[0];
        } catch(err) {
        console.error('Error in likeInRecord:',err);
        throw err;
        }
    }
}

export  {Follow , FollowHelper}