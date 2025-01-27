import StorageService from "./storageService";

export const roles = [
  { value: "init", label: "Выберите роль" },
  { value: "passenger", label: "Пассажир" },
  { value: "driver", label: "Водитель" },
];

export const roleStorage = new StorageService<string>("role");

export const tripsStorage = new StorageService<ITrip>("trips");

export const newTrip: ITrip = 
  {
    id: Date.now(),
    region: "",
    from: "",
    to: "",
    tariff: "Эконом",
    status: "Ожидание"
  }

export const initialData: ITrip[] = [
  {
    id: 1737701769401,
    region: "Уфа",
    from: "Уфа, ул. Кирова, д.46",
    to: "Уфа, ул. Карла Маркса, д. 56",
    tariff: "Эконом",
    status: "Завершенный"
  },
  {
    id: 1737701769402,
    region: "Уфа",
    from: "Уфа, ул. Карла Маркса, д 56",
    to: "Уфа, ул. Кирова, д. 46",
    tariff: "Бизнес",
    status: "Ожидание"
  },
  {
    id: 1737701769403,
    region: "Стерлитамак",
    from: "Уфа, ул. Кирова, д.46",
    to: "Стерлитамак, ул. Проспект Октября, д.91",
    tariff: "Комфорт",
    status: "Завершенный"
  }
];

  export const optionsRegion = [
    { value: "Уфа", label: "Уфа" },
    { value: "Стерлитамак", label: "Стерлитамак" },
  ];

    export const optionsTariff = [
    { value: "Эконом", label: "Эконом" },
    { value: "Комфорт", label: "Комфорт" },
    { value: "Бизнес", label: "Бизнес" },
    
  ];
  
  export const headTable = [
    { label: "ID", field: "id", sort: 0 },
    { label: "Регион", field: "region", sort: 1 },
    { label: "Откуда", field: "from", sort: 2 },
    { label: "Куда", field: "to", sort: 3 },
    { label: "Тариф", field: "tariff", sort: 4 },
    { label: "Статус", field: "status", sort: 5 },
  ];

export interface ITrip { 
  id?: number;
  region: string;
  from: string;
  to: string;
  tariff: string;
  status?: string;
}

export const DADATA_TOKEN = "f725042183f85f224f499e2eaee6abd18193380f"