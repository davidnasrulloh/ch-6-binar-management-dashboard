import { Request, Response, NextFunction } from 'express';
import config from '../../config/appconfig'
import UserEnum from './userenum';
import jwt from 'jsonwebtoken';

function verifyToken(req: Request, res: Response): any {
  const header = req.header('Authorization');
  if (!header) throw res.sendStatus(401); // Unauthorized
  const token = header.split(' ')[1];
  if (!token) return res.sendStatus(403); // Forbidden
  return jwt.verify(token, config.app.jwtSecret);
}

export default {
  all(req: Request, res: Response, next: NextFunction): void {
    verifyToken(req, res);
    next();
  },

  admins(req: Request, res: Response, next: NextFunction): void {
    const payload = verifyToken(req, res);
    if (payload.role_id === UserEnum.admin || payload.role_id === UserEnum.superAdmin) next();
    else res.sendStatus(403);
  },

  superAdmin(req: Request, res: Response, next: NextFunction): void {
    const payload = verifyToken(req, res);
    if (payload.role_id !== UserEnum.superAdmin) {
        res.sendStatus(403);
        return;
    }
    next();
  },

  admin(req: Request, res: Response, next: NextFunction): void {
    const payload = verifyToken(req, res);
    if (payload.role_id !== UserEnum.admin) {
        res.sendStatus(403);
        return
    }
    next();
  },


  member(req: Request, res: Response, next: NextFunction): void {
    const payload = verifyToken(req, res);
    if (payload.role_id !== UserEnum.member) {
        res.sendStatus(403);
        return
    }
    next();
  },
};
