import express from "express";
import path from "path";
import { config } from "dotenv";
import { deleteCarApi, getListCarsApi, getListCarsBySizeApi, handleAddCar, handleToEditCar, insertCarApi, updateCarApi } from "./service";

config();

const PORT = process.env.PORT_FRONTEND || 8002;
const app = express();
import upload from "./upload";

// Set the views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Frontend routes
app.get("/", getListCarsApi);
app.get("/cars-size", getListCarsBySizeApi);
app.get("/add-car", handleAddCar); // Change to GET since you're rendering a view
app.post("/add-car", upload.single("image"), insertCarApi);
app.get("/edit-car/:id", handleToEditCar);
app.post("/update-car/:id", upload.single("image"), updateCarApi);
app.get("/delete-car/:id", deleteCarApi);

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});
