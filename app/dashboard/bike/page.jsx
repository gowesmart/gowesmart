import BikeTable from "@/components/dashboard/BikeTable";
import DashboardPagination from "@/components/dashboard/DashboardPagination";
import fetchInstance from "@/lib/fetch";
import { redirect } from "next/navigation";

const getBikes = async (page) => {
  return await (
    await fetchInstance(
      `/api/bikes?${new URLSearchParams({ limit: 7, page: +page || 1 }).toString()}`,
      {
        next: { revalidate: 10, tags: ["bikes"] },
      },
    )
  ).json();
};

export default async function Page({ searchParams }) {
  const page = searchParams.page || 1;
  const { payload: bikes, metadata } = await getBikes(page);

  if (page > metadata.total_pages) redirect("/dashboard/bike");

  return (
    <BikeTable
      bikes={bikes}
      pagination={<DashboardPagination pagination={metadata} />}
    />
  );
}
