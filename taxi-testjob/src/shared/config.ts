import StorageService from "./storageService";

export const roles = [
  { value: "init", label: "Выберите роль" },
  { value: "passenger", label: "Пассажир" },
  { value: "driver", label: "Водитель" },
];

export const roleStorage = new StorageService<string>("role");

export interface ITrip { 
  id: number;
  region: string;
  from: string;
  to: string;
  tariff: string;
  status: string;
}

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
    id: 1,
    region: "Уфа",
    from: "Уфа, ул. Кирова, д.46",
    to: "Уфа, ул. Карла Маркса, д. 56",
    tariff: "Эконом",
    status: "Завершенный"
  },
  {
    id: 2,
    region: "Уфа",
    from: "Уфа, ул. Карла Маркса, д 56",
    to: "Уфа, ул. Кирова, д. 46",
    tariff: "Бизнес",
    status: "Ожидает"
  },
  {
    id: 3,
    region: "Стерлитамак",
    from: "Уфа, ул. Кирова, д.46",
    to: "Стерлитамак, ул. Проспект Октября, д.91",
    tariff: "Комфорт",
    status: "Завершенный"
  }
];

  export const optionsRegion = [
    { value: "ufa", label: "Уфа" },
    { value: "Sterlitamak", label: "Стерлитамак" },
  ];
