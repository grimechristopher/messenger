import { Model } from 'sequelize';

interface ConversationAttributes {
  id: number,
  title: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
class Conversation extends Model<ConversationAttributes> implements ConversationAttributes {
  public id!: number;
  public title!: string;

  static associate(models: any) {
    Conversation.belongsToMany(models.Account, {
      through: 'AccountConversation',
    });
  }
};

Conversation.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Conversation',
});
  return Conversation;  
};
