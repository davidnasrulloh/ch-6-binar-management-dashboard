import express from 'express';
import CarSizeController from '../controllers/api/carSizeController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CarSize APIs
 *   description: APIs to handle CarSize resources.
 */

/**
 * @swagger
 * /api/carsize/getAll:
 *   get:
 *     summary: get All carsize data
 *     tags: [CarSize APIs]
 *     description: Retrieve carsize data from the database
 *     responses:
 *       '200':
 *         description: Get All data from CarSizes
 */
router.get("/getAll", CarSizeController.getAll);

/**
 * @swagger
 * "/api/carsize/getById/{id}":
 *   get:
 *     summary: get carsize data by id 
 *     tags: [CarSize APIs]
 *     description: Retrieve carsize data by id from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the carsize to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Get data by from CarSizes
 */
router.get("/getById/:id", CarSizeController.getByID);

export default router;
