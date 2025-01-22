import { useState } from "react";
function App() {
  const [role, setRole] = useState<string | null>(null);

  const roles = [
    { value: "init", label: "Выберите роль" },
    { value: "passenger", label: "Пассажир" },
    { value: "driver", label: "Водитель" },
  ];
  const roleChange = ({ target: { value } }: { target: { value: string } }) => {
    setRole(value);
  };

  const handleClick = () => {};

  return (
    <div className="bg-gray-200 h-screen">
      <div className="md:max-w-[80%] mx-auto 2xl:max-w-[70%] bg-gray-100 h-screen">
        <div className="flex flex-col justify-center items-center sm:flex-row h-screen">
          <label className="">Роль пользователя:</label>
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
          <button
            className="px-2 h-10 bg-gray-50  border border-gray-300 hover:bg-gray-100  align-middle"
            onClick={handleClick}
          >
            Открыть приложение
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
