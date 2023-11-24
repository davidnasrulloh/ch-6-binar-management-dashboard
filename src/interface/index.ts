export interface ICars {
    id?: number;
    name: string;
    price: number;
    size: string;
    image: string;
}

import { Sequelize } from 'sequelize';

interface DbInterface {
  sequelize: Sequelize;
  Sequelize: any; 
}

export { DbInterface };