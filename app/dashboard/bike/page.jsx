import BikeTable from "@/components/dashboard/BikeTable";

export const metadata = {
  title: "Dashboard | Bike Management",
};

export default async function Page({ searchParams: { page } }) {
  return <BikeTable page={page} />;
}
