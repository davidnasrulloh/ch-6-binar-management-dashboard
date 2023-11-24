// File: models/carSize.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize'; // Adjust the path accordingly

interface CarSizeAttributes {
  name: string;
}

class CarSize extends Model<CarSizeAttributes> {
  public name!: string;

  static associate(models: any) {
    CarSize.hasMany(models.Car, { foreignKey: 'size_id', as: 'cars' });
  }
}

CarSize.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'CarSize',
  }
);

export default CarSize;
