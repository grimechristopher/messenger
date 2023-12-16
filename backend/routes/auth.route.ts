import express from 'express';

import verifyAuth from '../middleware/verifyAuth.middleware';
import AccountController from '../controllers/account.controller';

let authRouter = express.Router();
let accountController = new AccountController()

authRouter.post('/signin/', function(request, response, next){
  accountController.signIn(request, response)
});

authRouter.post('/signup/', function(request,response, next) {
  accountController.signUp(request, response, next)
});

authRouter.get('/test-public/' , function(request,response) {
  accountController.testPublicRequest(request, response)
});

authRouter.get('/test-private/', verifyAuth, function(request,response) {
  accountController.testPrivateRequest(request, response)
});


export default authRouter;