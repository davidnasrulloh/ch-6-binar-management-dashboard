import express from 'express';
import authorize from '../../utilities/authorize';
import UserController from '../controllers/api/userController';
import AuthController from '../controllers/auth/authController';

const router = express.Router();

// REST API ROUTES
/**
 * @swagger
 * tags:
 *   name: User APIs
 *   description: APIs to handle user resources.
 */

// Public routes:
/**
 * @swagger
 * /api/user/regist:
 *   post:
 *     summary: member user registration
 *     tags: [User APIs]
 *     description: Endpoint for member user registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullname:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - fullname
 *     responses:
 *      '200':
 *         description: Account Successfully Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *                 data:
 *                   type: object
 *                   description: User data.
 *               example:
 *                 code: 200
 *                 message: Account Successfully Created
 *      '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 500
 *                 message: Internal Server Error
 *      '400':
 *         description: Bad Request / Email already used
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 400
 *                 message: Bad Request / Email already used
 */
router.post('/regist', AuthController.regist);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: All user login
 *     tags: [User APIs]
 *     description: Endpoint for user login (Super Admin, Admin, and Member)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *      '200':
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *                 data:
 *                   type: string
 *                   description: User token.
 *               example:
 *                 code: 200
 *                 message: Login successfully
 *                 data: "User Token Hash"
 *      '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 500
 *                 message: Internal Server Error
 *      '400':
 *         description: Email or password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 400
 *                 message: Email or password is incorrect
 */
router.post('/login', AuthController.login);

// Authorized routes:
/**
 * @swagger
 * /api/user/logout:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get current user
 *     tags: [User APIs]
 *     description: Endpoint to get data of the currently logged-in user
 *     responses:
 *       '200':
 *          description: Logout Success
 *          content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 200
 *                 message: Logout Success
 *       '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 500
 *                 message: Internal Server Error
 *       '401':
 *          description: Invalid Token
 *          content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 401
 *                 message: Invalid Token
 */
router.get('/logout', authorize.all, AuthController.logout);

/**
 * @swagger
 * /api/user/current:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get current user
 *     tags: [User APIs]
 *     description: Endpoint to get data of the currently logged-in user
 *     responses:
 *       '200':
 *          description: Logout Success
 *          content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 200
 *                 message: Logout Success
 *       '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 500
 *                 message: Internal Server Error
 *       '401':
 *          description: Invalid Token
 *          content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 401
 *                 message: Invalid Token
 */
router.get('/current', UserController.getUser);

/**
 * @swagger
 * /api/user/addAdmin:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add new admin
 *     tags: [User APIs]
 *     description: Endpoint to add a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullname:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - fullname
 *     responses:
 *      '200':
 *         description: Account Successfully Created
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *                 data:
 *                   type: string
 *                   description: User Data.
 *               example:
 *                 code: 200
 *                 message: Account Successfully Created
 *      '500':
 *         description: Internal Server Error
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 500
 *                 message: Internal Server Error
 *      '400':
 *         description: Bad Request / Email already used
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *               example:
 *                 code: 400
 *                 message: Bad Request / Email already used
 */
router.post('/addAdmin', authorize.superAdmin, AuthController.registAdmin);

export default router;
