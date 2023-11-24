import CarSize from "../../../models/carsize";

class CarSizeRepository {
  static findAll() {
    return CarSize.findAll();
  }

  static find(id: number) {
    return CarSize.findByPk(id);
  }
}

export default CarSizeRepository;
