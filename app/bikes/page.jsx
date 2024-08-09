"use client"

import ProductCard from "@/components/products/ProductCard"
import { baseUrl } from "@/utils/constants"
import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../loading"
import Error from "../error"
import Pagination from "@/components/global/Pagination"

const Bikes = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [page, setPage] = useState({ current: 1, total: 1, items: [] })
    const [bikes, setBikes] = useState([])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
        fetchData()
    }, [page.current])

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const res = await axios.get(`${baseUrl}/api/bikes?limit=9&page=${page.current}`)
            setBikes(res.data.payload)
            setPage(prev => ({ ...prev, total: res.data.metadata.total_pages }))
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
                                <main className="mt-[80px] container xl:max-w-[1280px] mx-auto pt-10 pb-24 flex gap-10">
                                    <aside className="w-[280px] bg-[#252525] border border-accent rounded-md gap-5 p-7 flex flex-col justify-center items-center h-fit">
                                        <div className="w-full flex flex-col gap-2">
                                            <label>category</label>
                                            <select className="bg-[#434343] rounded-md py-2 px-3">
                                                <option>all category</option>
                                            </select>
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <label>min price</label>
                                            <input type="number" placeholder="0" className="bg-[#434343] rounded-md py-2 px-3" />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <label>max price</label>
                                            <input type="number" placeholder="0" className="bg-[#434343] rounded-md py-2 px-3" />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <label>min year</label>
                                            <input type="number" placeholder="0" className="bg-[#434343] rounded-md py-2 px-3" />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <label>max year</label>
                                            <input type="number" placeholder="0" className="bg-[#434343] rounded-md py-2 px-3" />
                                        </div>
                                        <p className="text-secondary w-full text-left">adapt filter (0)</p>
                                        <button className="w-full bg-secondary rounded-md py-2">apply</button>
                                    </aside>
                                    <div className="w-full">
                                        <h1 className="text-[32px] font-semibold mb-5">products</h1>
                                        <div className="grid grid-cols-3 justify-items-stretch gap-7 mb-10">
                                            {
                                                bikes.map((bike, index) => (
                                                    <ProductCard key={index} bike={bike} />
                                                ))
                                            }
                                        </div>
                                        <Pagination current={page.current} total={page.total} items={page.items} setPage={setPage} />
                                    </div>
                                </main>
                        }
                    </>
            }
        </>
    )
}

export default Bikes