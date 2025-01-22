function ListTrips({ role }: { role: string }) {
  console.log(role);
  const roleLabel = {
    passenger: "Пассажир",
    driver: "Водитель",
  };
  return (
    <div className="text-center">
      Cтраница "Поездки", ваша роль: {roleLabel[role as keyof typeof roleLabel]}
    </div>
  );
}

export default ListTrips;
