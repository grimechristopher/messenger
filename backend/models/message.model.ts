import { Model } from 'sequelize';

interface MessageAttributes {
  id: number,
  content: string,
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
