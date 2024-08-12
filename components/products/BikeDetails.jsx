"use client";
import Image from "next/image";
import Link from "next/link";
import Quantity from "../global/Quantity";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Error from "@/app/error";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import Review from "../review/Review";

const BikeDetails = ({ bike, reviews }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { currentUser, token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const prevQty = sessionStorage.getItem("quantity");

  useEffect(() => {
    if (prevQty) {
      setQuantity(prevQty);
      sessionStorage.removeItem("quantity");
    }
  }, []);

  const handleBuy = async () => {
    if (!currentUser) {
      sessionStorage.setItem("quantity", quantity);
      router.push(`/auth/login?redirect=/bikes/${bike.id}`);
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${baseUrl}/api/transactions`,
        [
          {
            bike_id: bike.id,
            quantity,
            total_price: bike.price * quantity,
          },
        ],
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setIsLoading(false);
      router.push(`/payment/${res.data.payload.transaction_id}`);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  return (
    <>
      {isError ? (
        <Error />
      ) : (
        <main className="mt-[80px] pb-20 pt-5 md:pt-10">
          <div className="container mx-auto px-5 xl:max-w-[1280px] xl:px-0">
            <section className="hidden items-center gap-2 md:flex">
              <Link className="hover:underline hover:opacity-70" href={"/"}>
                Home
              </Link>
              <p>/</p>
              <Link
                className="hover:underline hover:opacity-70"
                href={"/bikes"}
              >
                Bikes
              </Link>
              <p>/</p>
              <Link
                className="hover:underline hover:opacity-70"
                href={`/bikes/${bike.id}`}
              >
                {bike.name}
              </Link>
            </section>
            <section className="mt-5 flex w-full xl:h-[426px] flex-col justify-end gap-10 xl:flex-row">
              <div className="w-full xl::w-[625px] h-full overflow-hidden">
                <Image
                  src={bike.image_url}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="bike"
                  priority={true}
                  className="w-full h-auto"
                />
              </div>
              <div className="w-full xl:max-w-[50%]">
                <div className="border-b border-white pb-3">
                  <h1 className="text-[24px] font-bold md:text-[36px]">
                    {bike.name}
                  </h1>
                  <div className="flex items-center gap-2 pt-1 text-[12px] md:text-[14px]">
                    <i
                      aria-hidden
                      className="fa-solid fa-star text-yellow-400"
                    ></i>
                    <p>(5) | {bike.stock} available</p>
                  </div>
                </div>
                <p className="mt-2 text-[20px] font-semibold md:text-[24px]">
                  Rp {bike.price.toLocaleString("id-ID")}
                </p>
                <div className="mt-[35px]">
                  <p className="text-[16px] font-semibold md:text-[20px]">
                    Description
                  </p>
                  <p className="text-[14px] font-light md:text-[16px]">
                    {bike.description}
                  </p>
                </div>
                <div className="mt-[35px] grid grid-cols-2 items-center justify-between gap-5 border border-accent bg-[#434343] px-10 py-5 text-left md:flex md:px-14 md:text-center">
                  <div>
                    <p className="text-[16px] font-semibold md:text-[20px]">
                      Brand
                    </p>
                    <p className="text-[14px] font-light md:text-[16px]">
                      {bike.brand}
                    </p>
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold md:text-[20px]">
                      Year
                    </p>
                    <p className="text-[14px] font-light md:text-[16px]">
                      {bike.year}
                    </p>
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold md:text-[20px]">
                      Stock
                    </p>
                    <p className="text-[14px] font-light md:text-[16px]">
                      {bike.stock}
                    </p>
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold md:text-[20px]">
                      Category
                    </p>
                    <p className="text-[14px] font-light md:text-[16px]">
                      {bike.category}
                    </p>
                  </div>
                </div>
                <div className="mt-[35px] flex flex-col items-start gap-3 text-[14px] md:flex-row md:items-center md:text-[16px]">
                  <Quantity
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={bike.stock}
                  />
                  <button className="flex h-[35px] w-full items-center justify-center border border-accent duration-150 hover:bg-gray-dark md:w-[130px]">
                    add to cart
                  </button>
                  <button
                    onClick={() => {
                      handleBuy();
                    }}
                    className="flex h-[35px] w-full items-center justify-center bg-secondary duration-150 hover:opacity-70 md:w-[130px]"
                  >
                    {isLoading ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      "buy now"
                    )}
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div className="mt-10 bg-[#434343] px-5 xl:px-0">
            <section className="container mx-auto flex flex-col justify-center gap-10 py-16 md:items-center xl:max-w-[1280px]">
              <h2 className="text-[20px] font-bold md:text-[24px]">
                Why Should You Buy This Bike?
              </h2>
              <div className="flex w-full flex-col justify-center gap-5 md:px-5 xl:flex-row xl:gap-9 xl:px-0">
                <div className="flex items-center gap-5 rounded-md border border-accent bg-primary p-7 xl:justify-center">
                  <div className="flex min-h-[50px] min-w-[50px] items-center justify-center rounded-full bg-secondary">
                    <i aria-hidden className="fa-solid fa-receipt"></i>
                  </div>
                  <div>
                    <p className="font-light">Bike Warranty</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 rounded-md border border-accent bg-primary p-7 xl:justify-center">
                  <div className="flex min-h-[50px] min-w-[50px] items-center justify-center rounded-full bg-secondary">
                    <i
                      aria-hidden
                      className="fa-solid fa-screwdriver-wrench"
                    ></i>
                  </div>
                  <div>
                    <p className="font-light">
                      Free Service Three
                      <br />
                      Times
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 rounded-md border border-accent bg-primary p-7 xl:justify-center">
                  <div className="flex min-h-[50px] min-w-[50px] items-center justify-center rounded-full bg-secondary">
                    <i aria-hidden className="fa-solid fa-bicycle"></i>
                  </div>
                  <div>
                    <p className="font-light">Free Bike Assembly</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="container mx-auto mt-20 flex w-full flex-col gap-[25px] px-5 xl:max-w-[1280px] xl:px-0">
            <h2 className="text-[24px] font-bold">Reviews</h2>
            {reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        </main>
      )}
    </>
  );
};

export default BikeDetails;
