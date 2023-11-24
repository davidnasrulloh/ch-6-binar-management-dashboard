import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../config/sequelize'; 


interface UserTypeAttributes {
  name: string;
}

class UserType extends Model<UserTypeAttributes> implements UserTypeAttributes {
  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly users?: any[];

  static associate(models: any): void {
    UserType.hasMany(models.User, { foreignKey: 'usertype_id', as: 'users' });
  }
}

UserType.init({
  name: DataTypes.STRING,
}, {
  sequelize, // Assuming you have an instance of Sequelize already created
  modelName: 'UserType',
});

export default UserType;
