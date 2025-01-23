import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  initialData,
  roles,
  roleStorage,
  tripsStorage,
} from "../shared/config";
import { Button } from "../uiKit/Button";

function HomePage() {
  const [role, setRole] = useState<string>("init");
  const navigate = useNavigate();

  const roleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleClick = () => {
    console.log(role + "/trips");
    if (role === "passenger" || role === "driver") {
      roleStorage.setData(role);
      tripsStorage.setData(initialData);
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
          onChange={roleChange}
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

export default HomePage;
