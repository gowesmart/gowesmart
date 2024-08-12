"use client"

import Image from "next/image"
import Link from "next/link"
import Quantity from "../global/Quantity"
import Review from "../review/Review"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/store/authStore"
import Error from "@/app/error"
import axios from "axios"
import { baseUrl } from "@/utils/constants"
import { useToast } from "@/hooks/useToast";

const BikeDetails = ({ bike, reviews }) => {
    const [quantity, setQuantity] = useState(1)
    const router = useRouter()
    const { currentUser, token } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const { toast } = useToast()

    const handleBuy = async () => {
        if (!currentUser) {
            router.push("/auth/login")
            return
        }

        setIsLoading(true)

        try {
            const res = await axios.post(`${baseUrl}/api/transactions`, [
                {
                    bike_id: bike.id,
                    quantity,
                    total_price: bike.price * quantity
                }
            ], { headers: { "Authorization": `Bearer ${token}` } })

            setIsLoading(false)
            router.push(`/payment/${res.data.payload.transaction_id}`)
        } catch (error) {
            setIsError(true)
            console.error(error)
        }
    }

    const handleAddToCart = async () => {
        if (!currentUser) {
            router.push("/auth/login")
            return
        }

        try {
            await axios.post(`${baseUrl}/api/carts`, 
                {
                    bike_id: bike.id,
                    quantity
                }
            , { headers: { "Authorization": `Bearer ${token}` } })
            toast({
                title: "Bike added to cart",
                description: "you can check it in your cart",
            })

            // router.refresh()
        } catch (error) {
            setIsError(true)
            console.error(error)
        }
    }

    return (
        <>
            {
                isError ?
                    <Error />
                    :
                    <main className="mt-[80px] pt-10 pb-20">
                        <div className="container xl:max-w-[1280px] mx-auto">
                            <section className="flex items-center gap-2">
                                <Link href={"/"}>Home</Link>
                                <p>/</p>
                                <Link href={"/bikes"}>Bikes</Link>
                                <p>/</p>
                                <Link href={"/"}>{bike.name}</Link>
                            </section>
                            <section className="flex gap-10 mt-10">
                                <Image src={bike.image_url} width={635} height={450} alt="bike" priority={true} />
                                <div className="w-[50%]">
                                    <div className="pb-3 border-b border-white">
                                        <h1 className="text-[36px] font-bold">{bike.name}</h1>
                                        <p className="flex items-center gap-2 text-[14px] pt-1">
                                            <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                                            <p>(5) | {bike.stock} available</p>
                                        </p>
                                    </div>
                                    <p className="mt-2 font-semibold text-[24px]">Rp {bike.price.toLocaleString("id-ID")}</p>
                                    <div className="mt-[35px]">
                                        <p className="font-semibold text-[20px]">Description</p>
                                        <p className="font-light">{bike.description}</p>
                                    </div>
                                    <div className="mt-[35px] flex items-center justify-between bg-[#434343] py-5 px-14 border border-accent text-center">
                                        <div>
                                            <p className="font-bold text-[20px]">Brand</p>
                                            <p className="font-light">{bike.brand}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[20px]">Year</p>
                                            <p className="font-light">{bike.year}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[20px]">Stock</p>
                                            <p className="font-light">{bike.stock}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[20px]">Category</p>
                                            <p className="font-light">{bike.category}</p>
                                        </div>
                                    </div>
                                    <div className="mt-[35px] flex items-center gap-3">
                                        <Quantity quantity={quantity} setQuantity={setQuantity} stock={bike.stock} />
                                        <button onClick={() => { handleAddToCart() }} className="flex justify-center items-center hover:bg-gray-dark duration-150 h-[35px] w-[130px] border border-accent">add to cart</button>
                                        <button onClick={() => { handleBuy() }} className="flex justify-center items-center h-[35px] w-[130px] hover:opacity-70 duration-150 bg-secondary">{isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "buy now"}</button>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="bg-[#434343] mt-28">
                            <section className="container xl:max-w-[1280px] mx-auto py-16 flex flex-col gap-10 justify-center items-center">
                                <h2 className="text-[24px] font-bold">Why Should You Buy This Bike?</h2>
                                <div className="flex gap-9">
                                    <div className="bg-primary p-7 flex justify-center items-center gap-5 rounded-md border border-accent">
                                        <div className="text-[24px] rounded-full bg-secondary w-[50px] h-[50px] flex justify-center items-center"><i aria-hidden className="fa-solid fa-receipt"></i></div>
                                        <div>
                                            <p className="text-[20px] font-light">Bike Warranty</p>
                                        </div>
                                    </div>
                                    <div className="bg-primary p-7 flex justify-center items-center gap-5 rounded-md border border-accent">
                                        <div className="text-[24px] rounded-full bg-secondary w-[50px] h-[50px] flex justify-center items-center"><i aria-hidden className="fa-solid fa-screwdriver-wrench"></i></div>
                                        <div>
                                            <p className="text-[20px] font-light">Free Service Three<br />
                                                Times</p>
                                        </div>
                                    </div>
                                    <div className="bg-primary p-7 flex justify-center items-center gap-5 rounded-md border border-accent">
                                        <div className="text-[24px] rounded-full bg-secondary w-[50px] h-[50px] flex justify-center items-center"><i aria-hidden className="fa-solid fa-bicycle"></i></div>
                                        <div>
                                            <p className="text-[20px] font-light">Free Bike Assembly</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="container xl:max-w-[1280px] mx-auto mt-20 w-full flex flex-col gap-[25px]">
                            <h2 className="text-[24px] font-bold">Reviews</h2>
                            <Link href={"/auth/login"}><button className="bg-secondary w-full py-6 font-bold rounded-md">Please Login to Add a Review</button></Link>
                            <Review />
                            <Review />
                        </div>
                    </main>
            }
        </>
    )
}

export default BikeDetails;
