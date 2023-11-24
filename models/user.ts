import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize'; 

interface UserAttributes {
  usertype_id: number;
  fullname: string;
  email: string;
  password: string;
  status: boolean;
  createdBy: string;
  updatedBy: string;
  deletedBy: string;
  deletedAt: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public usertype_id!: number;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public status!: boolean;
  public createdBy!: string;
  public updatedBy!: string;
  public deletedBy!: string;
  public deletedAt!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly usertype?: any;

  static associate(models: any): void {
    User.belongsTo(models.UserType, { foreignKey: 'usertype_id', as: 'usertype' });
  }
}

User.init({
  usertype_id: DataTypes.INTEGER,
  fullname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  status: DataTypes.BOOLEAN,
  createdBy: DataTypes.STRING,
  updatedBy: DataTypes.STRING,
  deletedBy: DataTypes.STRING,
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'User',
});

export default User;
