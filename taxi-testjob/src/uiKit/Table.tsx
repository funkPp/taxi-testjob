import clsx from "clsx";
import { ReactNode } from "react";
import { LinkButton, Button } from ".";
import { ITrip } from "../shared/config";

export function Table<T extends ITrip>({
  typeClass,
  disabled,
  head,
  body,
  editById,
  handlerDeleteById,
}: {
  typeClass: string;
  disabled?: boolean;
  head?: string[];
  body: T[];
  editById?: string;
  handlerDeleteById?: (id: number) => void;
}) {
  const classes: { [index: string]: string } = {
    main: ``,
  };
  const disabledStyle = disabled ? "cursor-wait" : "";

  if (!body || body.length === 0) {
    return <div>Нет данных</div>;
  }

  let headRender = null;
  if (head) {
    headRender = head.map((item) => (
      <th key={item} scope="col" className="px-4 py-3 bg-gray-50">
        {item}
      </th>
    ));
  }

  const fieldsT = Object.keys(body[0]) as Array<keyof T>;

  let bodyRender = null;
  if (body) {
    bodyRender = body.map((row) => (
      <tr key={row.id} className="bg-white border-b hover:bg-gray-50  ">
        {fieldsT.map((field) => (
          <td className="px-4 py-2 " key={String(field)}>
            {String(row[field])}
          </td>
        ))}
        {(editById || handlerDeleteById) && (
          <td className="px-2 py-1 flex flex-wrap flex-row gap-1  justify-center items-center ">
            {editById && (
              <LinkButton to={`${editById}${row.id}`} typeClass="main">
                Изменить
              </LinkButton>
            )}
            {handlerDeleteById && (
              <Button
                typeClass="main"
                onClick={() => handlerDeleteById(row.id)}
                label="Удалить"
              />
            )}
          </td>
        )}
      </tr>
    ));
  }
  return (
    <div className="m-3 relative overflow-x-auto shadow-md sm:rounded-sm box-border ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>{headRender}</tr>
        </thead>
        <tbody className={clsx(classes[typeClass], disabledStyle)}>
          {bodyRender as ReactNode}
        </tbody>
      </table>
    </div>
  );
}
