import express from 'express';

import verifyAuth from '../middleware/verifyAuth.middleware';
import MessageController from '../controllers/message.controller';

let messageRouter = express.Router();
let messageController = new MessageController()

messageRouter.get('/all/', verifyAuth, function(request,response) {
  messageController.getConversationMessages(request, response)
});

messageRouter.post('/create/', verifyAuth, function(request,response) {
  messageController.createMessage(request, response)
});

export default messageRouter;