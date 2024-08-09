import UserTable from "@/components/dashboard/UserTable";

export const metadata = {
  title: "Dashboard | User Management",
};

export default async function Page({ searchParams: { page } }) {
  return <UserTable page={page} />;
}
