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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../global/Dialog";
import { InputGroup } from "../global/InputGroup";
import { Label } from "../global/Label";
import DashboardInput from "../dashboard/DashboardInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewCreateSchema } from "@/validation/review";
import { useForm } from "react-hook-form";
import Spinner from "../global/Spinner";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(reviewCreateSchema),
  });

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

  const handleAddReview = async (data) => {
    console.log(data);

    try {
      await axiosInstance.post("/api/reviews", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Review bike Created",
        description: "Review bike has been created successfully",
      });
      router.refresh();
    } catch (error) {
      await deleteImage(imageName);
      toast({
        title: "Error while creating a review bike",
        description: "Some error occurred while creating a review bike",
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="flex items-center gap-3"
                              variant="outline"
                            >
                              <i aria-hidden className="fa-solid fa-plus" />
                              <p>Add Review</p>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Create Review</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                              Input theese fields and then click submit for
                              create a new bike.
                            </DialogDescription>
                            <form
                              onSubmit={handleSubmit(handleAddReview)}
                              className="flex flex-col items-end gap-4"
                            >
                              <div className="mt-2 grid w-full gap-4">
                                <DashboardInput
                                  type="hidden"
                                  defaultValue={+order?.bike?.id}
                                  {...register("bike_id", {
                                    valueAsNumber: true
                                  })}
                                />
                                <InputGroup error={errors.rating?.message}>
                                  <Label htmlFor="rating">Rating</Label>
                                  <DashboardInput
                                    id="rating"
                                    type="number"
                                    placeholder="Rating..."
                                  defaultValue={0}
                                    {...register("rating", {
                                      valueAsNumber: true,
                                    })}
                                  />
                                </InputGroup>
                                <InputGroup error={errors.comment?.message}>
                                  <Label htmlFor="comment">Comment</Label>
                                  <DashboardInput
                                    id="comment"
                                    type="text"
                                    placeholder="Comment..."
                                    {...register("comment")}
                                  />
                                </InputGroup>
                              </div>
                              <Button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-fit"
                              >
                                <Spinner show={isSubmitting} />
                                Submit
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
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
