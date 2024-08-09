"use client"

import ProductCard from "@/components/products/ProductCard"
import { baseUrl } from "@/utils/constants"
import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../loading"
import Error from "../error"
import Pagination from "@/components/global/Pagination"
import useFilter from "@/store/filterStore"

const Bikes = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [page, setPage] = useState({ current: 1, total: 1, items: [] })
    const [bikes, setBikes] = useState([])
    const { filters, setFilters, clearFilters } = useFilter()
    const [adaptFilter, setAdaptFilter] = useState(0)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
        fetchData()
    }, [page.current])

    useEffect(() => {
        if (filters.marker) {
            window.scrollTo({ top: 0, behavior: "auto" });
            fetchData(1)
            setFilters({ marker: false })
        }
    }, [filters.marker])

    const fetchData = async (currentPage) => {
        setIsLoading(true)

        try {
            const res = await axios.get(`${baseUrl}/api/bikes?limit=9&page=${currentPage ? currentPage : page.current}&name=${filters.name}&category_id=${filters.categoryId.value}&min_price=${filters.minPrice.value}&max_price=${filters.maxPrice.value}&min_year=${filters.minYear.value}&max_year=${filters.maxYear.value}`)
            setBikes(res.data.payload)

            const totalPages = res.data.metadata.total_pages
            let pages = []
            if (page.current % 2 !== 0) {
                for (let i = 1; i <= totalPages; i++) {
                    if (i === page.current || i === page.current + 1) {
                        pages.push(i)
                    }
                }
            } else {
                pages = page.items
            }

            setPage(prev => ({
                ...prev,
                current: currentPage ? currentPage : prev.current,
                total: totalPages === 0 ? 1 : totalPages,
                items: pages
            }))
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsError(true)
            setIsLoading(false)
        }
    }

    const handleFilter = (e, field) => {
        let value = e.target.value

        if (/^\d*$/.test(value)) {
            if (value[0] == 0) {
                return
            }

            if (value != "") {
                if (filters[field].isAdapt === false) {
                    setAdaptFilter(prev => prev + 1)
                }

                setFilters({ [field]: { value, isAdapt: true } })
            } else {
                if (filters[field].isAdapt === true) {
                    setAdaptFilter(prev => prev - 1)
                }

                setFilters({ [field]: { value, isAdapt: false } })
            }
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
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        setFilters({ marker: true })
                                    }} className="w-[280px] bg-[#252525] border border-accent rounded-md gap-5 p-7 flex flex-col justify-center items-center h-fit">
                                        <div className="w-full flex flex-col gap-2">
                                            <label>category</label>
                                            <select className="bg-[#434343] rounded-md py-2 px-3">
                                                <option>all category</option>
                                            </select>
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <label>min price</label>
                                            <input onChange={(e) => { handleFilter(e, "minPrice") }} value={filters.minPrice.value} type="text" placeholder="0" className="bg-[#434343] rounded-md py-2 px-3" />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <label>max price</label>
                                            <input onChange={(e) => { handleFilter(e, "maxPrice") }} value={filters.maxPrice.value} type="text" placeholder="0" className="bg-[#434343] rounded-md py-2 px-3" />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <label>min year</label>
                                            <input onChange={(e) => { handleFilter(e, "minYear") }} value={filters.minYear.value} type="text" placeholder="0" className="bg-[#434343] rounded-md py-2 px-3" />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <label>max year</label>
                                            <input onChange={(e) => { handleFilter(e, "maxYear") }} value={filters.maxYear.value} type="text" placeholder="0" className="bg-[#434343] rounded-md py-2 px-3" />
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <p className="text-secondary">adapt filter ({adaptFilter})</p>
                                            <button type="button" onClick={() => {
                                                clearFilters()
                                                setAdaptFilter(0)
                                            }} className="font-light underline hover:opacity-80">clear all</button>
                                        </div>
                                        <button type="submit" className="w-full bg-secondary rounded-md py-2">apply</button>
                                    </form>
                                    <div className="w-full">
                                        <h1 className="text-[32px] font-semibold mb-5">products</h1>
                                        <div className="grid grid-cols-3 justify-items-stretch gap-7 mb-10">
                                            {
                                                bikes.map((bike, index) => (
                                                    <ProductCard key={index} bike={bike} />
                                                ))
                                            }
                                        </div>
                                        {
                                            bikes.length === 0 ?
                                                <p>No products found.</p>
                                                :
                                                <Pagination current={page.current} total={page.total} items={page.items} setPage={setPage} />
                                        }
                                    </div>
                                </main>
                        }
                    </>
            }
        </>
    )
}

export default Bikes