import { Route, Routes } from "react-router-dom";
import AddEditTrip from "./AddEditTrip";
import ListTrips from "./ListTrips";

function DriverLayout() {
  return (
    <div className="px-4">
      <div className="container">
        <Routes>
          <Route index element={<ListTrips role="driver" />} />
          <Route path="edit/:id" element={<AddEditTrip />} />
        </Routes>
      </div>
    </div>
  );
}

export default DriverLayout;
