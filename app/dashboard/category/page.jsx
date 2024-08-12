import CategoryTable from "@/components/dashboard/CategoryTable";

export const metadata = {
  title: "Dashboard | Category Management",
};

export default async function Page({ searchParams: { page } }) {
  return <CategoryTable page={page} />;
}
