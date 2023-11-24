// import express from "express";
// import { handleCreateCar, handleGetListCars, handleGetCar, handleUpdateCar, handleDeleteCar, handleGetListCarBySize } from "./handler";
// import path from "path";
// import { config } from "dotenv";
// config();
// const PORT = process.env.PORT || 8001;
// const app = express();

// // Pasang JSON Parser middleware
// app.use(express.json());
// // app.use(express.static(path.join(__dirname, '../../public')));

// // Routing app
// app.post("/cars", handleCreateCar);
// app.get("/cars", handleGetListCars);
// app.get("/cars/:id", handleGetCar);
// app.put("/cars/:id", handleUpdateCar);
// app.delete("/cars/:id", handleDeleteCar);
// app.get("/cars-size/:size", handleGetListCarBySize);

// app.listen(PORT, () => {
//     console.log(`app running in http://localhost:${PORT}`);
// });


// src/index.ts
import Express from "express";
import BodyParser from "body-parser";
import cors from "cors";
import config from "../../../config/appconfig";
import carRoutes from "../../backend/routes/carRoutes";
import carSizeRoutes from "../../backend/routes/carSizeRoutes";
import userTypeRoutes from "../../backend/routes/userTypeRoutes";
import userRoutes from "../../backend/routes/userRoutes";

const swaggerUi = require('swagger-ui-express') as any;

const swaggerJsDoc = require('swagger-jsdoc') as any;
const app = Express();

app.set("config", config);
app.set("view engine", "ejs");
app.use(Express.static(__dirname + "/../public"));
app.use(BodyParser.json({ limit: "50mb" }));
app.use(BodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      title: 'Car Management API Docs',
      description: 'API Service Documentation for Car Management App',
      version: "1.0.0"
    },
    servers: [
      {
        url: `http://${process.env.SERVER || config.app.server}:${process.env.PORT || config.app.port}`,
        description: 'Application Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          name: "Authorization",
          in: "header",
          bearerFormat: "JWT"
        },
      }
    },
  },
  apis: [
    './router/userRoutes.ts',
    './router/carRoutes.ts',
    './router/carSizeRoutes.ts',
    './router/userTypeRoutes.ts',
  ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.set("port", config.app.port);
app.use(carRoutes);
app.use(carSizeRoutes);
app.use(userRoutes);
app.use(userTypeRoutes);

app.listen(process.env.PORT || config.app.port, () => {
  console.log(
    `Service online at http://${process.env.SERVER || config.app.server}:${process.env.PORT || config.app.port}`
  );
  console.log(
    `Swagger docs ui at http://${process.env.SERVER || config.app.server}:${process.env.PORT || config.app.port}/api-docs`
  );
});
