import BikeTable from "@/components/dashboard/BikeTable";

export const metadata = {
  title: "Dashboard | Bike",
};

export default async function Page({ searchParams: { page } }) {
  return <BikeTable page={page} />;
}
