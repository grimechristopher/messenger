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
    const conversationId = request.query.conversationId;
    const isUserInConversation = db.Conversation.isUserInConversation(conversationId, userId);

    if (!userId) {
      return response.status(400).json({ message: 'userId is required' });
    }

    if (!conversationId) {
      return response.status(400).json({ message: 'conversationId is required' });
    }

    if (!isUserInConversation) {
      console.log("Not in conversation")
      return response.status(401).json({ message: 'You are not in this conversation' });
    }

    const messages = await db.Message.findAllByConversationId(conversationId);
console.log(messages)
    return response.status(200).json(messages);
  }

  async createMessage(request: Request, response: Response) {
    const userId = request.body.user.id;
    const conversationId = request.body.conversationId;
    const isUserInConversation = db.Conversation.isUserInConversation(conversationId, userId);

    if (!userId) {
      return response.status(400).json({ message: 'userId is required' });
    }

    if (!conversationId) {
      return response.status(400).json({ message: 'conversationId is required' });
    }

    if (!isUserInConversation) {
      return response.status(401).json({ message: 'You are not in this conversation' });
    }

    const message = await db.Message.createMessage(conversationId, userId, request.body.message);
    return response.status(200).json(message);
  }

  
}

export default MessageController;