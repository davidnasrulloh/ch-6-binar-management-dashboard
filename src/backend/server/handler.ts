import { Request, Response } from 'express';
import express from 'express';
import database from '../config/database';

const app = express();

app.use(express.json());

interface Car {
  car_id: number;
  name: string;
  price: number;
  size: string;
  image: string;
}

export async function handleCreateCar(req: Request, res: Response): Promise<void> {
    const data = req.body as Car;
    try {
        const insertedData = await database('cars').insert(data).returning('*');
        res.status(201).json({
            message: 'Create success!',
            data: insertedData[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}

export async function handleGetListCars(req: Request, res: Response): Promise<void> {
    try {
        const data = await database.select('*').from('cars');
        
        res.status(200).json({
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        message: 'Internal Server Error',
        });
    }
}

export async function handleGetCar(req: Request, res: Response): Promise<void> {
    const car_id = parseInt(req.params.id, 10);
    try {
        const data = await database.select('*').from('cars').where('id', '=', car_id).first();
        if (data) {
            res.status(200).json({
            data,
            message: "success"
            });
        } else {
            res.status(404).json({
            message: 'Car not found',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}

export async function handleUpdateCar(req: Request, res: Response): Promise<void> {
    const car_id = parseInt(req.params.id, 10);
    const data = req.body as Car;
  
    try {
        const updatedData = await database('cars')
            .where('car_id', '=', car_id)
            .update(data)
            .returning('*');

        if (updatedData.length > 0) {
            res.status(200).json({
                message: 'Update success!',
                data: updatedData[0],
            });
        } else {
                res.status(404).json({
                message: 'Car not found',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}

export async function handleDeleteCar(req: Request, res: Response): Promise<void> {
    const car_id = parseInt(req.params.id, 10);

    try {
        const deletedData = await database('cars')
            .where('car_id', '=', car_id)
            .del()
            .returning('*');
    
        if (deletedData.length > 0) {
            res.status(200).json({
            message: 'Delete success!',
            data: deletedData[0],
            });
        } else {
            res.status(404).json({
            message: 'Car not found',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}

export async function handleGetListCarBySize(req: Request, res: Response): Promise<void> {
    try {
        const size = req.params.size as string;
        const data = await database.select('*').from('cars').where('size', '=', size);
        
        res.status(200).json({
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}
