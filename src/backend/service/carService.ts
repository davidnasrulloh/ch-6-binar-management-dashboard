import Resizer from '../../utilities/Resizer';
import CarRepository from '../repository/carRepository'; 
import Randomize from '../../utilities/randomize';

interface CarServiceCreateParams {
  size_id: number;
  name: string;
  price: number;
  photo: string;
  createdBy?: string;
}

interface CarServiceUpdateParams {
  id: string | number | any;
  size_id: number;
  name: string;
  price: number;
  photo: string;
  updatedBy?: string;
}

interface CarServiceDeleteParams {
  id: string | number | any;
  deletedBy: string;
}

class CarService {
  static async getList(filter: any, offset: number = 0, limit: number = 15) {
    try {
      let whereClause: any = {
        where: {
          deleted: false
        },
        offset: offset,
        limit: limit
      };

      if (filter) {
        whereClause.where.size_id = filter;
        console.log(whereClause);
      }

      let { count, rows } = await CarRepository.findAllPartially(whereClause);

      return {
        data: rows,
        total: count,
        offset: offset,
        limit: limit
      };
    } catch (error) {
      throw error;
    }
  }

  static get(id: number) {
    try {
      return CarRepository.find(id);
    } catch (error) {
      throw error;
    }
  }

  static async create({ size_id, name, price, photo, createdBy }: CarServiceCreateParams) {
    try {
      if (!size_id || !name || !price) {
        return {
          status: false,
          status_code: 400,
          message: "Invalid input. Please provide size_id, name, and price.",
          data: {
            created_car: null,
          },
        };
      }

      const createdCar = await CarRepository.create({
        id: Randomize.randomID(),
        size_id,
        name,
        price,
        photo,
        createdBy: createdBy ?? "System",
        createdAt: new Date(),
        updatedBy: createdBy ?? "System",
        updatedAt: new Date(),
        deleted: false,
      });

      return {
        status: true,
        status_code: 201,
        message: "Car created successfully",
        data: {
          created_car: createdCar,
        },
      };
    } catch (err:any) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          created_car: null,
        },
      };
    }
  }

  static async update({ id, size_id, name, price, photo, updatedBy }: CarServiceUpdateParams) {
    try {
      if (!id || !size_id || !name || !price) {
        return {
          status: false,
          status_code: 400,
          message: "Invalid input. Please provide id, size_id, name, and price.",
          data: {
            updated_car: null,
          },
        };
      }

      const updatedCar = await CarRepository.update(id, {
        size_id,
        name,
        price,
        updatedBy: updatedBy ?? "System",
        updatedAt: new Date(),
      });

      return {
        status: true,
        status_code: 201,
        message: "Car updated successfully",
        data: {
          updated_car: updatedCar,
        },
      };
    } catch (err:any) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          updated_car: null,
        },
      };
    }
  }

  static async delete({ id, deletedBy }: CarServiceDeleteParams) {
    try {
      const deletedCar = await CarRepository.delete(id, deletedBy);

      return {
        status: true,
        status_code: 200,
        message: "Car deleted successfully",
        data: {
          deleted_car: deletedCar,
        },
      };
    } catch (err: any) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          deleted_car: null,
        },
      };
    }
  }
}

export default CarService;
