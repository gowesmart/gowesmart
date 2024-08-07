"use client"

import Error from "@/app/error"
import Loading from "@/app/loading"
import BikeDetails from "@/components/products/BikeDetails"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const page = () => {
    const { id } = useParams()
    const apiUrl = "https://api-gowesmart.vercel.app"
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [bike, setBike] = useState({})
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [bikeRes, reviewRes] = await Promise.all([
                axios.get(`${apiUrl}/api/bikes/${id}`),
                axios.get(`${apiUrl}/api/bikes/${id}/reviews`)
            ])
            setBike(bikeRes.data.payload)
            setReviews(reviewRes.data.payload)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsError(true)
            setIsLoading(false)
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
                                <BikeDetails bike={bike} reviews={reviews} />
                        }
                    </>
            }
        </>
    )
}

export default page