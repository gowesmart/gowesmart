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
import useAuthStore from "@/store/authStore";
import DetailUser from "./DetailUser";
import axiosInstance from "@/lib/axios";

export default function UserTable({ page }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const { toast } = useToast();

  const {
    data: users,
    isFetching,
    pagination,
  } = useFetch(
    `/api/users?${new URLSearchParams({ limit: 7, page: +page || 1 }).toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const handleUpdate = async (data) => {
    try {
      await axiosInstance.patch(
        `/roles/update`,
        {
          role: data.role === "ADMIN" ? 1 : 2,
          user_id: +data.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast({
        title: "User Role Updated",
        description: "User role has been updated successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error while updating a user role",
        description: "Some error occurred while updating a user role",
        variant: "destructive",
      });
    }
  };

  if (page > pagination.total_pages) router.push("/dashboard/user?page=1");

  return (
    <TableDashboard
      title={"User Management"}
      pagination={<DashboardPagination pagination={pagination} />}
    >
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead className="w-[400px]">Username</TableHead>
          <TableHead>Role</TableHead>
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
          users?.map((user, id) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{++id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
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
                      <DetailUser user={user} handleUpdate={handleUpdate} />
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
