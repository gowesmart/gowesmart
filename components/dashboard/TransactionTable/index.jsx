"use client";
import { useRouter } from "next/navigation";

import { useFetch } from "@/hooks/useFetch";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/global/Table";
import TableDashboard from "../TableDashboard";
import DashboardPagination from "../DashboardPagination";
import Loading from "@/app/loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/global/Popover";
import { Button } from "@/components/global/Button";
import useAuthStore from "@/store/authStore";
import DetailTransaction from "./DetailTransaction";
import toRupiah from "@/lib/toRupiah";

export default function TransactionTable({ page }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const {
    data: transactions,
    isFetching,
    pagination,
  } = useFetch(
    `/api/transactions?${new URLSearchParams({ limit: 7, page: +page || 1 }).toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (page > pagination.total_pages) router.push("/dashboard/user?page=1");

  return (
    <TableDashboard
      title={"Transaction Management"}
      pagination={<DashboardPagination pagination={pagination} />}
    >
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead className="w-[100px]">Trx Id</TableHead>
          <TableHead className="w-[300px]">User</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching ? (
          <TableRow>
            <TableCell colSpan={5}>
              <Loading className="h-[45vh]" />
            </TableCell>
          </TableRow>
        ) : (
          transactions?.map((transaction, id) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{++id}</TableCell>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction?.user?.username}</TableCell>
              <TableCell>{toRupiah(transaction.total_price)}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <i aria-hidden className="fa-solid fa-list-ul" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-28 p-0">
                    <div className="grid divide-y divide-accent">
                      <DetailTransaction transaction={transaction} />
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </TableDashboard>
  );
}
