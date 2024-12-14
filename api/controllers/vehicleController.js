import VehicleModel from "../models/Vehicles.js";


export const createVehicle = async (req, res) => {
  try {
    const vehicle = await VehicleModel.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await VehicleModel.find({});
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await VehicleModel.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
};

export const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedVehicle = await VehicleModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedVehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.json({ message: "Vehicle updated successfully", updatedVehicle });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
};

export const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVehicle = await VehicleModel.findByIdAndDelete(id);
        if (!deletedVehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.json({ message: "Vehicle deleted successfully", deletedVehicle });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
};


