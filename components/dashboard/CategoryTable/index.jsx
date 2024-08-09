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
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import DetailCategory from "./DetailCategory";

export default function CategoryTable({ page }) {
  const router = useRouter();
  const {
    data: categories,
    isFetching,
    pagination,
  } = useFetch(
    `/api/categories?${new URLSearchParams({ limit: 7, page: +page || 1 }).toString()}`,
  );


  
  if (page > pagination.total_pages) router.push("/dashboard/category?page=1");

  return (
    <TableDashboard
      title={"Category Management"}
      pagination={<DashboardPagination pagination={pagination} />}
      addModal={<AddCategory />}
    >
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Name</TableHead>
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
          categories?.map((category, id) => (
            <TableRow key={category.ID}>
              <TableCell className="font-medium">{++id}</TableCell>
              <TableCell>{category.Name}</TableCell>
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
                      <DetailCategory category={category} />
                      <DeleteCategory category={category} />
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
