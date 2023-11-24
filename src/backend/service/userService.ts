import UserRepository from '../repository/userRepository';
import Randomize from '../../utilities/randomize';
import config from '../../../config/appconfig';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface RegisterResult {
  status: boolean;
  code: number;
  data: string | User;
}

interface AuthenticateResult {
  status: boolean;
  code: number;
  data: string | Token;
}

interface GetUserByTokenResult {
  status: boolean;
  code: number;
  data: string | User;
}

interface User {
  id?: string | number;
  usertype_id: string;
  fullname: string;
  email: string;
  password: string;
  status: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Token {
  status: boolean;
  code: number;
  data: string;
}

class UserService {
  static async register(
    userType: string | any,
    email: string,
    password: string,
    fullname: string,
    creator: string | null = null
  ): Promise<RegisterResult> {
    try {
      if (!userType || !email || !password || !fullname) {
        return {
          status: false,
          code: 400,
          data: 'Bad Request',
        };
      } else {
        if (await UserRepository.checkEmail(email)) {
          return {
            status: false,
            code: 400,
            data: 'Email already used',
          };
        } else {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          const user: User = {
            id: Randomize.randomID(),
            usertype_id: userType,
            fullname,
            email,
            password: hash,
            status: true,
            createdBy: creator ?? 'system',
            updatedBy: creator ?? 'system',
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          const result:any = await UserRepository.create(user);
          return {
            status: true,
            code: 200,
            data: result,
          };
        }
      }
    } catch (error) {
      throw error;
    }
  }

  static async authenticate(email: string, password: string): Promise<AuthenticateResult> {
    try {
      const user: any = await UserRepository.checkEmail(email);
      if (!user) {
        return {
          status: false,
          code: 400,
          data: 'Email or password is incorrect',
        };
      } else {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
          let payload = {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role_id: user.usertype_id,
          };
          const token = jwt.sign(payload, config.app.jwtSecret, {
            expiresIn: config.app.jwtExpire,
          });
          return {
            status: true,
            code: 200,
            data: token,
          };
        } else {
          return {
            status: false,
            code: 400,
            data: 'Email or password is incorrect',
          };
        }
      }
    } catch (error) {
      throw error;
    }
  }

  static async getUserByToken(token?: string): Promise<GetUserByTokenResult> {
    try {
      const decoded: any = jwt.decode(token || '');
      if (decoded) {
        const user: any = await UserRepository.find(decoded.id);
        if (!user) {
          return {
            status: false,
            code: 404,
            data: 'Account not found',
          };
        } else {
          return {
            status: true,
            code: 200,
            data: user,
          };
        }
      } else {
        return {
          status: false,
          code: 401,
          data: 'Invalid token',
        };
      }
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
