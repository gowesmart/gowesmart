"use client"

import Error from "@/app/error"
import Loading from "@/app/loading"
import Popup from "@/components/modal/PopUp"
import useAuthStore from "@/store/authStore"
import { baseUrl } from "@/utils/constants"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Payment = () => {
    const { id } = useParams()
    const [transaction, setTransaction] = useState({})
    const [bikes, setBikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { currentUser } = useAuthStore()
    const router = useRouter()
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (!currentUser) {
            router.push("/")
            return
        }

        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const resTrx = await axios.get(`${baseUrl}/api/transactions/${id}`)
            let trxData = resTrx.data.payload

            if (trxData.status !== "pending" || trxData.user_id !== currentUser.id) {
                router.push("/")
                return
            }

            setTransaction(trxData)

            const bikePromise = trxData.orders.map(async item => {
                const resBike = await axios.get(`${baseUrl}/api/bikes/${item.BikeID}`)
                let bike = resBike.data.payload
                bike.quantity = item.Quantity
                return bike
            })

            const bikeData = await Promise.all(bikePromise)
            setBikes(bikeData)

            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
            console.error("fetch data error: ", error)
        }
    }

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <>
                        {
                            isError ?
                                <Error />
                                :
                                <main className="mt-[80px] container xl:max-w-[1280px] mx-auto py-10 px-5 xl:px-0">
                                    <section className="border border-accent rounded-md p-5 md:p-10 flex flex-col gap-8">
                                        <h1 className="text-[24px] md:text-[36px] font-semibold">gowesmart payment</h1>
                                        <div className="text-[12px] md:text-[16px]">
                                            <div className="flex flex-col md:flex-row justify-between">
                                                <p>Transaction ID : <span className="font-semibold">{transaction.id}</span></p>
                                                <p>Username : <span className="font-semibold">{currentUser.username}</span></p>
                                            </div>
                                            <div className="flex flex-col md:flex-row justify-between">
                                                <p>Transaction Date : <span className="font-semibold">{transaction.created_at}</span></p>
                                                <p>Email : <span className="font-semibold">{currentUser.email}</span></p>
                                            </div>
                                        </div>
                                        <table className="rounded-t-md overflow-hidden w-full text-left hidden md:inline-table">
                                            <thead className="bg-gray-dark">
                                                <tr>
                                                    <th className="p-7">No</th>
                                                    <th className="p-7">Product</th>
                                                    <th className="p-7">Quantity</th>
                                                    <th className="p-7">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    bikes.map((bike, index) => (
                                                        <tr key={index} className="border-b border-accent">
                                                            <td className="p-7">{index + 1}</td>
                                                            <td className="p-7 flex gap-7">
                                                                <Image src={bike.image_url} width={130} height={0} alt="bike" className="hidden md:inline-block" />
                                                                <div>
                                                                    <p className="font-semibold text-[20px] text-secondary">{bike.name}</p>
                                                                    <p className="max-h-[30px] md:max-w-[100px] xl:max-w-[300px] overflow-hidden">{bike.description} asdddddd ddddddddddddddd ddddddddddddddddddddddddddddddd ddddddddddddddddd dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
                                                                    <p>Rp {bike.price.toLocaleString("id-ID")}</p>
                                                                </div>
                                                            </td>
                                                            <td className="p-7">{bike.quantity}</td>
                                                            <td className="p-7">Rp {bike.price.toLocaleString("id-ID")}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        <div className="flex flex-col gap-3 md:hidden text-[12px]">
                                            {
                                                bikes.map((item, index) => (
                                                    <div key={index} className="border border-accent bg-gray-dark rounded-md p-3 flex gap-3">
                                                        <p>{index + 1}.</p>
                                                        <div>
                                                            <p>{item.name} (x{item.quantity})</p>
                                                            <p>Rp {item.price.toLocaleString("id-ID")}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="flex flex-col items-end text-[12px] md:text-[16px]">
                                            <p>Total Payment : <span className="font-semibold">Rp {transaction.total_price.toLocaleString("id-ID")}</span></p>
                                            <p>Status : <span className="font-semibold">{transaction.status}</span></p>
                                        </div>
                                    </section>
                                    <div className="mt-5 md:mt-10 flex flex-col-reverse md:flex-row justify-between gap-3 md:gap-5 text-[14px] md:text-[16px]">
                                        <Link href={"/"} className="border border-accent hover:bg-gray-dark duration-150 py-3 md:py-4 w-full md:w-[50%] rounded-md flex justify-center">Cancel</Link>
                                        <Link href={transaction.payment_link} className={`bg-secondary py-3 md:py-4 w-full md:w-[50%] rounded-md hover:opacity-80 flex justify-center duration-150`}>Pay Now</Link>
                                    </div>
                                </main>
                        }
                    </>
            }
        </>
    )
}

export default Payment