import { Model } from 'sequelize';

interface MessageAttributes {
  id?: number,
  content: string,
  senderId?: string, // foreign key
  conversationId?: string, // foreign key
}

module.exports = (sequelize: any, DataTypes: any) => {
class Message extends Model<MessageAttributes> implements MessageAttributes {
  public id!: number;
  public content!: string;

  static associate(models: any) {
    Message.belongsTo(models.Account, {
      foreignKey: 'senderId',
    });
    Message.belongsTo(models.Conversation, {
      foreignKey: 'conversationId',
    });
  }

  static findAllByConversationId(conversationId: string) {
    return Message.findAll({
      where: {
        conversationId: conversationId,
      },
      order: [['createdAt', 'ASC']],
    });
  }

  static async createMessage(conversationId: string, senderId: string, content: string) {
    const message = await Message.create({
      conversationId,
      senderId,
      content,
    });
    return message.toJSON();
  }

};

Message.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Message',
});
  Message.removeAttribute('sentAt');
  return Message;  
};
