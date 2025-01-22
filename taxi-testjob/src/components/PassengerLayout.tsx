import { Route, Routes } from "react-router-dom";
import AddEditTrip from "./AddEditTrip";
import ListTrips from "./ListTrips";

function PassengerLayout() {
  return (
    <div className="px-4">
      <div className="container">
        <Routes>
          <Route index element={<ListTrips role="passenger" />} />
          <Route path="add" element={<AddEditTrip />} />
          <Route path="edit/:id" element={<AddEditTrip />} />
        </Routes>
      </div>
    </div>
  );
}

export default PassengerLayout;
