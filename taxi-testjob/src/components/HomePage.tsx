import { useState } from "react";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const [role, setRole] = useState<string>("init");
  const navigate = useNavigate();
  const roles = [
    { value: "init", label: "Выберите роль" },
    { value: "passenger", label: "Пассажир" },
    { value: "driver", label: "Водитель" },
  ];
  const roleChange = ({ target: { value } }: { target: { value: string } }) => {
    setRole(value);
  };

  const handleClick = () => {
    console.log(`${role}/trips/`);
    navigate(`${role}/trips/`);
  };

  return (
    <div className="flex flex-col justify-center items-center sm:flex-row h-screen">
      <label className="">
        Роль пользователя:
        <select
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

      <button
        className="px-2 h-10 bg-gray-50  border border-gray-300 hover:bg-gray-100  align-middle"
        onClick={handleClick}
      >
        Открыть поездки
      </button>
    </div>
  );
}

export default HomePage;
