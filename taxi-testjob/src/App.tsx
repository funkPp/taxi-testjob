import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { PassengerLayout } from "./components/PassengerLayout";
import { DriverLayout } from "./components/DriverLayout";

function App() {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="sm:max-w-[100%] xl:max-w-[90%] mx-auto 2xl:max-w-[80%] bg-gray-100 h-screen text-sm">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="passenger/trips/*" element={<PassengerLayout />} />
          <Route path="driver/trips/*" element={<DriverLayout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
