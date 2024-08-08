import BikeTable from "@/components/dashboard/BikeDashboard";
import fetchInstance from "@/lib/fetch";

const getBikes = async (page) => {
  return await (
    await fetchInstance(
      `/bikes?${new URLSearchParams({ limit: 7, page: +page || 1 }).toString()}`,
      {
        next: { revalidate: 10, tags: ["bikes"] },
      },
    )
  ).json();
};

export default async function page({ searchParams: { page } }) {
  const { payload: bikes } = await getBikes(page);

  return <BikeTable bikes={bikes} />;
}
