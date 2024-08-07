"use client"

import Error from "@/app/error"
import Loading from "@/app/loading"
import BikeDetails from "@/components/products/BikeDetails"
import { baseUrl } from "@/utils/constants"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const page = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [bike, setBike] = useState({})
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [bikeRes, reviewRes, categoryRes] = await Promise.all([
                axios.get(`${baseUrl}/api/bikes/${id}`),
                axios.get(`${baseUrl}/api/bikes/${id}/reviews`),
                axios.get(`${baseUrl}/api/categories/`)
            ])

            let singleBike = bikeRes.data.payload
            categoryRes.data.payload.forEach(category => {
                if (category.ID === singleBike.category_id) {
                    singleBike.category = category.Name
                }
            })

            setBike(singleBike)
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