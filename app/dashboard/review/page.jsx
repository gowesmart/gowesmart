import ReviewTable from "@/components/dashboard/ReviewTable";

export const metadata = {
  title: "Dashboard | Review Management",
};

export default async function Page({ searchParams: { page } }) {
  return <ReviewTable page={page} />;
}
