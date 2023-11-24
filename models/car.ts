import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';

interface CarAttributes {
  size_id: number;
  name: string;
  price: number;
  photo: string;
  deleted: boolean;
  createdBy: string;
  updatedBy: string;
  deletedBy: string;
  deletedAt: Date;
}

class Car extends Model<CarAttributes> {
  public size_id!: number;
  public name!: string;
  public price!: number;
  public photo!: string;
  public deleted!: boolean;
  public createdBy!: string;
  public updatedBy!: string;
  public deletedBy!: string;
  public deletedAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any): void {
    Car.belongsTo(models.CarSize, { foreignKey: 'size_id', as: 'size' });
  }
}

Car.init(
  {
    size_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    photo: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
    deletedBy: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Car',
  }
);

export default Car;
