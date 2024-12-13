import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import VehicleModel from "./models/Vehicles.js"
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000 
const app = express()
app.use(cors())
app.use(express.json())


// const uri = "mongodb+srv://tnahom214:P6w2dm7i6uwlRzMd@vehicle-crud.vtnof.mongodb.net/";
const uri = process.env.MONGO_URI
mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });


  app.post("/createVehicle", (req, res) => {
    VehicleModel.create(req.body).then(vehicle => res.json(vehicle)).catch(err => res.json(err))
  })

  app.get("/", (req, res) => {
    VehicleModel.find({})
    .then(vehicle => res.json(vehicle))
    .catch(err => res.json(err))
  })

  app.get("/getVehicle/:id", (req, res) => {
    const id = req.params.id;
    VehicleModel.findById({_id:id})
    .then(vehicle => res.json(vehicle))
    .catch(err => res.json(err))
  })

  app.put("/updateVehicle/:id", (req, res) => {
    const id = req.params.id;
    VehicleModel.findByIdAndUpdate(id, req.body, { new: true })
      .then((vehicle) => res.json(vehicle))
      .catch((err) => res.json(err));
  });
  

  app.delete("/deleteVehicle/:id", (req, res) => {
    const id = req.params.id
    VehicleModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch((err) => res.json(err));
  })
app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))