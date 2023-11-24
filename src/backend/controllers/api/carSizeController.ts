import { Request, Response } from 'express';
import CarSizeService from '../../../backend/service/carSizeService';

class CarSizeController {
  static getAll(req: Request, res: Response): void {
    CarSizeService.getAll()
      .then((sizes: any) => {
        res.status(200).json({
          code: 200,
          message: "OK",
          data: sizes
        });
      })
      .catch((error:any) => {
        console.error(error);
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        });
      });
  }

  static getByID(req: Request, res: Response): void {
    CarSizeService.get(Number(req.params.id))
      .then((size:any) => {
        res.status(200).json({
          code: 200,
          message: "OK",
          data: size
        });
      })
      .catch((error:any) => {
        console.error(error);
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        });
      });
  }
}

export default CarSizeController;
