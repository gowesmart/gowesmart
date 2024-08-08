import { Table } from "../global/Table";

export default function TableDashboard({ title, children, pagination }) {
  return (
    <div className="size-full space-y-5 rounded-md border border-accent p-5">
      <h1 className="text-xl font-semibold">{title}</h1>
      <Table>{children}</Table>
      {pagination}
    </div>
  );
}
