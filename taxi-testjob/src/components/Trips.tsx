import { useEffect, useMemo, useState, MouseEvent } from "react";
import { headTable, ITrip, roles, tripsStorage } from "../shared/config";
import { LinkButton, Table } from "../uiKit";
import { Paginator } from "./Paginator";

export function Trips({ role }: { role: string }) {
  const roleLabel = roles.find((r) => r.value === role)?.label;

  const [trips, setTrips] = useState<ITrip[]>([]);

  useEffect(() => {
    const storedItems = tripsStorage.getData() as ITrip[];
    setTrips(storedItems);
  }, []);

  const handlerDelete = (id: number) => {
    tripsStorage.removeItem(id, "id");
    setTrips(tripsStorage.getData() as ITrip[]);
  };

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const itemOffset = currentPage * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = useMemo(
    () => (trips ? trips.slice(itemOffset, endOffset) : []),
    [trips, itemOffset, endOffset]
  );
  const pageCount = trips ? Math.ceil(trips.length / itemsPerPage) : 0;

  function handlePageClick(e: MouseEvent<HTMLButtonElement>): void {
    if ((e.target as HTMLButtonElement).id === "prev") {
      if (currentPage > 0) setCurrentPage((currentPage) => currentPage - 1);
      return;
    }

    if ((e.target as HTMLButtonElement).id === "next") {
      const pageCount = Math.ceil((trips as ITrip[])?.length / itemsPerPage);
      if (currentPage < pageCount - 1)
        setCurrentPage((currentPage) => currentPage + 1);
      return;
    }

    const nextPage = Number((e.target as HTMLButtonElement).id);
    setCurrentPage(() => nextPage);
  }

  return (
    <div className="text-center mt-3">
      <div className="font-medium">Поездки, ваша роль: {roleLabel} </div>

      <div className="flex flex-col justify-start">
        <LinkButton to="/passenger/trips/add" typeClass="flexRight">
          Добавить поездку
        </LinkButton>
        <div className="flex flex-row justify-between px-3 my-1">
          <Paginator
            currentPage={currentPage}
            handlePageClick={handlePageClick}
            pageCount={pageCount}
          />
          <label className="">
            Кол-во на странице:
            <input
              className="h-8 w-12 pl-2 ml-1 border border-gray-300"
              type="number"
              value={itemsPerPage}
              onChange={(e) => {
                if (+e.target.value > 0) {
                  setItemsPerPage(+e.target.value.replace(/[^0-9+]/g, ""));
                  setCurrentPage(0);
                }
              }}
            />
          </label>
        </div>
        <Table
          head={headTable}
          body={currentItems}
          typeClass="main"
          handlerDeleteById={handlerDelete}
          editById={`/${role}/trips/edit/`}
        />
      </div>
    </div>
  );
}
