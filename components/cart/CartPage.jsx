"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import useAuthStore from "@/store/authStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [quantities, setQuantities] = useState({});
  const { fetchCartUser, cartUser, token } = useAuthStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCartUser();
  }, []);

  useEffect(() => {
    if (cartUser && cartUser.cart_items) {
      const initialQuantities = {};
      let calculatedTotalPrice = 0;

      cartUser.cart_items.forEach((item) => {
        initialQuantities[item.id] = item.quantity;
        calculatedTotalPrice += item.bike.price * item.quantity;
      });

      setQuantities(initialQuantities);
      setTotalPrice(calculatedTotalPrice);
    }
  }, [cartUser]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [itemId]: newQuantity,
      };

      // Recalculate total price
      let newTotalPrice = 0;
      cartUser.cart_items.forEach((item) => {
        const itemQuantity = updatedQuantities[item.id] || item.quantity;
        newTotalPrice += item.bike.price * itemQuantity;
      });

      setTotalPrice(newTotalPrice);
      return updatedQuantities;
    });
  };

  const handleBuy = async () => {
    setIsLoading(true);
    try {
      const transactionItems = cartUser?.cart_items.map((item) => ({
        bike_id: item.bike.id,
        quantity: quantities[item.id] || item.quantity,
        total_price: item.bike.price * (quantities[item.id] || item.quantity),
      }));

      const res = await axios.post(
        `${baseUrl}/api/transactions`,
        transactionItems,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setIsLoading(false);
      router.push(`/payment/${res.data.payload.transaction_id}`);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (bike_id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${baseUrl}/api/carts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            bike_id,
          },
        });
        fetchCartUser();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className="flex min-h-dvh w-full items-start max-w-screen-xl mx-auto gap-4 flex-col">
      <section className="flex w-full flex-col gap-4 rounded-md border border-accent p-10">
        <h1 className="text-2xl font-semibold">your shopping cart</h1>
        <div className="relative overflow-x-auto rounded-md">
          <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm rtl:text-right">
            <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-[#2E2E2E] text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartUser && cartUser.cart_items?.length > 0 ? (
                <>
                  {cartUser.cart_items?.map((item, index) => {
                    const itemQuantity = quantities[item.id] || item.quantity;
                    return (
                      <tr key={item.id} className="border-b border-accent">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">
                          <div className="card flex max-w-96 items-center gap-2">
                            <Image
                              className="h-24 w-24 bg-accent object-cover"
                              src={item.bike.image_url}
                              alt="bike"
                              width={100}
                              height={100}
                            />
                            <div className="card-body flex-1 self-start">
                              <p className="text-base text-secondary">
                                {item.bike.brand} - {item.bike.name}
                              </p>
                              <p className="line-clamp-3 text-sm">
                                {item.bike.description}
                              </p>
                              <p className="text-sm">
                                Rp. {item.bike.price.toLocaleString("id-ID")}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    Math.max(1, itemQuantity - 1),
                                  )
                                }
                                className="flex h-[35px] w-[35px] items-center justify-center border border-accent duration-150 hover:bg-gray-dark"
                              >
                                <i
                                  aria-hidden
                                  className="fa-solid fa-minus"
                                ></i>
                              </button>
                              <div className="flex h-[35px] w-[35px] cursor-default items-center justify-center border border-accent">
                                {itemQuantity}
                              </div>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    Math.min(item.bike.stock, itemQuantity + 1),
                                  )
                                }
                                className="flex h-[35px] w-[35px] items-center justify-center border border-accent duration-150 hover:bg-gray-dark"
                              >
                                <i aria-hidden className="fa-solid fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          Rp.{" "}
                          {(item.bike.price * itemQuantity).toLocaleString(
                            "id-ID",
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(item.bike.id)}
                            className="flex h-[40px] w-[40px] items-center justify-center rounded-md border border-accent bg-red-700 duration-150 hover:bg-red-500"
                          >
                            <i aria-hidden className="fa-solid fa-xmark"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr className="border-b border-accent">
                  <td className="px-6 py-4 text-center" colSpan={5}>
                    No items in cart
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between rounded-md border border-accent">
            <span className="px-6 py-3 text-base text-secondary">
              Total Price :
            </span>
            <span className="px-6 py-3 text-base text-secondary">
              Rp. {cartUser?.cart_items ? totalPrice.toLocaleString("id-ID") : 0}
            </span>
          </div>
          <button
            className="rounded-md bg-secondary px-4 py-2 text-white disabled:opacity-50"
            onClick={handleBuy}
            disabled={isLoading || cartUser?.cart_items === null}
          >
            {isLoading ? (
              <i aria-hidden className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Checkout"
            )}
          </button>
        </div>
      </section>
    </main>
  );
}
