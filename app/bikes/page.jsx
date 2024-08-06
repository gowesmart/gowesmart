import ProductCard from "@/components/products/ProductCard"
import Link from "next/link"

const Bikes = () => {
    return (
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
                <div className="flex flex-wrap justify-between gap-14">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
                <div className="mt-14 flex justify-end gap-3">
                    <button className="bg-[#434343] py-2 px-7 font-semibold rounded-md">prev</button>
                    <button className="bg-secondary py-2 px-4 font-semibold rounded-md">1</button>
                    <button className="bg-[#434343] py-2 px-4 font-semibold rounded-md">2</button>
                    <button className="bg-[#434343] py-2 px-4 font-semibold rounded-md">...</button>
                    <button className="bg-[#434343] py-2 px-7 font-semibold rounded-md">next</button>
                </div>
            </div>
        </main>
    )
}

export default Bikes