import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  initialData,
  optionsRoles,
  roleStorage,
  tripsStorage,
} from "../shared/config";
import { Button } from "../uiKit/Button";
import Select from "react-select";

export function HomePage() {
  const [role, setRole] = useState(optionsRoles[0]);
  const navigate = useNavigate();

  const handleClick = () => {
    roleStorage.setData(role.value);
    const tripsInStorage = tripsStorage.getData();
    if (!tripsInStorage) tripsStorage.setData(initialData);
    navigate(role.value + "/trips");
  };

  return (
    <div className="flex flex-col justify-center items-center sm:flex-row h-screen w-100">
      Выберите роль:
      <Select
        placeholder="Выберите роль"
        options={optionsRoles}
        value={role}
        onChange={(newValue) => {
          if (newValue) setRole(newValue);
        }}
        classNamePrefix="react-select"
        className={styleSelect}
        styles={{
          control: (provided) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
            background: "#FAFAFA",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#F3F4F6" : "white",
            color: "black",
            borderRadius: "1px",
          }),
        }}
      />
      <Button typeClass="main" onClick={handleClick} label="Открыть поездки" />
    </div>
  );
}

const styleSelect = `
  bg-gray-50 border border-gray-300 text-sm rounded-sm 
  hover:border-gray-600 focus:outline-none block m-1`;
