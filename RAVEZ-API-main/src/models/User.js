import { connection } from '../core/database.js';
import { encryptPassword } from '../utils/hash.js';

class User {
  constructor() {
    this.thread_db = connection;
  }


  // async follow(following_id, follower_id) {
  //   try {
  //     const [follower] = await connection.execute(
  //       'SELECT account_id FROM account WHERE account_id = ?',
  //       [follower_id]
  //     );
  
  //     const [following] = await connection.execute(
  //       'SELECT account_id FROM account WHERE account_id = ?',
  //       [following_id]
  //     );
  
  //     if (!follower.length || !following.length) {
  //       return { success: false, message: "One or both accounts do not exist." };
  //     }
  
  //     const [relationship] = await connection.execute(
  //       'SELECT * FROM user_relationship WHERE follower_id = ? AND following_id = ?',
  //       [follower_id, following_id]
  //     );
  
  //     if (relationship.length > 0) {
  //       return { success: false, message: "Already following this user." };
  //     }

  //     await connection.execute(
  //       'INSERT INTO user_relationship (follower_id, following_id) VALUES (?, ?)',
  //       [follower_id, following_id]
  //     );
  
  //     return { success: true, message: "You are now following the user!" };
  //   } catch (err) {
  //     console.error('<error> user.follow', err);
  //     throw err;
  //   }
  // }

  /**
   * Create user profile
   *
   * @param {String} username
   * @param {String} password
   *
   * @returns {Object}
   * @throws MySQL2 error
   *
   */
  async create(username, gender, email, password) {
    try {
      const profileImage = gender.toLowerCase() === "male" ? "https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429736/men_user_etkhsg.png" : "https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png"

      const [results,] = await connection.execute(
        'INSERT INTO account (username, gender, email, password, profile_image) VALUES (?, ?, ?, ?, ?)',
        [username, gender, email, encryptPassword(password), profileImage],
      );
      return results;
    } catch (err) {
      console.error('<error> user.create', err);
      throw err;
    }
  }

  async editProfile(accountId, username, gender, bio, email, profile_image, password) {
    try {
      const [results] = await connection.execute(
        `UPDATE account 
         SET username = ?, bio = ?, gender = ?, email = ?, profile_image = ?, password = ?
         WHERE account_id = ?`,
        [username, bio, gender, email, profile_image, password, accountId]
      );

      return results;
    } catch (err) {
      console.error('<error> user.editProfile', err);
      throw err;
    }
  }

  /**
   * Verify if account exists
   *
   * @param {string} username 
   * @param {string} password
   * @returns {Object}
   * @throws {Error}
   */
  async verify(usernameOrEmail, password) {
    try {
      const [results,] = await connection.execute(
        'SELECT account_id, username FROM account WHERE (username = ? OR email = ?) AND password = ?',
        [usernameOrEmail, usernameOrEmail, encryptPassword(password)],
      )

      return results?.[0];
    } catch (err) {
      console.error('<error> user.verify', err);
      throw err;
    }
  }

  
  async getNumOfFollowers(accountId) {
    try {
      const [results,] = await connection.execute(
        `SELECT COUNT(*) AS follower_count 
         FROM user_relationship 
         WHERE following_id = ? AND status = 1`,
        [accountId]
      );
      return results[0].follower_count;
    } catch (err) {
      console.error('<error> user.getNumOfFollowers', err);
      throw err;
    }
  }

  async getNumOfFollowings(accountId) {
    try {
      const [results,] = await connection.execute(
        `SELECT COUNT(*) AS following_count 
         FROM user_relationship 
         WHERE follower_id = ? AND status = 1`,
        [accountId]
      );
      return results[0].following_count;
    } catch (err) {
      console.error('<error> user.getNumOfFollowings', err);
      throw err;
    }
  }

  async getNumOfPost(accountId) {
    try {
      const[results,] = await connection.execute(
        `SELECT COUNT(*) AS post_count FROM threads WHERE account_id = ?`,
        [accountId]
      );

      return results[0].post_count
    } catch(err) {
      console.error('<error> user.getNumOfPost',err);
      throw err;
    }
  }

  async checkUserExistence(username, email) {
    try {
      const [result,] = await connection.execute(
        `SELECT account_id, username, bio FROM account WHERE username = ? OR email = ?`,
        [username, email]
      );

      if (result.length === 0) {
        return false
      }

      return true

    } catch(err) {
      console.error('Error on checkUserExistence function:',err)
      throw err;
    }
  }

  /**
   * Get user's information
   *
   * @param {string} username 
   * @returns {Object}
   * @throws {Error}
   *
   */
  async get(accountId) {
    try {
      const [accountResults,] = await connection.execute(
        `SELECT account_id, username, bio , gender, email, profile_image
         FROM account 
         WHERE account_id = ?`,
        [accountId]
      );

      if (accountResults.length === 0) {
        return null; 
      }

      const account = accountResults[0];

      // * Get follower and following counts
      account.followers = await this.getNumOfFollowers(accountId);
      account.following = await this.getNumOfFollowings(accountId);
      account.post = await this.getNumOfPost(accountId)

      return account;

    } catch (err) {
      console.error('Error retrieving account information:', err);
      throw err;
    }
  }


  async getAll(accountId) {
    try {
      const [accountResults,] = await connection.execute(
        `SELECT account_id, username, bio , gender, email, profile_image
         FROM account 
         WHERE account_id != ?`,
        [accountId]
      );

      if (accountResults.length === 0) {
        return null; 
      }

      const account = accountResults;


      // * Get follower and following counts
      account.followers = await this.getNumOfFollowers(accountId);
      account.following = await this.getNumOfFollowings(accountId);
      account.post = await this.getNumOfPost(accountId)


      console.log(account);
      return account;

    } catch (err) {
      console.error('Error retrieving account information:', err);
      throw err;
    }
  }






  /**
   * Find user by username
   *
   * @param {string} username 
   * @returns {Object}
   * @throws {Error}
   */
  async findByUsername(username) {
    try {
      const [results,] = await connection.execute(
        'SELECT account_id FROM account WHERE username = ?',
        [username]
      );

      return results.length ? results[0] : null;
    } catch (err) {
      console.error('<error> user.findByUsername', err);
      throw err;
    }
  }

  async searchAccounts(query) {
    try {
      const [results,] = await connection.execute(
         `SELECT account_id, username, profile_image FROM account WHERE username LIKE ?`,
         [`%${query}%`]
      )

      return results
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  
  async delete(accountId) {
    try {
      const [results,] = await connection.execute(
        `DELETE FROM account WHERE account_id = ?`,
        [accountId]
      );

      return results
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

}

export default User;