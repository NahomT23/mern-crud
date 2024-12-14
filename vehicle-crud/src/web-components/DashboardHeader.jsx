import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const DashboardHeader = () => {

  const [totalVehicles, setTotalVehicles] = useState(0);
  const [soldVehicles, setSoldVehicles] = useState(0);
  const [pendingVehicles, setPendingVehicles] = useState(0);
  const [availableVehicles, setAvailableVehicles] = useState(0);


  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    axios
    .get("https://mern-crud-beta-nine.vercel.app/api/vehicles")
      .then((result) => {
        const vehicles = result.data;


        const total = vehicles.length;
        const sold = vehicles.filter((vehicle) => vehicle.status.trim().toLowerCase() === "sold").length;
        const pending = vehicles.filter((vehicle) => vehicle.status.trim().toLowerCase() === "pending").length;
        const available = vehicles.filter((vehicle) => vehicle.status.trim().toLowerCase() === "available").length;
        


        setTotalVehicles(total);
        setSoldVehicles(sold);
        setPendingVehicles(pending);
        setAvailableVehicles(available);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col bg-gray-900">
      <div className="p-4 grid gap-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 text-white border-gray-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp start={0} end={totalVehicles} duration={2.5} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 text-white border-gray-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sold Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp start={0} end={soldVehicles} duration={2.5} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 text-white border-gray-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp start={0} end={pendingVehicles} duration={2.5} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 text-white border-gray-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Available Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp start={0} end={availableVehicles} duration={2.5} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader
