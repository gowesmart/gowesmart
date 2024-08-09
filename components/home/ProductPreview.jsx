"use client"

import Link from "next/link"
import BigProductCard from "./BigProductCard"
import SmallProductCard from "./SmallProductCard"

const ProductPreview = ({ bikes }) => {
    return (
        <section className="py-8 flex flex-col justify-between items-center gap-5">
            <h2 className="w-full text-left text-[24px] font-bold">our products</h2>
            <div className="flex gap-8 justify-between w-full">
                <BigProductCard bike={bikes[0]} />
                <div className="flex flex-col justify-between gap-5 w-full">
                    <div className="flex justify-between gap-5">
                        {
                            bikes.slice(1, 5).map((item, index) => (
                                <SmallProductCard bike={item} key={index} />
                            ))
                        }
                    </div>
                    <div className="flex justify-between gap-5">
                        {
                            bikes.slice(5, 9).map((item, index) => (
                                <SmallProductCard bike={item} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-end w-full">
                <Link href={"/bikes"} className="py-2 px-7 bg-secondary rounded-md mt-5">more products</Link>
            </div>
        </section>
    )
}

export default ProductPreview