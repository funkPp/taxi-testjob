import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../uiKit/Card";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import {
  DADATA_TOKEN,
  ITrip,
  newTrip,
  optionsRegion,
  optionsTariff,
  tripsStorage,
} from "../shared/config";
import { Button, LinkButton } from "../uiKit";
import clsx from "clsx";

export function AddEditTrip({ role }: { role: string }) {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [trip, setTrip] = useState<ITrip | undefined>(undefined);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    id: Yup.number(),
    region: Yup.string().required("Выберите регион"),
    from: Yup.string()
      .required("Заполните поле")
      .max(200, "Максимум 200 символов"),
    to: Yup.string()
      .required("Заполните поле")
      .max(200, "Максимум 200 символов"),
    tariff: Yup.string().required("Выберите тариф"),
  });

  type TMode = "onChange";
  const formOptions = {
    mode: "onChange" as TMode,
    resolver: yupResolver(validationSchema),
  };
  const { handleSubmit, reset, formState, control, setValue, watch } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const [region, from] = watch(["region", "from"]);

  useEffect(() => {
    if (id) {
      console.log("!!!!!!!!!");
      setTitle("Редактирование поездки");
      const tripById = tripsStorage.getItemById(Number(id), "id");
      console.log({ tripById });
      setTrip(tripById);
    } else {
      setTitle("Новая поездка");
    }
  }, [id]);

  useEffect(() => {
    //  console.log(id, trip, region, from);
    console.log({ trip });
    reset(trip);
  }, [trip, reset]);

  // useEffect(() => {
  //   //  setValue("from", region);
  //   console.log(region, { from });
  // }, [setValue, region, from]);

  async function onSubmit(data: ITrip) {
    if (id) {
      tripsStorage.updateItem(data, "id");
    } else {
      const newData = { ...data, id: Date.now(), status: "Ожидание" };
      tripsStorage.addItem(newData);
    }
    navigate(`/${role}/trips`);
  }

  return (
    <Card typeClass="main">
      <div className="p-2 font-medium text-center">{title}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label className={clsx(styleLabel)}>Регион</label>
            <div className="mb-2">
              <Controller
                control={control}
                name="region"
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    placeholder="Выберите регион"
                    ref={ref}
                    options={optionsRegion}
                    value={getValue(value)}
                    onChange={(newValue) => {
                      onChange(newValue.value);
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
                )}
              />
            </div>
            <div className="mt-1 text-sm text-red-600">
              {errors.region?.message}
            </div>
          </div>
          <div className="mb-2">
            <label className={clsx(styleLabel)}>Откуда</label>
            <div className="">
              <Controller
                control={control}
                name="from"
                render={({ field: { onChange, ref } }) => (
                  <AddressSuggestions
                    token={DADATA_TOKEN}
                    ref={ref}
                    inputProps={{ className: styleInput }}
                    onChange={(newValue) => onChange(newValue.value)}
                  />
                )}
              />
            </div>
            <div className="mt-1 text-sm text-red-600">
              {errors.from?.message}
            </div>
          </div>

          <div className="mb-2">
            <label className={clsx(styleLabel)}>Куда</label>
            <div className="">
              <Controller
                control={control}
                name="to"
                render={({ field: { onChange, ref } }) => (
                  <AddressSuggestions
                    token={DADATA_TOKEN}
                    ref={ref}
                    inputProps={{ className: styleInput }}
                    onChange={(newValue) => {
                      onChange(newValue.value);
                    }}
                  />
                )}
              />
            </div>
            <div className="mt-1 text-sm text-red-600">
              {errors.to?.message}
            </div>
          </div>

          <div>
            <label className={clsx(styleLabel)}>Тариф</label>
            <div className="">
              <Controller
                control={control}
                name="tariff"
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    placeholder="Выберите тариф"
                    ref={ref}
                    options={optionsTariff}
                    value={getValue(value)}
                    onChange={(newValue) => onChange(newValue.value)}
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
                        backgroundColor: state.isFocused ? "#eeeeee" : "white",
                        color: "black",
                        borderRadius: "1px",
                      }),
                    }}
                  />
                )}
              />
            </div>
            <div className="mt-1 text-sm text-red-600">
              {errors.tariff?.message}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-between">
          <Button
            typeClass="main"
            type="submit"
            disabled={isSubmitting}
            label="Сохранить"
          />

          <Button
            typeClass="main"
            onClick={() => reset()}
            disabled={isSubmitting}
            label="Сброс"
          />

          <LinkButton typeClass="main" to={`/${role}/trips`}>
            Отмена
          </LinkButton>
        </div>
      </form>
    </Card>
  );
}

const getValue = (value: string) =>
  value ? optionsRegion.find((o) => o.value === value) : "";

const styleInput = `
  bg-gray-50 border border-gray-300 text-sm rounded-sm 
  hover:border-gray-600 focus:outline-none block w-full p-2`;

const styleSelect = `
  bg-gray-50 border border-gray-300 text-sm rounded-sm 
  hover:border-gray-600 focus:outline-none block w-full`;

const styleLabel = "block mb-2 text-sm font-medium";
