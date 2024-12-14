import { BrowserRouter, Routes, Route } from "react-router-dom";
import Vehicle from "./web-components/Vehicle"
import UpdateVehicle from "./web-components/UpdateVehicle"
import CreateVehicle from "./web-components/CreateVehicle"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Vehicle/>}></Route>
        <Route path="/create" element={<CreateVehicle/>}></Route>
        <Route path="/update/:id" element={<UpdateVehicle/>}></Route>
      </Routes>
      </BrowserRouter>
       <ToastContainer />
    </div>
  )
}

export default App
