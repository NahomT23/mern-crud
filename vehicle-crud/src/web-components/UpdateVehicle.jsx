import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; 

const UpdateVehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [vehicleName, setVehicleName] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://mern-crud-beta-nine.vercel.app/api/vehicles/${id}`)
      .then((result) => {
        setVehicleName(result.data.name);
        setVehicleStatus(result.data.status);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .put(`https://mern-crud-beta-nine.vercel.app/api/vehicles/${id}`, {
        name: vehicleName,
        status: vehicleStatus,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error updating vehicle:", err);
      })
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
        <div className="p-6 w-full max-w-lg bg-gray-800 rounded-md shadow-md">
          <h1 className="text-lg font-semibold text-gray-100 mb-4">Update Vehicle</h1>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="vehicleName" className="text-sm font-medium text-gray-300">
                Vehicle Name
              </Label>
              <Input
                id="vehicleName"
                type="text"
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
                "Update Vehicle"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateVehicle;
