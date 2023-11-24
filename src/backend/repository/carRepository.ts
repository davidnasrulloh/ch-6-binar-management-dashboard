import Car from '../../../models/car'

class CarRepository {
  static findAllPartially(whereClause: any) {
    return Car.findAndCountAll(whereClause);
  }

  static find(id: number) {
    return Car.findByPk(id);
  }

  static create(dataObj: any) {
    return Car.create(dataObj);
  }

  static update(id: number, dataObj: any) {
    return Car.update(dataObj, {
      where: { id },
    } as any);
  }

  /**
   * Soft delete car
   * @param {number} id 
   * @param {string} deletor 
   * @returns {Promise.<Array.<number, number>>} Promise [affectedCount, affectedRows]
   */
  static delete(id: number, deletor: string) {
    return Car.update({
      deleted: true,
      deletedBy: deletor,
      deletedAt: new Date(),
    },
    { where: { id } as any });
  }
}

export default CarRepository;
