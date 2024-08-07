"use client"

import { useParams } from "next/navigation"

const getId = () => {
    const { id } = useParams()
    return id
}

const page = () => {
    const id = getId()

    return (
        <div className="mt-[100px]">path = {id}</div>
    )
}

export default page