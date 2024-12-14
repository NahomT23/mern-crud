import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DashboardHeader from "../web-components/DashboardHeader";
import { toast } from "react-toastify";

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedBy, setSortedBy] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    axios
      .get("https://mern-crud-beta-nine.vercel.app/api/vehicles")
      .then((result) => setVehicles(result.data))
      .catch((err) => console.log(err));
  };

  const confirmDelete = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteDialog(true);
  };

  const handleDelete = () => {
    if (vehicleToDelete) {
      axios
        .delete(`https://mern-crud-beta-nine.vercel.app/api/vehicles/${vehicleToDelete._id}`)
        .then(() => {
          toast.success("Vehicle deleted successfully");
          setVehicles((prev) => prev.filter((vehicle) => vehicle._id !== vehicleToDelete._id));
        })
        .catch((err) => {
          toast.error("Could not delete vehicle");
          console.log(err);
        })
        .finally(() => {
          setShowDeleteDialog(false);
          setVehicleToDelete(null);
        });
    }
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
                      onClick={() => confirmDelete(vehicle)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {showDeleteDialog && (
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent className="bg-gray-900">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Are you sure you want to delete {vehicleToDelete?.name}?
                </DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button className="bg-gray-950 hover:bg-black"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Vehicle;
