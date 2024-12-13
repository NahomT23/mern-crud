

import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["sold", "pending", "available"],
    },
  },
  {
    timestamps: true,
  }
);

const VehicleModel = mongoose.model("vehicle", VehicleSchema);

export default VehicleModel;
