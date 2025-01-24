import { useEffect, useState } from "react";
import { ITrip, roles, tripsStorage } from "../shared/config";
import { LinkButton, Table } from "../uiKit";

export function Trips({ role }: { role: string }) {
  const roleLabel = roles.find((r) => r.value === role)?.label;

  const head = ["Регион", "Откуда", "Куда", "Тариф", "Статус", ""];

  const [trips, setTrips] = useState<ITrip[]>([]);

  useEffect(() => {
    const storedItems = tripsStorage.getData() as ITrip[];
    const tripsView = storedItems.map(({ id: _, ...rest }) => rest);
    setTrips(tripsView);
  }, []);

  const handlerDelete = (id: number) => {
    tripsStorage.removeItem(id, "id");
    setTrips(tripsStorage.getData() as ITrip[]);
  };

  return (
    <div className="text-center mt-3">
      <div className="font-medium">Поездки, ваша роль: {roleLabel} </div>

      <div className="flex flex-col justify-start">
        <LinkButton to="/passenger/trips/add" typeClass="flexRight">
          Добавить поездку
        </LinkButton>
        <Table
          head={head}
          body={trips}
          typeClass="main"
          handlerDeleteById={handlerDelete}
          editById="/edit"
        />
      </div>
    </div>
  );
}
