import UserTable from "@/components/dashboard/ReviewTable";
import ReviewTable from "@/components/dashboard/ReviewTable";

export const metadata = {
  title: "Dashboard | User Review",
};

export default async function Page({ searchParams: { page } }) {
  return <ReviewTable page={page} />;
}
