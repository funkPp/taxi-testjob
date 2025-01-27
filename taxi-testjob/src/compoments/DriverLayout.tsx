import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Trips } from "./Trips";
import { roleStorage } from "../shared/config";
import { Nav } from "../uiKit";
import { AddEditTrip } from "./AddEditTrip";

export function DriverLayout() {
  const role = roleStorage.getData();
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("role");
    navigate("/");
  };
  if (role !== "driver") return <Navigate to="/" />;
  return (
    <div className="container">
      <Nav role={role} logout={handleClick}></Nav>
      <Routes>
        <Route index element={<Trips role="driver" />} />
        <Route path="edit/:id" element={<AddEditTrip role="driver" />} />
      </Routes>
    </div>
  );
}
