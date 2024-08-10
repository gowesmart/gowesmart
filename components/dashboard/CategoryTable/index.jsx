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
import { useToast } from "@/hooks/useToast";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import DetailCategory from "./DetailCategory";
import axiosInstance from "@/lib/axios";
import useAuthStore from "@/store/authStore";

export default function CategoryTable({ page }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const { toast } = useToast();

  const {
    data: categories,
    isFetching,
    pagination,
  } = useFetch(
    `/api/categories?${new URLSearchParams({ limit: 7, page: +page || 1 }).toString()}`,
  );

  const handleUpdate = async (data) => {
    try {
      await axiosInstance.patch(`/api/categories/${+data.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Category Updated",
        description: "Category has been updated successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error while updating a category",
        description: "Some error occurred while updating a category",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Category Deleted",
        description: "Category has been deleted successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error while deleting a category",
        description: "Some error occurred while deleting a category",
        variant: "destructive",
      });
    }
  };

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
                      <DetailCategory
                        category={category}
                        handleUpdate={handleUpdate}
                      />
                      <DeleteCategory
                        category={category}
                        handleDelete={handleDelete}
                      />
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
