import { Model } from 'sequelize';

interface ConversationAttributes {
  id?: string,
  title?: string, // Optional and dont need to specify
}

module.exports = (sequelize: any, DataTypes: any) => {
class Conversation extends Model<ConversationAttributes> implements ConversationAttributes {
  public id!: string;
  public title!: string;
  // Sequelize magic methods
  public addAccounts!: Function;
  public hasAccount!: Function;

  static associate(models: any) {
    Conversation.belongsToMany(models.Account, {
      through: 'AccountConversation',
      onDelete: 'CASCADE',
    });
  }

  static async createConversation(accountIds: Array<string>) { 
    // Check if the conversation with the same participants already exists
    const accounts = await sequelize.models.Account.findAll({
      where: {
        id: accountIds
      }
    })

    if (accounts.length < 2) {
      return null;
    }

    const existingConversation = await Conversation.findOne({
      include: [{
        model: sequelize.models.Account,
        where: {
          id: accountIds
        }
      }]
    });

    if (existingConversation) {
      return existingConversation.toJSON();
    }

    // Create the conversation
    const conversation = await Conversation.create({});
    return await conversation.addAccounts(accounts);
  }

  static async isUserInConversation(conversationId: string, userId: string) {
    // check if user is in conversation
    const conversation = await Conversation.findOne({ where: { id: conversationId } });
    // const account = await sequelize.models.Account.findOne({ where: { id: userId } });
    if (!conversation) {
      return false;
    }
    return conversation.hasAccount(userId);
  }
};

Conversation.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Conversation',
});
  return Conversation;  
};