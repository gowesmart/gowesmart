"use client"

import Link from "next/link"

const Header = () => {
    return (
        <header className="bg-primary h-[80px] fixed top-0 right-0 left-0 shadow-md z-50">
            <nav className="container mx-auto h-full flex justify-between items-center">
                <Link href={"/"}><h1 className="text-[24px] font-semibold">gowesmart</h1></Link>
                <form className="relative">
                    <input placeholder="search for bikes...." type="text" className="border text-[16px] bg-primary border-accent py-2 pl-3 pr-10 w-[480px] outline-none rounded-md" />
                    <button className="absolute top-0 right-0 bottom-0 text-[16px] px-3" type="submit"><i className="fa-solid fa-search"></i></button>
                </form>
                <div className="flex gap-3 items-center">
                    <Link href={"/cart"} className="py-2 px-3 text-[16px] rounded-md border border-accent"><i className="fa-solid fa-cart-shopping"></i></Link>
                    <Link href={"/register"} className="py-2 px-5 text-[16px] rounded-md border border-accent">Register</Link>
                    <Link href={"/login"} className="py-2 px-7 text-[16px] bg-secondary rounded-md">Login</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header