import { useRouter } from "next/navigation";
import { Button } from "../global/Button";
import { Table } from "../global/Table";

export default function TableDashboard({
  title,
  children,
  pagination,
  addModal,
}) {
  const router = useRouter();

  return (
    <div className="size-full space-y-5 rounded-md border border-accent p-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <Button
            className="rounded-full px-3 py-2 text-base"
            variant="outline"
            onClick={router.refresh}
          >
            <i aria-hidden className="fa-solid fa-rotate-right" />
          </Button>
        </div>
        {addModal}
      </div>
      <Table>{children}</Table>
      {pagination}
    </div>
  );
}
