import { Follow, FollowHelper } from "../../models/follow.js";
import User from "../../models/User.js";

class FollowController {
    constructor() {
        this.helper = null;
        this.follow = new Follow();
        this.followHelper = new FollowHelper();
        this.account = new User();
    }

    async followAccount(req, res) {
       const authenticadedAccountId = res.locals.account_id;

       const accountFollowing = req.params.account_id;

       try {
        if (!accountFollowing) {
            return res.json({
                success: false,
                message: "Missing account_id on your URl pls check it 🚩",
                data: null
            })
        }

        const userExistValidation = await this.account.get(accountFollowing);

        if (!userExistValidation) {
            return res.json({
                success: false,
                message: "Cant find who you following 🚩",
                data: null
            });
        }

        if (authenticadedAccountId === userExistValidation['account_id']) {
            return res.json({
                success: false,
                message: "You cant follow yourself bruhh 🦖🚩",
                data: null
            })
        }

        const followInRecord = await this.follow.followAccount(authenticadedAccountId, accountFollowing);

        return res.json({
            success: true,
            message: `Sucessfuly ${followInRecord.message} ${userExistValidation.username} 😎🎉`,
            data: followInRecord.data
        })

       }catch(err) {
        console.error(err);
        return res.json({
            success: false,
            message: 'Something is wrong on following account'
        })
       }
    }

    async getFollowerAccount(req, res) {
        const { account_id } = req.params;

        try {
            const checkAccountExistence = this.account.get(account_id);

            if (!checkAccountExistence) {
                return res.json({
                    success: false,
                    message: "Account is not existing, cant get its followers... of course 🚩",
                    data: null
                });
            }
            
            const followerResult = await this.follow.getFollower(account_id);

            return res.json({
                success: true,
                message: "Successfully get the follower of the account🦖✨",
                data: followerResult
            })
        }catch(err) {
            console.error(err)
            return res.json({
                success: false,
                message: "Something is wrong cant get your followers 🚩"
            })
        }
    }

    async getFollowingAccount(req, res) {
        const { account_id } = req.params;

        try {
            const checkAccountExistence = this.account.get(account_id);

            if (!checkAccountExistence) {
                return res.json({
                    success: false,
                    message: "Account is not existing, cant get its following... of course 🚩",
                    data: null
                });
            }

            const followingResult = await this.follow.getFollowing(account_id);

            return res.json({
                success: true,
                message: "Successfully get the following of the account🦖✨",
                data: followingResult
            })
        }catch(err) {
            console.error(err)
            return res.json({
                success: false,
                message: "Something is wrong cant get your following 🚩"
            })
        }
    }
}

export default FollowController