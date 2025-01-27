import clsx from "clsx";

export function Button({
  typeClass,
  disabled,
  label,
  onClick,
  type,
}: {
  typeClass: string;
  disabled?: boolean;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  const classes: { [index: string]: string } = {
    main: `px-2 h-10 bg-gray-50  border border-gray-300 hover:bg-gray-100`,
  };
  const disabledStyle = disabled ? "cursor-wait " : "";

  return (
    <button
      className={clsx(classes[typeClass], disabledStyle)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
}
