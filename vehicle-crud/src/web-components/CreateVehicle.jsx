import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; 

const CreateVehicle = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("available");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("https://mern-crud-blue.vercel.app/api/vehicles", {
        name: vehicleName,
        status: vehicleStatus,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="p-4 bg-gray-800 shadow-md flex items-center">
        <Button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Dashboard
        </Button>
      </div>

      <div className="flex items-center justify-center mt-10">
        <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4 text-gray-100">Create Vehicle</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="vehicleName" className="text-sm font-medium text-gray-300">
                Vehicle Name
              </Label>
              <Input
                id="vehicleName"
                type="text"
                placeholder="Enter vehicle name"
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                className="p-2 bg-gray-900 border border-gray-600 text-gray-100 rounded focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="vehicleStatus" className="text-sm font-medium text-gray-300">
                Vehicle Status
              </Label>
              <select
                id="vehicleStatus"
                value={vehicleStatus}
                onChange={(e) => setVehicleStatus(e.target.value)}
                className="p-2 bg-gray-900 border border-gray-600 text-gray-100 rounded focus:outline-none focus:border-blue-600"
              >
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading} 
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Create Vehicle"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVehicle;
