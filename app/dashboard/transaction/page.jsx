import TransactionTable from "@/components/dashboard/TransactionTable";

export const metadata = {
  title: "Dashboard | Transaction Management",
};

export default async function Page({ searchParams: { page } }) {
  return <TransactionTable page={page} />;
}
