import axios from 'axios'
import cloudinary from '../cloudinary'
import upload from '../upload'
import { Request, Response } from 'express'
import { config } from "dotenv";
config();
const PORT = process.env.PORT_FRONTEND || 8002;

export async function getListCarsApi(req:Request, res: Response){
    try {
        const cars = await axios.get(`http://localhost:${PORT}/cars`);
        res.render('index', cars.data)
    } catch (error) {
        res.status(400).json("Error")
    }
}

export async function getListCarsBySizeApi(req: Request, res: Response){
    try {
        const query = req.query.size as string;
        const cars = await axios.get(`http://localhost:${PORT}/cars-size?size=${query}`);
        console.log("cars ",cars.data);
        res.render('index'), cars.data;
      } catch (error) {
        res.status(400).json(error)
      }
}

export async function insertNewNameCarApi(req: Request, res: Response){
    res.render('add-car', {title: "Add New Car"})
}

export async function insertCarApi(req: Request, res: Response) {
    try {
      const fileBase64 = req?.file?.buffer.toString('base64');
      const file = `data:${req?.file?.mimetype};base64,${fileBase64}`;
  
      cloudinary.uploader.upload(file, async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            message: 'Gagal upload file!',
          });
        }
  
        const body = req.body as { [key: string]: string };
        body.image = result!.url;
  
        try {
          const cars = await axios.post('http://localhost:8001/cars', body);
          return res.status(200).json({
            message: "Berhasil upload gambar"
          }).redirect('/');
        } catch (err) {
          return res.status(500).json(err);
        }
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

export async function handleToEditCar(req: Request, res: Response){
    try {
        const id = req.params.id;
        const cars = await axios.get(`http://localhost:${PORT}/cars/${id}`)
        res.render('edit', cars.data)
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function updateCarApi(req: Request, res: Response){
    try {
        
    } catch (error) {
        
    }
}

export async function deleteCarApi(req: Request, res: Response){
    try {
        
    } catch (error) {
        
    }
}


