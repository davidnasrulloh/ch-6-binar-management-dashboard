import UserType from "../../../models/usertype";

class UserTypeRepository {
  static findAll() {
    return UserType.findAll();
  }

  static find(id: number) {
    return UserType.findByPk(id);
  }
}

export default UserTypeRepository;
