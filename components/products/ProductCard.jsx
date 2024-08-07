import Link from "next/link"

const ProductCard = () => {
    return (
        <Link href={"/bikes/1"} className="w-[280px] h-[406px] rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] p-10 flex flex-col justify-center items-center">
            <div className="w-[200px] h-[200px] bg-slate-200"></div>
            <div className="w-full">
                <p className="text-[20px] font-semibold mt-3">brand - name</p>
                <p className="text-[14px]">description</p>
                <div className="flex justify-between items-center mt-5">
                    <div>
                        <p className="text-[20px] font-semibold">Rp 400.000</p>
                        <div className="flex text-[14px] justify-center items-center gap-2">
                            <i className="fa-solid fa-star text-yellow-400"></i>
                            <p>5 | 486 available</p>
                        </div>
                    </div>
                    <button className="border border-white hover:bg-secondary duration-150 rounded-md p-3 flex justify-center items-center">
                        <i className="fa-solid fa-cart-plus text-[16px]"></i>
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard