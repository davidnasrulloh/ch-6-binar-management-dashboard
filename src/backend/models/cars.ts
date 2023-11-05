import { DataTypes, Model, Sequelize } from 'sequelize';
import { ICars } from '@/types';

export class Cars extends Model<ICars> {
  static associate(models: any) {
    // Tambahkan asosiasi model jika diperlukan
  }
}

export function initCars(sequelize: Sequelize) {
  Cars.init(
    { 
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      size: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Car',
    }
  );

  return Cars;
}
