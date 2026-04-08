import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

class AccountController {
  constructor() {
    this.user = new User();
  }

  /**
   * Create account controller
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {void}
   *
   */
  async create(req, res) {
    // const { createAccountData } = req.body;
    // const { username, gender, email, password } = createAccountData || {};
    const { username, gender, email, password } = req.body || {};

    console.log(username);

    if (!username || !gender || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Credentials",
        data: null
      });
    }

    if (password.length < 8 || password.length > 15) {
      return res.json({
        success: false,
        message: "Password must contain minimum of 8 characters and max of 15 characters",
        data: null
      })
    }

    try {
      // * Check if the username already exists
      const existingUser = await this.user.checkUserExistence(username, email);
      

      if (existingUser) {
        return res.json({
          success: false,
          message: 'Username already exists',
          data: null
        });
      }
      
      
      // Proceed to create the new account if the username is not taken
      const response = await this.user.create(username, gender, email, password);
      
      // * Success Response 🟢
      res.json({
        success: true,
        account_id: response?.insertId,
        message: "Successfully Creating Account 🎉"
      });
      res.end();

    } catch (err) {
      // ! Error Response 🔴
      res.json({
        success: false,
        message: "Oops something is wrong on the sign-up",
        data: null
      });
      res.end();
    }
  }

  async editProfile(req, res) {
    const accountId = parseInt(req.params.account_id);
    const authenticadedAccountId = res.locals.account_id;

    const { username, gender, bio, email, profile_image, password } = req.body;

    try {
      if (!username || !gender || !bio || !email || !profile_image || !password) {
        return res.json({
          "success":false,
          "message": "Missing Credentials",
          "data": null
        })
      }

      if (accountId !== authenticadedAccountId) {
        return res.json({
          "success": false,
          "message": "Your not authorized and dont have any rights to change/edit this account credentials⚠️",
          "data": null
        })
      }

      const result = await this.user.editProfile(accountId, username, gender, bio, email, profile_image, password);

      if (result.affectedRows === 0) {
        return res.json({
          success: false,
          message: "Cant find it",
          data: null
        });
      }

      const updatedProfileData = await this.user.get(accountId)

      // * SUCCESS RESPONSE 🟢
      res.json({
        success: true,
        message: "Sucessfully updated your Account Profile 🎉",
        data: updatedProfileData
      });
    } catch (err) {
      // ! ERROR RESPONSE 🔴
      res.json({
        success: false,
        message: "Jeez Something is wrong, cant edit/change your profile info's",
        data: null
      });
    }
  }


  /**
   *  Login Controller
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {void}
   */
  async login(req, res) {
    try {
      const { loginData } = req.body || {};
      const { username_or_email, password } = loginData || req.body || {};
      // const { username, password } = req.body || {};

      if (!username_or_email || !password) {
        return res.json({
          success: false,
          message: "Missing Credentials",
          data: null
        });
      }

      const result = await this.user.verify(username_or_email, password);

      if (!result?.account_id) {
        return res.json({
          success: false,
          message: 'Incorrect username or email , password',
          data: null
        });
      }

      // * SUCCESS RESPONSE 🟢
      res.json({
        success: true,
        message: "Sucessfully login to your account 🎉",
        data: {
          account_id: result.account_id,
          token: jwt.sign({ 'username': result.username, 'account_id': result.account_id}, process.env.API_SECRET_KEY, {
            expiresIn: '7d',
          }),
        }
      });

      res.end();

    } catch (err) {
      // ! ERROR RESPONSE 🔴
      console.log(err)
      res.json({
        success: false,
        message: "Oops something is wrong with the sign-in",
        data: null
      });
      res.end()
    }
  }

  /**
   * Get user profile
   *
   * @todo Update this to pull from database
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {void}
   *
   */
  async profile(req, res) {
    try {
      const accountId = parseInt(req.params.account_id);
      const authenticadedAccountId = res.locals.account_id;

      if (!accountId || !authenticadedAccountId) {
        return res.json({
          success: false,
          message: "Make sure to login first in order to view this person profile",
          data: null
        })
      }

      const userInfo = await this.user.get(accountId);

      if (!userInfo) {
        return res.status(404).json({
          success: false,
          message: 'User not found.',
          data: null
        });
      }

      let isVisit;
      let greet;

      if (accountId !== authenticadedAccountId) {
        isVisit = 'Visiten an';
        greet = 'Visitor 🤓☝️'
      } else {
        isVisit = 'Loaded your'
        greet = 'Master 😎'
      }
      
      // * SUCCESS RESPONSE 🟢
      res.json({
        success: true,
        message: `Sucessfully ${isVisit} Account Profile ${greet} 🎉`,
        data: userInfo
      });

    } catch (err) {
      // ! ERROR RESPONSE 🔴
      console.error(err)
      res.json({
        success: false,
        message: "Jeez Something is wrong, I cant get the information of the given account",
        data: null
      });
    }
  }




  async getAllProfile(req, res) {
    try {
      const accountId = parseInt(req.params.account_id);
      const authenticadedAccountId = res.locals.account_id;

      // if (!accountId || !authenticadedAccountId) {
      //   return res.json({
      //     success: false,
      //     message: "Make sure to login first in order to view this person profile",
      //     data: null
      //   })
      // }

      const userInfo = await this.user.getAll(accountId);

      if (!userInfo) {
        return res.status(404).json({
          success: false,
          message: 'Users not found.',
          data: null
        });
      }

      let isVisit;
      let greet;

      if (accountId !== authenticadedAccountId) {
        isVisit = 'Visiten an';
        greet = 'Visitor 🤓☝️'
      } else {
        isVisit = 'Loaded your'
        greet = 'Master 😎'
      }
      
      // * SUCCESS RESPONSE 🟢
      return res.json({
        success: true,
        message: `Sucessfully ${isVisit} Account Profile ${greet} 🎉`,
        data: userInfo
      });

    } catch (err) {
      // ! ERROR RESPONSE 🔴
      console.error(err)
      res.json({
        success: false,
        message: "Jeez Something is wrong, I cant get the information of the given account",
        data: null
      });
    }
  }








  async search(req , res) {
    try {
      const { query } = req.query

      if (!query) {
        return res.status(400).json({
          success: false,
          data: "Cant understand who are you finding 🐝 - -"
        });
      }

      const accounts = await this.user.searchAccounts(query)

      return res.json({
        "success": true,
        "data": accounts.length ? accounts : []
      })
      
    } catch(err) {
      console.error('Error in search: ',err)

      res.status(500).json({
          "success": false,
          "data": "An error occurred while searching for accounts."
      })
    }
  }

  // ! Debugging 
  async follow(req, res) {
    try {
      const { following_id, follower_id } = req.body;

      if (!following_id || !follower_id) {
        return res.status(400).json({
          success: false,
          message: "Both following_id and follower_id are required."
        });
      }

      const response = await this.user.follow(follower_id, following_id);

      if (response.success) {
        res.status(200).json({
          success: true,
          message: `Your Following Arbybille 🐝 - -`
        });
      } else {
        res.status(400).json({
          success: false,
          message: response.message || "Cant follow the account 💔"
        });
      }
    } catch (error) {
      console.error("Error in follow controller:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while attempting to follow the user."
      });
    }
  }

  /**
   * Secured deletion of self account
   */
  async deleteAccount(req, res) {
    try {
      const accountId = parseInt(req.params.account_id)

      // * For security measures or purposes
      const authenticatedAccountId = res.locals.account_id;

      
      if (accountId !== authenticatedAccountId) {
        return res.json({
          "success": false,
          "message": "Your not authorized and dont have any rights to delete this account⚠️"
        })
      }

      const result = await this.user.delete(accountId);

      if (result.affectedRows === 0) {
        return res.json({
          "success": false,
          "message": "Account not found or could be deleted already"
        })
      }

      // * SUCCESS RESPONSE 🟢

      return res.json({
        "success": true,
        "message": "Successfully Deleted your Account, Goodbye to that account 👋"
      })


    } catch(err) {
      // ! ERROR RESPONSE 🔴
      console.error("Error in the deleteAccount Function.",err)
      res.json({
        'success': false,
        "message": "Oops Something is wrong, cant perform deletion of the account"
      })
    }
  }
}

export default AccountController;
