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
import DetailReview from "./DetailReview"; // Ensure this is imported

export default function ReviewTable({ page }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  // Fetch reviews with token included in headers
  const {
    data: reviews,
    isFetching,
    pagination,
    error,
  } = useFetch(
    `/api/reviews?${new URLSearchParams({ page: +page || 1 }).toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  // Redirect to the first page if the current page exceeds total pages
  if (pagination && page > pagination.total_pages) {
    router.push("/dashboard/review?page=1");
  }

  return (
    <TableDashboard
      title="Review Management"
      pagination={<DashboardPagination pagination={pagination} />}
    >
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Comment</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Bike</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              <Loading />
            </TableCell>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              <p>Error fetching reviews: {error.message}</p>
            </TableCell>
          </TableRow>
        ) : (
          reviews?.map((review, index) => (
            <TableRow key={review.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{review.comment}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.user_username}</TableCell>
              <TableCell>{review.bike_name}</TableCell>
              <TableCell className="text-right">
                <DetailReview reviewID={review.id} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </TableDashboard>
  );
}
