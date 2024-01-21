import { Request, Response, NextFunction, CookieOptions } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import db from '../models';
// import Account from '../models/account.model';

// interface AccountInterface {
//   username: string;
//   email: string;
//   password: string;
// } 
 
// // export default ;

class ConversationController {
  // Create a conversation
  async createConversation(request: Request, response: Response) {

    // Need id of 1 or more users that will be in the conversation
    const participantIds = request.body.participantIds;
    participantIds.push(request.body.user.id);

    let conversation = await db.Conversation.createConversation(participantIds);

    if (!conversation) {
      return response.status(400).send('Conversation needs 2 or more participants');
    }

    return response.status(200).json(conversation);
  }

  // Get list of users conversations
  async getConversations(request: Request, response: Response) {
    const userId = request.body.user.id;


    let conversations = await db.Account.findOne({
      where: {
        id: userId
      },
      include: [{
        model: db.Conversation,
        as: 'Conversations',
        include: [{
          model: db.Account,
          as: 'Accounts',
          attributes: ['id', 'username', 'email'],
          where: {
            id: {
              [db.Sequelize.Op.not]: userId
            }
          }
        }]
      }]
    });

    return response.status(200).json(conversations);
  }

  async getConversation(request: Request, response: Response) {
    const conversationId = request.params.id;
    const userId = request.body.user.id;

    let conversation = await db.Conversation.findOne({
      where: {
        id: conversationId
      },
      include: [{
        model: db.Account,
        as: 'Accounts',
        attributes: ['id', 'username', 'email'],
        where: {
          id: {
            [db.Sequelize.Op.not]: userId
          }
        }
      }]
    });

    return response.status(200).json(conversation);

  }
  
  
}

export default ConversationController;