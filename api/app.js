import express from "express";
import cors from "cors";
import vehicleRoutes from "./routes/vehicleRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/vehicles", vehicleRoutes);

export default app;
