import User from "../../../models/user"; 

interface UserAttributes {
  id?: number;
  email: string;
  status: boolean;
}

class UserRepository {
  static findAllPartially(whereClause: any) {
    return User.findAndCountAll(whereClause);
  }

  static find(id: number) {
    return User.findByPk(id);
  }

  static checkEmail(email: string) {
    return User.findOne({ where: { email, status: true } });
  }

  static create(user: any) {
    return User.create(user);
  }

  static update(id: number, user: UserAttributes) {
    return User.update(user, { where: { id } as any });
  }

  /**
   * Soft Delete user
   * @param {number} id
   * @param {string} deletor
   * @returns {Promise.<Array.<affectedCount, affectedRows>>} Promise [affectedCount, affectedRows]
   */
  static delete(id: number, deletor: string) {
    return User.update(
      {
        status: false,
        deletedBy: deletor,
        deletedAt: new Date(),
      },
      { where: { id } as any }
    );
  }
}

export default UserRepository;
