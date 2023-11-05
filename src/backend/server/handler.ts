import { Request, Response } from 'express';
import { Cars } from '../models/cars';
import express from 'express';
const app = express();

app.use(express.json());

export function handleCreateCar(req: Request, res: Response): void {
    const body = req.body;
    Cars.create(body)
        .then((car: Cars) => { // Ganti ICars menjadi Cars
            res.status(201).json({ car });
        })
        .catch((err: Error) => {
            res.status(422).json(`Gagal create car: ${err.message}`);
            throw new Error();
        });
}

export function handleGetListCars(req: Request, res: Response): void {
    Cars.findAll()
        .then((cars: Cars[]) => {
            res.status(200).json({ cars });
        })
        .catch((err: Error) =>{
            res.status(422).json(`Cars tidak ditemukan: ${err.message}`)
        });
}

export function handleGetCar(req: Request, res: Response): void {
    const idParams = req.params.id;

    Cars.findOne({
        where: { id: idParams }
    })
        .then((car: Cars | null) => {
            res.status(200).json({ car });
        })
        .catch((err: Error) => {
            res.status(422).json(`Cars tidak ditemukan: ${err.message}`);
        });
}

export function handleUpdateCar(req: Request, res: Response): void {
    const body = req.body;
    const idParams = req.params.id;

    Cars.update(body, {
        where: { id: idParams }
    })
        .then(() => {
            res.status(200).json({ message: 'Delete success' });
        })
        .catch((err: Error) => {
            res.status(422).json(`Gagal update car: ${err.message}`);
        });
}

export function handleDeleteCar(req: Request, res: Response): void {
    Cars.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.status(200).json("Delete success");
    })
    .catch((err: Error) => {
        res.status(422).json(`Gagal delete car: ${err.message}`);
    });
}

export function handleGetListCarBySize(req: Request, res: Response): void {
    const query = req.query.size as string;
    Cars.findAll({
        where: {
            size: query
        }
    })
        .then((cars: Cars[]) => {
            res.status(200).json({ cars });
        })
        .catch((err: Error) => {
            res.status(422).json(`Cars tidak ditemukan: ${err.message}`);
        });
}
