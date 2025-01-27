import { Button } from "./Button";

export function Nav({ role, logout }: { role: string; logout: () => void }) {
  if (!role) return <></>;

  return (
    <nav className="shadow-md flex flex-col text-center sm:flex-row sm:text-left sm:justify-between">
      <div className="p-2  ml-auto ">
        <Button onClick={logout} typeClass="main" label="Сменить роль" />
      </div>
    </nav>
  );
}
