import express from 'express';

import verifyAuth from '../middleware/verifyAuth.middleware';
import AccountController from '../controllers/account.controller';

let accountRouter = express.Router();
let accountController = new AccountController()


accountRouter.get('/search/', verifyAuth, function(request,response) {
  accountController.searchForAccounts(request, response)
});


export default accountRouter;