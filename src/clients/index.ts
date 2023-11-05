import express from "express";
import path from "path";
import { config } from "dotenv";
config();
const PORT = process.env.PORT_FRONTEND || 8002;
const app = express();

// Pasang JSON Parser middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routing frontend
// app.post("/cars", handleCreateCar);
// app.get("/cars", handleGetListCars);
// app.get("/cars/:id", handleGetCar);
// app.put("/cars/:id", handleUpdateCar);
// app.delete("/cars/:id", handleDeleteCar);
// app.get("/cars-by-size", handleGetListCarBySize);

app.listen(PORT, () => {
    console.log(`app running in http://localhost:${PORT}`);
});