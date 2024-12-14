import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DashboardHeader from "../web-components/DashboardHeader";

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedBy, setSortedBy] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);


  const fetchVehicles = () => {
    axios
    .get("https://mern-crud-amber-ten.vercel.app/api/vehicles")
      .then((result) => setVehicles(result.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
    .delete(`https://mern-crud-blue.vercel.app/api/vehicles/${id}`)
      .then(() => {
        setVehicles((prev) => prev.filter((vehicle) => vehicle._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortByUpdated = () => {
    const sortedVehicles = [...vehicles].sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA;
    });
    setVehicles(sortedVehicles);
    setSortedBy("updated");
  };

  const handleSortByStatus = () => {
    const statusOrder = ["available", "pending", "sold"];
    const sortedVehicles = [...vehicles].sort((a, b) => {
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });
    setVehicles(sortedVehicles);
    setSortedBy("status");
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white">
      <div className="p-4">
        <DashboardHeader />

        <Link to="/create">
          <Button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white">
            Add Vehicle
          </Button>
        </Link>

        <div className="flex mt-5">
          <div className="my-4 mr-10">
            <input
              type="text"
              placeholder="Search by Vehicle Name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 border border-gray-600 rounded-2xl bg-gray-900 text-white focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="my-4 flex gap-5 ml-5">
            <Button
              onClick={handleSortByStatus}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sort by Status
            </Button>
            <Button
              onClick={handleSortByUpdated}
              className="bg-blue-600 hover:bg-blue-700 text-white ml-20"
            >
              Sort by Latest Updated
            </Button>
          </div>
        </div>

        <Table className="w-full border border-gray-600 ">
          <TableHeader>
            <TableRow className="hover:bg-gray-900">
              <TableHead className="border-gray-600 text-white">
                Vehicle Name
              </TableHead>
              <TableHead className="border-gray-600 font-bold text-white">
                Status
              </TableHead>
              <TableHead className="border-gray-600 font-bold text-white">
                Updated On
              </TableHead>
              <TableHead className="border-gray-600 font-bold text-white">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow
                key={vehicle._id}
                className="cursor-pointer hover:bg-gray-800 hover:text-gray-100 transition"
              >
                <TableCell className="border-gray-600 text-gray-100">
                  {vehicle.name}
                </TableCell>
                <TableCell className="border-gray-600 text-gray-100">
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </TableCell>
                <TableCell className="border-gray-600 text-gray-100">
                  {new Date(vehicle.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell className="border-gray-600 text-gray-100">
                  <div className="flex gap-2">
                    <Link to={`/update/${vehicle._id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-500 border-blue-500 bg-gray-900 hover:bg-gray-900 hover:text-blue-600"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-500 hover:text-red-600 bg-gray-900 hover:bg-gray-900"
                      onClick={() => handleDelete(vehicle._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Vehicle;
