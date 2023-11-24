import { Request, Response } from 'express';
import CarService from '../../../backend/service/carService';

class CarController {
  static getAll(req: Request, res: Response): void {
    console.log(req.params);
    let { filter, offset, limit } = req.params;
    CarService.getList(filter, Number(offset), Number(limit))
      .then(({ data, total, offset, limit }:any) => {
        if (!total)
          res.status(404).json({ code: 404, message: "No Data" });
        else
          res.status(200).json({
            code: 200,
            message: "OK",
            data: {
              cars: data
            },
            meta: {
              total: total,
              offset: offset,
              limit: limit
            }
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

  static getCarByID(req: Request, res: Response): void {
    CarService.get(Number(req.params.id))
      .then((result: any) => {
        res.status(200).json({
          code: 200,
          message: "OK",
          data: result,
        });
      })
      .catch((error: any) => {
        console.log(error);
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        })
      });
  }

  static add(req: Request, res: Response): void {
    CarService.create(req.body)
      .then((result) => {
        res.status(200).json({
          code: 200,
          message: "Successfully created",
          data: result,
        });
      })
      .catch((err) => {
        res.status(422).json({
          code: 422,
          message: err.message,
        });
      });
  }

  static edit(req: Request, res: Response): void {
    CarService.update(req.body)
      .then((result) => {
        res.status(200).json({
          code: 200,
          message: "Successfully updated",
          data: result,
        });
      })
      .catch((err) => {
        res.status(422).json({
          code: 422,
          message: err.message,
        });
      });
  }

  static delete(req: Request, res: Response): void {
    CarService.delete(req.body)
      .then(() => {
        res.status(200).json({
          code: 200,
          message: "Successfully deleted",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  }
}

export default CarController;
