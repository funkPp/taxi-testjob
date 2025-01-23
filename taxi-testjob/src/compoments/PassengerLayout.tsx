import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Trips } from "./Trips";
import { roleStorage } from "../shared/config";
import { Nav } from "../uiKit";
import { AddEditTrip } from "./AddEditTrip";

export default function PassengerLayout() {
  const role = roleStorage.getData();

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  if (role !== "passenger") return <Navigate to="/" />;

  return (
    <div className="container">
      <Nav role={role} logout={handleClick}></Nav>
      <Routes>
        <Route index element={<Trips role="passenger" />} />
        <Route path="add" element={<AddEditTrip role="passenger" />} />
      </Routes>
    </div>
  );
}
