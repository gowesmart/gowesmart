"use client";

import { useEffect, useState } from "react";
import Quantity from "../global/Quantity";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import useAuthStore from "@/store/authStore";

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState({});
  const { token } = useAuthStore();

  useEffect(() => {
    getCartUser();
  }, []);

  const getCartUser = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/users/current/carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-dvh w-full items-start pt-[80px]">
      <section className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 rounded-md border border-accent p-10">
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
              </tr>
            </thead>
            <tbody>
              {console.log(cart.cart_items)}
              {cart.cart_items.map((item) => (
                <tr key={item.id} className="border-b border-accent">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="card flex max-w-96 items-center gap-2">
                      <div className="image h-24 w-24 bg-accent"></div>
                      <div className="card-body flex-1 self-start">
                        <p className="text-base text-secondary">
                          Detroit - 152
                        </p>
                        <p className="line-clamp-3 text-sm">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Doloribus commodi, sequi voluptatem eum hic
                          officia?
                        </p>
                        <p className="text-sm">Rp. 3.000.000</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <Quantity
                        quantity={item.quantity}
                        setQuantity={setQuantity}
                        stock={100}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">Rp. {item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between rounded-md border border-accent">
            <span className="px-6 py-3 text-base text-secondary">
              Total Price :
            </span>
            <span className="px-6 py-3 text-base text-secondary">$5997</span>
          </div>
          <button className="rounded-md bg-secondary px-4 py-2 text-white">
            Checkout
          </button>
        </div>
      </section>
    </main>
  );
}
