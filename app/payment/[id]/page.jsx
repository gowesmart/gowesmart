"use client"

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
    const [isError, setIsError] = useState(false)
    const { currentUser, token } = useAuthStore()
    const router = useRouter()
    const [payment, setPayment] = useState({
        isLoading: false,
        isFinished: false,
        status: "",
        title: "",
        message: ""
    })

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
            console.error(error)
        }
    }

    const handlePayment = async () => {
        setPayment(prev => ({ ...prev, isLoading: true }))

        try {
            await axios.patch(`${baseUrl}/api/transactions/payment/${transaction.id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            setPayment({
                isLoading: false,
                isFinished: true,
                status: "success",
                title: "Payment Success!",
                message: "Your transaction has been successfully completed."
            })
        } catch (error) {
            setPayment({
                isLoading: false,
                isFinished: true,
                status: "error",
                title: "Payment Failed!",
                message: "We're sorry, your transaction could not be completed."
            })
            console.error(error)
        }
    }

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <main className="mt-[80px] container xl:max-w-[1280px] mx-auto py-10">
                        <section className="border border-accent rounded-md p-10 flex flex-col gap-8">
                            <h1 className="text-[36px] font-semibold">gowesmart payment</h1>
                            <div>
                                <div className="flex justify-between">
                                    <p>Transaction ID : <span className="font-semibold">{transaction.id}</span></p>
                                    <p>Username : <span className="font-semibold">{currentUser.username}</span></p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Transaction Date : <span className="font-semibold">{transaction.created_at}</span></p>
                                    <p>Email : <span className="font-semibold">{currentUser.email}</span></p>
                                </div>
                            </div>
                            <table className="rounded-t-md overflow-hidden text-left">
                                <thead className="bg-gray-dark">
                                    <tr>
                                        <th className="p-7">No</th>
                                        <th className="p-7 w-fit">Product</th>
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
                                                    <Image src={bike.image_url} width={130} height={130} alt="bike" />
                                                    <div>
                                                        <p className="font-semibold text-[20px] text-secondary">{bike.name}</p>
                                                        <p>{bike.description}</p>
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
                            <div className="flex flex-col items-end">
                                <p>Total Payment : <span className="font-semibold">Rp {transaction.total_price.toLocaleString("id-ID")}</span></p>
                                <p>Status : <span className="font-semibold">{transaction.status}</span></p>
                            </div>
                        </section>
                        <div className="mt-10 flex justify-between gap-5">
                            <Link href={"/"} className="border border-accent hover:bg-gray-dark duration-150 py-4 w-[50%] rounded-md flex justify-center">Cancel</Link>
                            <button onClick={handlePayment} className={`bg-secondary py-4 w-[50%] rounded-md hover:opacity-80 duration-150 ${payment.isLoading && "opacity-80 cursor-default"}`}>{payment.isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Pay Now"}</button>
                        </div>
                        {payment.isFinished && <Popup title={payment.title} type={payment.status} message={payment.message} children={
                            payment.status === "success" ?
                                <Link onClick={() => { setPayment(prev => ({ ...prev, isFinished: false })) }} href={"/"} className="bg-secondary w-full text-white py-2 rounded-md hover:opacity-80 duration-150 text-center">Ok</Link>
                                :
                                <button className="bg-secondary w-full text-white py-2 rounded-md hover:opacity-80 duration-150 text-center" onClick={() => { setPayment(prev => ({ ...prev, isFinished: false })) }}>Ok</button>
                        } />
                        }
                    </main>
            }
        </>
    )
}

export default Payment