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
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/constants";

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
  const [currentId, setCurrentId] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [review, setReview] = useState({})

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

      window.location.reload()
    } catch (error) {
      console.log(error)
      await deleteImage(imageName);
      toast({
        title: "Error while creating a review bike",
        description: "Some error occurred while creating a review bike",
        variant: "destructive",
      });
    }
  };

  const handleSeeReview = async (order) => {
    if (order.is_reviewed) {
      setIsLoading(true)

      try {
        const res = await axios.get(`${baseUrl}/api/reviews/order/${order.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        setReview(res.data.payload)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  }

  const handleDeleteReview = async () => {
    setIsLoading(true)

    try {
      await axios.delete(`${baseUrl}/api/reviews/${review.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setIsLoading(false)
      toast({
        title: "Review bike deleted",
        description: "Review bike has been deleted successfully",
      });
      window.location.reload()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast({
        title: "Error while deleting a review bike",
        description: "Some error occurred while deleting a review bike",
        variant: "destructive",
      });
    }
  }

  if (isFetching) return <Loading />;

  return (
    <main className="container mx-auto mt-[80px] py-10 xl:max-w-[1280px]">
      <div className="space-y-5 rounded-md md:border border-accent p-5 md:p-10">
        <h1 className="text-2xl font-semibold">History</h1>
        <div className="flex flex-col gap-5">
          {transaction?.map((trx) => (
            <div key={trx.id} className="space-y-3 bg-gray-dark rounded-md text-left">
              <button onClick={() => {
                setCurrentId(prev => {
                  if (prev == trx.id) {
                    return 0
                  } else {
                    return trx.id
                  }
                })
              }} className={`text-[12px] md:text-[16px] text-left gap-3 flex justify-between items-center w-full p-5 ${currentId == trx.id ? "border-b border-accent" : ""}`}>
                <p>Transaction Date : {formatDate(trx?.created_at)}</p>
                <i aria-hidden className={`fa-solid ${currentId == trx.id ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
              </button>
              {
                currentId == trx.id &&
                <div className="pr-5 pb-5 pl-5 text-[14px]" >
                  <p>Transaction Status : {trx?.status}</p>
                  <p>Total Price : {toRupiah(trx?.total_price)}</p>
                  <p className="mt-2">Orders :</p>
                  <div className="flex flex-col gap-2 mt-2">
                    {trx?.orders?.map((order, index) => (
                      <div key={index} className="flex text-[12px] md:text-[14px] flex-col md:flex-row gap-5 border border-accent p-5">
                        <p className="hidden md:inline-block">{index + 1}.</p>
                        <div className="w-full md:w-[100px]">
                          <Image
                            src={order?.bike?.image_url}
                            width={0}
                            height={0}
                            sizes="100vw"
                            draggable={false}
                            alt={order?.bike?.image_url}
                            className="w-full h-auto flex-shrink-0 rounded-md"
                          />
                        </div>
                        <div className="flex w-full flex-col justify-between">
                          <div className="flex flex-col">
                            <p className="">{order?.bike?.name}</p>
                            <div className="flex items-center gap-1 text-[14px]">
                              <p>(x{order?.quantity})</p>
                              <p>{toRupiah(order?.total_price)}</p>
                            </div>
                          </div>
                        </div>
                        {(trx.status === "paid") && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => { handleSeeReview(order) }}
                                className="flex items-center gap-3 text-[14px] w-fit"
                                variant="outline"
                              >
                                <i aria-hidden className={`fa-solid ${order.is_reviewed ? "fa-eye" : "fa-plus"}`} />
                                <p>{order.is_reviewed ? "See Review" : "Add Review"}</p>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] overflow-hidden">
                              <DialogHeader>
                                <DialogTitle>{order.is_reviewed ? "Your Review" : "Create Review"}</DialogTitle>
                              </DialogHeader>
                              {
                                !order.is_reviewed ?
                                  <>
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
                                        <InputGroup>
                                          <DashboardInput
                                            type="hidden"
                                            defaultValue={order.id}
                                            {...register("order_id", {
                                              valueAsNumber: true
                                            })}
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
                                  </>
                                  :
                                  <>
                                    {
                                      isLoading ?
                                        <div className="flex justify-center items-center min-h-[200px]">
                                          <i aria-hidden className="fa-solid fa-spinner fa-spin w-fit h-fit" ></i>
                                        </div>
                                        :
                                        <>
                                          <div className="flex flex-col gap-2">
                                            <p>Rating</p>
                                            <p className="px-3 py-2 border border-accent rounded-md">{review.rating}</p>
                                            <p className="mt-2">Comment</p>
                                            <p className="px-3 py-2 border border-accent rounded-md">{review.comment}</p>
                                          </div>
                                          <button onClick={() => { handleDeleteReview() }} className="bg-red-600 rounded-md hover:opacity-80 duration-150 py-2 mt-2">Delete</button>
                                        </>
                                    }
                                  </>
                              }
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    ))}
                  </div>
                  {trx.status !== "paid" && (
                    <div className="flex justify-end gap-3 mt-3">
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
              }
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
