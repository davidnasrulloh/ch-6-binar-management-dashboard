import dotenv from 'dotenv';

dotenv.config();

export default {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
    appName: process.env.APP_NAME || 'car-management-api',
    env: process.env.NODE_ENV || 'development',
    server: process.env.SERVER || 'localhost',
    jwtSecret: process.env.SECRET_KEY || 'secret',
    jwtExpire: process.env.JWT_EXPIRE || '12h',
  },
};
