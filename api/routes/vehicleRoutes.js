import express from "express";
import { createVehicle, getVehicles, updateVehicle, deleteVehicle, getVehicleById } from "../controllers/vehicleController.js";

const router = express.Router();

router.post("/", createVehicle);
router.get("/", getVehicles);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
