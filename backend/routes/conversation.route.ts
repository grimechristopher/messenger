import express from 'express';

import verifyAuth from '../middleware/verifyAuth.middleware';
import ConversationController from '../controllers/conversation.controller';

let conversationRouter = express.Router();
let conversationController = new ConversationController()

conversationRouter.get('/all/', verifyAuth, function(request,response) {
  conversationController.getConversations(request, response)
});

conversationRouter.post('/create/', verifyAuth, function(request,response) {
  conversationController.createConversation(request, response)
});


export default conversationRouter;