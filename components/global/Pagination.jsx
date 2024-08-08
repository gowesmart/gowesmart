'use client'

import { useEffect } from "react"

const Pagination = ({ current, total, items, setPage }) => {

    useEffect(() => {
        if (current > items[1] || items.length === 0) {
            generatePages("next")
        } else if (current < items[0]) {
            generatePages("prev")
        }
    }, [current])

    const generatePages = (action) => {
        const pages = []

        for (let i = 1; i <= total; i++) {
            if (action === "next") {
                if (i === current || i === current + 1) {
                    pages.push(i)
                }
            } else {
                if (i === current - 1 || i === current) {
                    pages.push(i)
                }
            }
        }

        setPage(prev => ({ ...prev, items: pages }))
    }

    const handlePrev = () => {
        if (current !== 1) {
            setPage(prev => ({ ...prev, current: prev.current - 1 }))
        }
    }

    const handleNext = () => {
        if (current !== total) {
            setPage(prev => ({ ...prev, current: prev.current + 1 }))
        }
    }

    return (
        <div className="mt-5 flex justify-end gap-2 text-[14px]">
            <button onClick={handlePrev} className="border border-accent hover:bg-[#434343] duration-150 w-[80px] h-[40px] flex justify-center items-center rounded-md">prev</button>
            {current > 2 && <div className={`border border-accent w-[40px] h-[40px] flex justify-center items-center rounded-md`}>...</div>}
            {
                items.map((item, index) => (
                    <button onClick={() => { setPage(prev => ({ ...prev, current: item })) }} key={index} className={`border border-accent ${item === current ? "bg-secondary" : "hover:bg-[#434343] duration-150"} w-[40px] h-[40px] flex justify-center items-center rounded-md`}>{item}</button>
                ))
            }
            {(current !== total && (current !== total - 1 || current % 2 === 0)) && <div className={`border border-accent w-[40px] h-[40px] flex justify-center items-center rounded-md`}>...</div>}
            <button onClick={handleNext} className="border border-accent hover:bg-[#434343] duration-150 w-[80px] h-[40px] flex justify-center items-center rounded-md">next</button>
        </div >
    )
}

export default Pagination