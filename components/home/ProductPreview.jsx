"use client"

import Link from "next/link"

const ProductPreview = () => {
    return (
        <section className="py-8 flex flex-col justify-between items-center gap-5">
            <h2 className="w-full text-left text-[24px] font-bold">our products</h2>
            <div className="flex gap-8 justify-between w-full">
                <div className="w-[390px] h-[550px] p-10 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] flex flex-col justify-center items-start">
                    <div className="w-[315px] h-[315px] bg-slate-300 mb-3"></div>
                    <p className="font-semibold text-[20px]">brand - name</p>
                    <p className="text-[14px]">description</p>
                    <div className="w-full flex justify-between items-center mt-5">
                        <div>
                            <p className="font-semibold text-[20px]">Rp 400.000</p>
                            <div className="flex text-[14px] justify-center items-center gap-2">
                                <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                                <p>5 | 486 available</p>
                            </div>
                        </div>
                        <div className="border border-white rounded-md p-4 flex justify-center items-center">
                            <i aria-hidden className="fa-solid fa-cart-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between gap-5 w-full">
                    <div className="flex justify-between gap-5">
                        <div className="w-[190px] h-[260px] p-5 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] flex flex-col justify-center items-start">
                            <div className="w-[150px] h-[130px] bg-slate-300"></div>
                            <p className="text-[14px] mt-2">brand - name</p>
                            <div className="w-full flex justify-between items-center mt-3">
                                <div>
                                    <p className="font-semibold text-[14px]">Rp 400.000</p>
                                    <div className="flex text-[10px] justify-center items-center gap-2">
                                        <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                                        <p>5 | 486 available</p>
                                    </div>
                                </div>
                                <div className="border border-white rounded-md p-2 flex justify-center items-center">
                                    <i aria-hidden className="fa-solid fa-cart-plus text-[10px]"></i>
                                </div>
                            </div>
                        </div>
                        <div className="w-[190px] h-[260px] p-5 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] flex flex-col justify-center items-start">
                            <div className="w-[150px] h-[130px] bg-slate-300"></div>
                            <p className="text-[14px] mt-2">brand - name</p>
                            <div className="w-full flex justify-between items-center mt-3">
                                <div>
                                    <p className="font-semibold text-[14px]">Rp 400.000</p>
                                    <div className="flex text-[10px] justify-center items-center gap-2">
                                        <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                                        <p>5 | 486 available</p>
                                    </div>
                                </div>
                                <div className="border border-white rounded-md p-2 flex justify-center items-center">
                                    <i aria-hidden className="fa-solid fa-cart-plus text-[10px]"></i>
                                </div>
                            </div>
                        </div>
                        <div className="w-[190px] h-[260px] p-5 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] flex flex-col justify-center items-start">
                            <div className="w-[150px] h-[130px] bg-slate-300"></div>
                            <p className="text-[14px] mt-2">brand - name</p>
                            <div className="w-full flex justify-between items-center mt-3">
                                <div>
                                    <p className="font-semibold text-[14px]">Rp 400.000</p>
                                    <div className="flex text-[10px] justify-center items-center gap-2">
                                        <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                                        <p>5 | 486 available</p>
                                    </div>
                                </div>
                                <div className="border border-white rounded-md p-2 flex justify-center items-center">
                                    <i aria-hidden className="fa-solid fa-cart-plus text-[10px]"></i>
                                </div>
                            </div>
                        </div>
                        <div className="w-[190px] h-[260px] p-5 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] flex flex-col justify-center items-start">
                            <div className="w-[150px] h-[130px] bg-slate-300"></div>
                            <p className="text-[14px] mt-2">brand - name</p>
                            <div className="w-full flex justify-between items-center mt-3">
                                <div>
                                    <p className="font-semibold text-[14px]">Rp 400.000</p>
                                    <div className="flex text-[10px] justify-center items-center gap-2">
                                        <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                                        <p>5 | 486 available</p>
                                    </div>
                                </div>
                                <div className="border border-white rounded-md p-2 flex justify-center items-center">
                                    <i aria-hidden className="fa-solid fa-cart-plus text-[10px]"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="w-[190px] h-[260px] p-5 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] flex flex-col justify-center items-start">
                            <div className="w-[150px] h-[130px] bg-slate-300"></div>
                            <p className="text-[14px] mt-2">brand - name</p>
                            <div className="w-full flex justify-between items-center mt-3">
                                <div>
                                    <p className="font-semibold text-[14px]">Rp 400.000</p>
                                    <div className="flex text-[10px] justify-center items-center gap-2">
                                        <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                                        <p>5 | 486 available</p>
                                    </div>
                                </div>
                                <div className="border border-white rounded-md p-2 flex justify-center items-center">
                                    <i aria-hidden className="fa-solid fa-cart-plus text-[10px]"></i>
                                </div>
                            </div>
                        </div>
                        <div className="w-[190px] h-[260px] p-5 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] flex flex-col justify-center items-start">
                            <div className="w-[150px] h-[130px] bg-slate-300"></div>
                            <p className="text-[14px] mt-2">brand - name</p>
                            <div className="w-full flex justify-between items-center mt-3">
                                <div>
                                    <p className="font-semibold text-[14px]">Rp 400.000</p>
                                    <div className="flex text-[10px] justify-center items-center gap-2">
                                        <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                                        <p>5 | 486 available</p>
                                    </div>
                                </div>
                                <div className="border border-white rounded-md p-2 flex justify-center items-center">
                                    <i aria-hidden className="fa-solid fa-cart-plus text-[10px]"></i>
                                </div>
                            </div>
                        </div>
                        <div className="w-[190px] h-[260px] p-5 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] flex flex-col justify-center items-start">
                            <div className="w-[150px] h-[130px] bg-slate-300"></div>
                            <p className="text-[14px] mt-2">brand - name</p>
                            <div className="w-full flex justify-between items-center mt-3">
                                <div>
                                    <p className="font-semibold text-[14px]">Rp 400.000</p>
                                    <div className="flex text-[10px] justify-center items-center gap-2">
                                        <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                                        <p>5 | 486 available</p>
                                    </div>
                                </div>
                                <div className="border border-white rounded-md p-2 flex justify-center items-center">
                                    <i aria-hidden className="fa-solid fa-cart-plus text-[10px]"></i>
                                </div>
                            </div>
                        </div>
                        <div className="w-[190px] h-[260px] p-5 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] flex flex-col justify-center items-start">
                            <div className="w-[150px] h-[130px] bg-slate-300"></div>
                            <p className="text-[14px] mt-2">brand - name</p>
                            <div className="w-full flex justify-between items-center mt-3">
                                <div>
                                    <p className="font-semibold text-[14px]">Rp 400.000</p>
                                    <div className="flex text-[10px] justify-center items-center gap-2">
                                        <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                                        <p>5 | 486 available</p>
                                    </div>
                                </div>
                                <div className="border border-white rounded-md p-2 flex justify-center items-center">
                                    <i aria-hidden className="fa-solid fa-cart-plus text-[10px]"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end w-full">
                <Link href={"/bikes"} className="py-2 px-5 bg-secondary rounded-md mt-5">more products</Link>
            </div>
        </section>
    )
}

export default ProductPreview