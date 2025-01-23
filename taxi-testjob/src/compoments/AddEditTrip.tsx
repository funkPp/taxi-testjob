import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../uiKit/Card";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { ITrip, newTrip, optionsRegion, tripsStorage } from "../shared/config";
import { Button, LinkButton } from "../uiKit";
import clsx from "clsx";

export function AddEditTrip({ role }: { role: string }) {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [trip, setTrip] = useState<ITrip | undefined>(newTrip);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    region: Yup.string().required("Выберите регион"),
    from: Yup.string().required("Заполните поле"),
    to: Yup.string().required("Заполните поле"),
    tariff: Yup.string().required("Заполните поле"),
  });

  type TMode = "onChange";
  const formOptions = {
    mode: "onChange" as TMode,
    resolver: yupResolver(validationSchema),
  };
  const { register, handleSubmit, reset, formState, control } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (id) {
      setTitle("Редактирование поездки");
      setTrip(tripsStorage.getItemById(Number(id), "id"));
    } else {
      setTitle("Новая поездка");
    }
  }, [id]);

  async function onSubmit(data: ITrip) {
    if (id) {
      tripsStorage.updateItem(data, "id");
    } else {
      tripsStorage.addItem(data);
    }
    navigate(`${role}/trips`);
  }

  const getValue = (value: string) =>
    value ? optionsRegion.find((o) => o.value === value) : "";

  const styleInput = `
  bg-gray-50 border border-gray-300 text-sm rounded-sm 
  hover:border-gray-600 focus:outline-gray-700 block w-full p-2`;

  const styleSelect = `
  bg-gray-50 border border-gray-300 text-sm rounded-sm 
  hover:border-gray-600 focus:outline-gray-700 block w-full`;

  const styleLabel = "block mb-2 text-sm font-medium";

  return (
    <Card typeClass="main">
      <div className="p-2 font-medium text-center">{title}</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div>
          <div className="mb-2">
            <label className={clsx(styleLabel)}>Имя</label>
            <input
              name="from"
              type="text"
              {...register("from")}
              className={clsx(styleInput)}
            />
            <div className="mt-1 text-sm text-red-600">
              {errors.from?.message}
            </div>
          </div>
          <div className="mb-2">
            <label className={clsx(styleLabel)}>Фамилия</label>
            <input
              name="to"
              type="text"
              {...register("to")}
              className={clsx(styleInput)}
            />
            <div className="mt-1 text-sm text-red-600">
              {errors.to?.message}
            </div>
          </div>
        </div>
        <div>
          <div>
            <label className={clsx(styleLabel)}>Роль</label>
            <div className="">
              <Controller
                control={control}
                defaultValue={"user"}
                name="region"
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    placeholder="Выберите регион"
                    ref={ref}
                    options={optionsRegion}
                    value={getValue(value)}
                    onChange={(newValue) => onChange(newValue.value)}
                    classNamePrefix="react-select"
                    className={styleSelect}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        borderColor: "none",
                        boxShadow: "none",
                        borderRadius: "5px",
                        background: "#FAFAFA",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 9999,
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "#0097A7 ",
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
        </div>
        <div className="mt-3 flex flex-wrap justify-between">
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

          <LinkButton typeClass="main" to={`/${role}/trips}`}>
            Отмена
          </LinkButton>
        </div>
      </form>
    </Card>
  );
}
