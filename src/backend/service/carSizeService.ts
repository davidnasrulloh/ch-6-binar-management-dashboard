import CarSizeRepository from "../repository/carSizeRepository";

class CarSizeService {
  static getAll() {
    return CarSizeRepository.findAll();
  }

  static get(id: number) {
    return CarSizeRepository.find(id);
  }
}

export default CarSizeService;
