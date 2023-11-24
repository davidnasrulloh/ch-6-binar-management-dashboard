import { Request, Response } from 'express';
import UserTypeService from '../../../backend/service/userTypeService';

class UserTypeController {
  static getAll(req: Request, res: Response): void {
    UserTypeService.getAll()
      .then((types) => {
        res.status(200).json({
          code: 200,
          message: "OK",
          data: types
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        });
      });
  }

  static getByID(req: Request, res: Response): void {
    UserTypeService.get(Number(req.params.id))
      .then((type) => {
        res.status(200).json({
          code: 200,
          message: "OK",
          data: type
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        });
      });
  }
}

export default UserTypeController;
