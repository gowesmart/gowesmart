"use client"

import Loading from "@/app/loading"
import useAuthStore from "@/store/authStore"
import { baseUrl } from "@/utils/constants"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Payment = () => {
    const { id } = useParams()
    const [transaction, setTransaction] = useState({})
    const [bikes, setBikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const { currentUser } = useAuthStore()
    const router = useRouter()

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
            const trxData = resTrx.data.payload
            setTransaction(trxData)

            trxData.orders.forEach(async item => {
                const resBike = await axios.get(`${baseUrl}/api/bikes/${item.BikeID}`)
                const bike = resBike.data.payload
                setBikes(prev => ([...prev, bike]))
            })

            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
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
                        <section className="border border-accent rounded-md p-10">
                            <h1>gowesmart payment</h1>
                            <div>
                                <div className="flex justify-between">
                                    <p>Transaction ID : {transaction.id}</p>
                                    <p>Username : {currentUser.username}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Transaction Date : {transaction.created_at}</p>
                                    <p>Email : {currentUser.email}</p>
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bikes.map((bike, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{bike.name}</td>
                                                <td>{bike.quantity}</td>
                                                <td>{bike.price}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <p>Total Payment : {transaction.total_price}</p>
                            <p>Status : {transaction.status}</p>
                        </section>
                    </main>
            }
        </>
    )
}

export default Payment