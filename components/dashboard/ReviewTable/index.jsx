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
import useAuthStore from "@/store/authStore";

export default function ReviewTable({ page }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const {
    data: reviews,
    isFetching,
    pagination,
  } = useFetch(
    `/api/reviews?${new URLSearchParams({ limit: 7, page: +page || 1 }).toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (page > pagination.total_pages) router.push("/dashboard/review?page=1");

  return (
    <TableDashboard
      title={"Review Management"}
      pagination={<DashboardPagination pagination={pagination} />}
    >
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Content</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              <Loading />
            </TableCell>
          </TableRow>
        ) : (
          reviews.map((review, index) => (
            <TableRow key={review.ID}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{review.title}</TableCell>
              <TableCell className="text-right">{review.content}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </TableDashboard>
  );
}
