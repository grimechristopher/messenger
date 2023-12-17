// import sequelize from 'sequelize/types/sequelize';
import { Model, Op } from 'sequelize';

interface AccountAttributes {
  id: string,
  username: string,
  email: string,
  password: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Account extends Model<AccountAttributes> implements AccountAttributes {
    public id!: string;
    public username!: string;
    public email!: string;
    public password!: string;

    static associate(models: any) {
      Account.belongsToMany(models.Conversation, {
        through: 'AccountConversation',
      });
    }

    static async findByEmail(email: string) { 
      return await Account.findOne({ raw: true, where: { email } });
    }

    static async searchForAccounts(searchString: string, userId: string) {
      return await Account.findAll({
        attributes: ['id', 'username', 'email'],
        where: {
          [Op.or]: [
            { username: { [Op.iLike]: '%' + searchString + '%' } },
            { email: { [Op.iLike]: '%' + searchString + '%' } },
          ],
          [Op.not]: { id: userId}
        }
      });
    }
  };

  Account.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};