import express from 'express';

const router = express.Router();

// Define route modules here:
router.use("/api/car", require("./carRoutes"));
router.use("/api/user", require("./userRoutes"));
router.use("/api/usertype", require("./userTypeRoutes"));
router.use("/api/carsize", require("./carSizeRoutes"));
// End route

export default router;
