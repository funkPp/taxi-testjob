import clsx from "clsx";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function LinkButton({
  typeClass,
  to,
  children,
  disabled,
}: {
  typeClass: string;
  to: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  const classes: { [index: string]: string } = {
    main: `px-2 h-10 bg-gray-50  border border-gray-300 hover:bg-gray-100 content-center`,
    flexRight: `px-2 h-10 bg-gray-50  border border-gray-300 hover:bg-gray-100 content-center self-end mr-3`,
  };
  const disabledStyle = disabled ? "cursor-wait" : "";
  return (
    <Link
      to={to}
      className={clsx(classes[typeClass], disabledStyle)}
      role="button"
    >
      {children}
    </Link>
  );
}

export default LinkButton;
