"use client";
import { useRouter } from "next/navigation";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/global/Table";
import TableDashboard from "../TableDashboard";
import toRupiah from "@/lib/toRupiah";
import { Button } from "@/components/global/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/global/Popover";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/app/loading";
import DashboardPagination from "../DashboardPagination";
import AddBike from "./AddBike";
import DetailBike from "./DetailBike";
import DeleteBike from "./DeleteBike";

export default function BikeTable({ page }) {
  const router = useRouter();
  const {
    data: bikes,
    isFetching,
    pagination,
  } = useFetch(
    `/api/bikes?${new URLSearchParams({ limit: 7, page: +page || 1 }).toString()}`,
  );
  const { data: categories } = useFetch("/api/categories");

  if (page > pagination.total_pages) router.push("/dashboard/bike?page=1");

  return (
    <TableDashboard
      title={"Bike Management"}
      pagination={<DashboardPagination pagination={pagination} />}
      addModal={<AddBike categories={categories} />}
    >
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Brand</TableHead>
          <TableHead className="w-[250px]">Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching ? (
          <TableRow>
            <TableCell colSpan={4}>
              <Loading className="h-[45vh]" />
            </TableCell>
          </TableRow>
        ) : (
          bikes?.map((bike) => (
            <TableRow key={bike.id}>
              <TableCell className="font-medium">{bike.brand}</TableCell>
              <TableCell>{bike.name}</TableCell>
              <TableCell>{toRupiah(bike.price)}</TableCell>
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
                      <DetailBike bike={bike} categories={categories} />
                      <DeleteBike bike={bike} />
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
