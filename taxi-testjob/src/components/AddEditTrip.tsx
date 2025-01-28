import { RefObject, useEffect, useRef, useState } from "react";
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
  optionsAction,
  optionsRegion,
  optionsTariff,
  tripsStorage,
  statusTrip,
} from "../shared/config";
import { Button, LinkButton } from "../uiKit";
import clsx from "clsx";

export function AddEditTrip({ role }: { role: string }) {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [trip, setTrip] = useState<ITrip | undefined>(undefined);
  const refFrom = useRef<AddressSuggestions>(null);
  const refTo = useRef<AddressSuggestions>(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    id: Yup.number(),
    region: Yup.string().required("Выберите регион"),
    from: Yup.string()
      .required("Выберите адрес")
      .max(200, "Максимум 200 символов"),
    to: Yup.string()
      .required("Выберите адрес")
      .max(200, "Максимум 200 символов"),
    tariff: Yup.string().required("Выберите тариф"),
    status: Yup.string(),
  });

  type TMode = "onChange";
  const formOptions = {
    mode: "onChange" as TMode,
    resolver: yupResolver(validationSchema),
  };
  const { handleSubmit, reset, formState, control } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (id) {
      setTitle("Редактирование поездки");
      const tripById = tripsStorage.getItemById(Number(id), "id");
      setTrip(tripById);
    } else {
      setTitle("Новая поездка");
    }
  }, [id]);

  useEffect(() => {
    reset(trip);
    setInputSuggetion(trip?.from as string, refFrom);
    setInputSuggetion(trip?.to as string, refTo);
  }, [trip, reset]);

  async function onSubmit(data: ITrip) {
    if (id) {
      tripsStorage.updateItem(data, "id");
    } else {
      const newData = { ...data, id: Date.now(), status: "Опубликована" };
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
                    isDisabled={role !== "passenger"}
                    placeholder="Выберите регион"
                    ref={ref}
                    options={optionsRegion}
                    value={getValueRegion(value)}
                    onChange={(newValue) => {
                      if (typeof newValue !== "string") {
                        onChange(newValue?.value);
                        setInputSuggetion(newValue?.value + " ", refFrom);
                        setInputSuggetion(newValue?.value + " ", refTo);
                      }
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
                render={({ field: { onChange } }) => (
                  <AddressSuggestions
                    token={DADATA_TOKEN}
                    ref={refFrom}
                    inputProps={{
                      className: styleInput,
                      disabled: role !== "passenger",
                    }}
                    onChange={(newValue) => {
                      if (typeof newValue !== "string")
                        onChange(newValue?.value);
                    }}
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
                render={({ field: { onChange } }) => (
                  <AddressSuggestions
                    token={DADATA_TOKEN}
                    ref={refTo}
                    inputProps={{
                      className: styleInput,
                      disabled: role !== "passenger",
                    }}
                    onChange={(newValue) => {
                      if (newValue) onChange(newValue.value);
                    }}
                  />
                )}
              />
            </div>
            <div className="mt-1 text-sm text-red-600">
              {errors.to?.message}
            </div>
          </div>

          <div className="mb-2">
            <label className={clsx(styleLabel)}>Тариф</label>
            <div className="">
              <Controller
                control={control}
                name="tariff"
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    placeholder="Выберите тариф"
                    isDisabled={role !== "passenger"}
                    ref={ref}
                    options={optionsTariff}
                    value={getValueTariff(value)}
                    onChange={(newValue) => {
                      if (typeof newValue !== "string")
                        onChange(newValue?.value);
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

          {role === "driver" ? (
            <div className="mb-2">
              <label className={clsx(styleLabel)}>Действия</label>
              <div className="">
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      placeholder="Выберите действие"
                      ref={ref}
                      options={optionsAction}
                      value={getValueAction(value as string)}
                      onChange={(newValue) => {
                        if (typeof newValue !== "string" && newValue) {
                          const key = newValue.value;
                          if (key in statusTrip) {
                            onChange(
                              statusTrip[key as keyof typeof statusTrip]
                            );
                          }
                        }
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
                          backgroundColor: state.isFocused
                            ? "#eeeeee"
                            : "white",
                          color: "black",
                          borderRadius: "1px",
                        }),
                      }}
                    />
                  )}
                />
              </div>
              <div className="mt-1 text-sm text-red-600">
                {errors.status?.message}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap justify-between">
          <Button
            typeClass="main"
            type="submit"
            disabled={isSubmitting}
            label="Сохранить"
          />

          {!id && (
            <Button
              typeClass="main"
              onClick={() => {
                reset();
                setInputSuggetion("", refFrom);
                setInputSuggetion("", refTo);
              }}
              disabled={isSubmitting}
              label="Сброс"
            />
          )}

          <LinkButton typeClass="main" to={`/${role}/trips`}>
            Отмена
          </LinkButton>
        </div>
      </form>
    </Card>
  );
}

const setInputSuggetion = (
  value: string,
  ref: RefObject<AddressSuggestions>
) => {
  ref.current?.setInputValue(value);
};

const getValueRegion = (value: string) =>
  value ? optionsRegion.find((o) => o.value === value) : "";

const getValueTariff = (value: string) =>
  value ? optionsTariff.find((o) => o.value === value) : "";

const getValueAction = (value: string) =>
  value ? optionsTariff.find((o) => o.value === value) : "";

const styleInput = `
  bg-gray-50 border border-gray-300 text-sm rounded-sm 
  hover:border-gray-600 focus:outline-none block w-full p-2`;

const styleSelect = `
  bg-gray-50 border border-gray-300 text-sm rounded-sm 
  hover:border-gray-600 focus:outline-none block w-full`;

const styleLabel = "block mb-2 text-sm font-medium";
