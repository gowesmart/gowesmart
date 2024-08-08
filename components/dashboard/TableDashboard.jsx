import { Table } from "../global/Table";

export default function TableDashboard({
  title,
  children,
  pagination,
  addModal,
}) {
  return (
    <div className="size-full space-y-5 rounded-md border border-accent p-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        {addModal}
      </div>
      <Table>{children}</Table>
      {pagination}
    </div>
  );
}
