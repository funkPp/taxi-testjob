import { useEffect, useMemo, useState, MouseEvent } from "react";
import { headTable, ITrip, roles, tripsStorage } from "../shared/config";
import { LinkButton, Table } from "../uiKit";
import { Paginator } from "./Paginator";

export function Trips({ role }: { role: string }) {
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [region, setRegion] = useState<string | undefined>(
    optionsRegion[0].label
  );
  const [tariff, setTariff] = useState<string | undefined>(
    optionsTariff[0].label
  );
  const [isFiltred, setIsFiltred] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

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
  const pageCount = filteredTrips
    ? Math.ceil(filteredTrips.length / itemsPerPage)
    : 0;

  const currentItems = useMemo(
    () => (filteredTrips ? filteredTrips.slice(itemOffset, endOffset) : []),
    [filteredTrips, itemOffset, endOffset]
  );

  const handlePageClick = (e: MouseEvent<HTMLButtonElement>): void => {
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
  };

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

const getLabelRegion = (value: string) =>
  value ? optionsRegion.find((o) => o.value === value)?.label : "";

const getLabelTariff = (value: string) =>
  value ? optionsTariff.find((o) => o.value === value)?.label : "";
