"use client"

import Loading from "@/app/loading"
import useAuthStore from "@/store/authStore"
import { baseUrl } from "@/utils/constants"
import axios from "axios"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PaymentProcess = () => {
    const searchParams = useSearchParams()
    const order_id = searchParams.get("order_id")
    const status_code = searchParams.get("status_code")
    const transaction_status = searchParams.get("transaction_status")
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdated, setIsUpdated] = useState(false)
    const { token } = useAuthStore()

    useEffect(() => {
        if (!order_id || !token || !status_code || !transaction_status) {
            router.push("/")
            return
        }

        handlePayment()
    }, [])

    const handlePayment = async () => {
        try {
            const res = await axios.patch(`${baseUrl}/api/transactions/payment/${order_id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            console.log("trx", res)
            setIsUpdated(true)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <main className="mt-[80px] min-h-[90vh] container xl:w-[1280px] mx-auto py-10 flex justify-center items-center px-5">
                        <div className="border border-accent rounded-md p-10 flex flex-col justify-center items-center text-center max-w-[300px]">
                            <i className={`fa-solid ${isUpdated ? "fa-circle-check text-green-500" : "fa-circle-xmark text-red-500"} text-[50px]`}></i>
                            <h1 className="font-semibold text-[24px] text-secondary mt-5 w-full">{isUpdated ? "Payment Success!" : "Payment Failed!"}</h1>
                            <p className="font-light w-full">{isUpdated ? "Your transaction has been successfully completed." : "We're sorry, your transaction could not be completed."}</p>
                            <Link href={"/"} className="bg-secondary py-2 rounded-md w-full flex justify-center font-semibold mt-5 hover:opacity-80 duration-150">Home</Link>
                            {!isUpdated && <button onClick={handleRefresh} className="border border-accent py-2 rounded-md w-full flex justify-center font-semibold mt-2 hover:bg-gray-dark duration-150">Try Again</button>}
                        </div>
                    </main>
            }
        </>
    )
}

export default PaymentProcess