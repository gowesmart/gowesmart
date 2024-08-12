"use client";

import Loading from "@/app/loading";
import { useFetch } from "@/hooks/useFetch";
import { formatDate } from "@/lib/date";
import toRupiah from "@/lib/toRupiah";
import useAuthStore from "@/store/authStore";
import Image from "next/image";
import { Button } from "../global/Button";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

export default function History() {
  const router = useRouter();
  const { toast } = useToast();
  const token = useAuthStore((state) => state.token);
  const { data: transaction, isFetching } = useFetch(
    "/api/users/current/transactions",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Transaction Deleted",
        description: "Transaction has been deleted successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error while deleting a transaction",
        description: "Some error occurred while deleting a transaction",
        variant: "destructive",
      });
    }
  };

  if (isFetching) return <Loading />;

  return (
    <main className="container mx-auto mt-[80px] py-10 xl:max-w-[1280px]">
      <div className="space-y-5 rounded-md border border-accent p-10">
        <h1 className="text-2xl font-semibold">History</h1>
        <div className="flex flex-col gap-5">
          {transaction?.map((trx) => (
            <div key={trx.id} className="space-y-3">
              <p>Transaction date: {formatDate(trx?.created_at)}</p>
              <p>Transaction status: {trx?.status}</p>
              <p>Total price: {toRupiah(trx?.total_price)}</p>
              <p>Orders:</p>
              <div className="flex flex-col gap-2">
                {trx?.orders?.map((order) => (
                  <div className="flex gap-3 border-b border-accent py-3">
                    <Image
                      src={order?.bike?.image_url}
                      width={300}
                      height={200}
                      draggable={false}
                      alt={order?.bike?.image_url}
                      className="h-[200px] w-[300px] flex-shrink-0 rounded-md"
                    />
                    <div className="flex w-full flex-col justify-between">
                      <div className="flex flex-col">
                        <p className="text-3xl">{order?.bike?.name}</p>
                        <p>Quantity: {order?.quantity}</p>
                        <p>Total Price: {toRupiah(order?.total_price)}</p>
                      </div>
                      {trx.status === "paid" && (
                        <Button className="w-fit">Add Review</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {trx.status !== "paid" && (
                <div className="flex justify-end gap-3">
                  <Button
                    variant="destructive"
                    className="w-fit"
                    onClick={() => handleDelete(trx.id)}
                  >
                    Cancel
                  </Button>
                  <Button className="w-fit" asChild>
                    <Link href={`/payment/${trx.id}`}>Pay</Link>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
