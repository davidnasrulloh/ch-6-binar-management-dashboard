import { Request, Response } from 'express';
import UserService from '../../../backend/service/userService'; 

class AuthController {
  // Member regist
  static regist(req: Request, res: Response): void {
    UserService
      .register(3, req.body.email, req.body.password, req.body.fullname, req.body.email)
      .then((result) => {
        if (result.status) {
          res.status(result.code).json({
            code: result.code,
            message: "Account successfully created",
            data: result.data,
          });
        } else {
          res.status(result.code).json({
            code: result.code,
            message: result.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          code: 500,
          message: "Internal server error",
        });
      });
  }

  // Admin regist
  static registAdmin(req: Request, res: Response): void {
    UserService
      .register(2, req.body.email, req.body.password, req.body.fullname, req.body.email)
      .then((result) => {
        if (result.status) {
          res.status(result.code).json({
            code: result.code,
            message: "Account successfully created",
            data: result.data,
          });
        } else {
          res.status(result.code).json({
            code: result.code,
            message: result.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          code: 500,
          message: "Internal server error",
        });
      });
  }

  // Users login
  static login(req: Request, res: Response): void {
    console.log(req.body);
    UserService
      .authenticate(req.body.email, req.body.password)
      .then((result) => {
        if (result.status) {
          res.status(result.code).json({
            code: result.code,
            message: "Login successfully",
            data: result.data,
          });
        } else {
          res.status(result.code).json({
            code: result.code,
            message: result.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          code: 500,
          message: "Internal Server Error",
        });
      });
  }

  // Users logout
  static logout(req: Request, res: Response): void {
    const authorizationHeader = req.headers['authorization'] as string | undefined;

    UserService
      .getUserByToken(authorizationHeader?.split(" ")[1])
      .then((result) => {
        if (result.status) {
          res.status(result.code).json({
            code: result.code,
            message: "Logout Success",
          });
        } else {
          res.status(result.code).json({
            code: result.code,
            message: result.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          code: 500,
          message: "Internal Server Error",
        });
      });
  }
  
}

export default AuthController;
