import express from 'express';
import UserTypeController from '../controllers/api/userTypeController';

const router = express.Router();

// REST API ROUTES

/**
 * @swagger
 * tags:
 *   name: UserType APIs
 *   description: APIs to handle UserType resources.
 */

/**
 * @swagger
 * /api/usertype/getAll:
 *   get:
 *     summary: get All usertype data
 *     tags: [UserType APIs]
 *     description: Retrieve usertype data from the database
 *     responses:
 *       '200':
 *         description: Get All data from UserTypes
 */
router.get("/getAll", UserTypeController.getAll);

/**
 * @swagger
 * "/api/usertype/getById/{id}":
 *   get:
 *     summary: get usertype data by id
 *     tags: [UserType APIs]
 *     description: Retrieve usertype data by id from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the usertype to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Get data from UserTypes
 */
router.get("/getById/:id", UserTypeController.getByID);

export default router;
