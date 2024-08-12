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
    const { filters, setFilters, clearFilters, adaptFilter, increaseAdaptFilter, decreaseAdaptFilter } = useFilter()
    const [categories, setCategories] = useState([])
    const [isFilter, setIsFilter] = useState(false)

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
            const [res, categoryRes] = await Promise.all([
                axios.get(`${baseUrl}/api/bikes?limit=9&page=${currentPage ? currentPage : page.current}&name=${filters.name}&category_id=${filters.categoryId.value}&min_price=${filters.minPrice.value}&max_price=${filters.maxPrice.value}&min_year=${filters.minYear.value}&max_year=${filters.maxYear.value}`),
                axios.get(`${baseUrl}/api/categories`)
            ])

            setCategories(categoryRes.data.payload)

            const avaliableBikes = []
            res.data.payload.forEach((item) => {
                if (item.stock != 0) {
                    avaliableBikes.push(item)
                }
            })

            setBikes(avaliableBikes)

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
            if (field != "categoryId") {
                if (value[0] == 0) {
                    return
                }
            }

            if (value != "" && value != 0) {
                if (filters[field].isAdapt === false) {
                    increaseAdaptFilter()
                }

                setFilters({ [field]: { value, isAdapt: true } })
            } else {
                if (filters[field].isAdapt === true) {
                    decreaseAdaptFilter(prev => prev - 1)
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
                                <main className="mt-[80px] container xl:max-w-[1280px] mx-auto pt-10 pb-24 flex flex-col xl:flex-row gap-5 xl:gap-10 px-5 xl:px-0">
                                    <button onClick={() => { setIsFilter(prev => !prev) }} className="inline-block xl:hidden bg-secondary text-[14px] py-2 w-full hover:opacity-80 duration-150 rounded-md">Filter ({adaptFilter})</button>
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        setFilters({ marker: true })
                                    }} className={`w-full xl:w-[280px] bg-[#252525] border border-accent rounded-md gap-5 p-7 ${isFilter ? "flex duration-200" : "hidden"} xl:flex flex-col justify-center items-center h-fit`}>
                                        <div className="w-full flex flex-col gap-2">
                                            <label>category</label>
                                            <select onChange={(e) => { handleFilter(e, "categoryId") }} value={filters.categoryId.value} className="bg-[#434343] rounded-md py-2 px-3">
                                                <option value={0}>All</option>
                                                {
                                                    categories.map((item, index) => (
                                                        <option key={index} value={item.ID}>{item.Name}</option>
                                                    ))
                                                }
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
                                            }} className="font-light underline hover:opacity-80">clear all</button>
                                        </div>
                                        <button type="submit" className="w-full bg-secondary rounded-md py-2">apply</button>
                                    </form>
                                    <div className="w-full">
                                        <h1 className="text-[24px] md::text-[32px] font-semibold mb-5">products</h1>
                                        <div className="grid grid-cols-2 md:grid-cols-3 justify-items-stretch gap-3 xl:gap-7 mb-10">
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