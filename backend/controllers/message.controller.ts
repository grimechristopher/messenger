import { Request, Response, NextFunction, CookieOptions } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import db from '../models';


class MessageController {
  // Create a conversation
  async getConversationMessages(request: Request, response: Response) {
    // Get userid check if user is in conversation

    // Get the messages

    const userId = request.body.user.id;
    const conversationId = request.params.conversationId;
    const isUserInConversation = db.Conversation.isUserInConversation(conversationId, userId);


    return response.status(200).json(messages);
  }

  
}

export default MessageController;