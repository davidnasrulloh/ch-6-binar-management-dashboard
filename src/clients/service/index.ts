import axios from 'axios'
import cloudinary from '../cloudinary'
import upload from '../upload'
import { Request, Response } from 'express'
import { config } from "dotenv";
config();
const PORT = process.env.PORT || 8002;

export async function getListCarsApi(req: Request, res: Response): Promise<void> {
  try {
      const cars = await axios.get(`http://localhost:${PORT}/cars`);
      console.log(cars.data); // Untuk menampilkan data dari respons
      console.log("Berhasil");
      res.render('home', { cars: cars.data.data }); // Menggunakan res.render untuk merender tampilan dengan data yang diterima dari server
  } catch (error) {
      console.error(error);
      res.status(400).json("Error");
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

interface CarRequestBody {
  name: string;
  price: number;
  size: string;
  image: string;
}

export async function insertCarApi(req: Request, res: Response) {
  try {
    const fileBase64 = req?.file?.buffer.toString('base64');
    const file = `data:${req?.file?.mimetype};base64,${fileBase64}`;

    try {
      const result = await cloudinary.uploader.upload(file);
    
      const body = req.body as CarRequestBody;
      body.image = result.url;
      
      await axios.post(`http://localhost:${PORT}/cars`, body);
      return res.status(200).json({
        message: "Berhasil upload cars with image"
      }).redirect('/');
    } catch (err) {
      return res.status(500).json(err);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

export function handleAddCar(req: Request, res: Response) {
  res.render('add', {title:"Add New Car"});
}

export async function handleToEditCar(req: Request, res: Response){
    try {
        const id = req.params.id;
        const cars = await axios.get(`http://localhost:${PORT}/cars/${id}`)
        console.log(cars)
        res.render('edit', { car: cars.data.data })
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function updateCarApi(req: any, res: any){
  const fileBase64 = req?.file.buffer.toString("base64");
  const file = `data:${req?.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, async function (err, result:any) {
      if (!!err) {
          console.log(err);
          return res.status(400).json({
              message: "Gagal upload file!",
          });
      }

      const id = req.params.id;
      const body = req.body;
      body.image = result.url;

      try {
          const cars = await axios.put(`http://localhost:${PORT}/cars/${id}`, body);
          return res.redirect("/")
      } catch (err) {
          return res.status(500).json(err)
      }
  });
}

export async function deleteCarApi(req: Request, res: Response){
  try {
    const id = req.params.id;
    await axios.delete(`http://localhost:${PORT}/cars/${id}`);
    res.redirect("/")
  } catch (error) {
      res.status(500).json(error)
  }
}


