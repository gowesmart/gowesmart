"use client"

import { useEffect } from "react"

const BikeDetails = ({ bike, reviews }) => {
    useEffect(() => {
        console.log("speda", bike)
        console.log("review", reviews)
    })

    return (
        <div>BikeDetails</div>
    )
}

export default BikeDetails