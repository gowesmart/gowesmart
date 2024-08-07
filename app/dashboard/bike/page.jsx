import BikeTable from "@/components/dashboard/BikeDashboard";
import fetchInstance from "@/lib/fetch";

const getBikes = async (limit, page) => {
  return await (
    await fetchInstance(
      `/bikes?${new URLSearchParams({ limit: +limit || 10, page: +page || 1 }).toString()}`,
      {
        next: { revalidate: 10, tags: ["bikes"] },
      },
    )
  ).json();
};

export default async function page({ searchParams: { limit, page } }) {
  const { payload: bikes } = await getBikes(limit, page);

  return <BikeTable bikes={bikes} />;
}
