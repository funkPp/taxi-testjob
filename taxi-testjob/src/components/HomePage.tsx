import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  initialData,
  roles,
  roleStorage,
  tripsStorage,
} from "../shared/config";
import { Button } from "../uiKit/Button";

export function HomePage() {
  const [role, setRole] = useState<string>("init");
  const navigate = useNavigate();

  const handleClick = () => {
    if (role === "passenger" || role === "driver") {
      roleStorage.setData(role);
      const tripsInStorage = tripsStorage.getData();
      if (!tripsInStorage) tripsStorage.setData(initialData);
      navigate(role + "/trips");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center sm:flex-row h-screen">
      <label>
        Роль пользователя:
        <select
          name="select"
          className="m-2 h-10 w-230 bg-gray-100 bg-gray-50 border border-gray-300"
          defaultValue={"init"}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map((role, idx) => (
            <option key={idx} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </label>

      <Button typeClass="main" onClick={handleClick} label="Открыть поездки" />
    </div>
  );
}
