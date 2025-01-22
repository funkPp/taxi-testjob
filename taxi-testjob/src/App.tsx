import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import PassengerLayout from "./components/PassengerLayout";
import DriverLayout from "./components/DriverLayout";
function App() {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="md:max-w-[80%] mx-auto 2xl:max-w-[70%] p-2 bg-gray-100 h-screen">
        <Routes>
          {/* <Route path="account/*" element={<AccountLayout />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<HomePage />} />
          <Route path="passenger/trips/*" element={<PassengerLayout />} />
          <Route path="driver/trips/*" element={<DriverLayout />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
