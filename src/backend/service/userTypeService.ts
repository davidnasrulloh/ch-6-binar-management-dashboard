import UserTypeRepository from "../repository/userTypeRepository";

class UserTypeService {
  static getAll(): Promise<any[]> {
    return UserTypeRepository.findAll();
  }

  static get(id: number): Promise<any | null> {
    return UserTypeRepository.find(id);
  }
}

export default UserTypeService;
