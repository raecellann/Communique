import { Router } from 'express';

import AccountController from '../../controllers/v1/accountController.js';
import authorization from '../../middlewares/authorization.js';
import authentication from '../../middlewares/authentication.js';

const accountRouter = new Router();
const account = new AccountController();

// Ensure that all endpoints implements authorization
accountRouter.use(authorization);

accountRouter.post('/sign-in', account.login.bind(account));

accountRouter.post('/sign-up', account.create.bind(account));

// * Account Termination || Deletion
accountRouter.delete('/:account_id', authentication, account.deleteAccount.bind(account))

// * Get user Profile
accountRouter.get('/profile/:account_id', authentication, account.profile.bind(account));

accountRouter.get('/profiles', account.getAllProfile.bind(account));

accountRouter.get('/search', account.search.bind(account));

// * Update user Profile or account
accountRouter.put('/profile/:account_id', authentication, account.editProfile.bind(account));

// * Add a friend? or lotz of friends (*/ω＼*)
accountRouter.post('/:account_id/follower', authentication, account.follow.bind(account));

export default accountRouter;



