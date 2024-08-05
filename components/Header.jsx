"use client"

import Link from "next/link"

const Header = () => {
    return (
        <header className="bg-primary h-[80px] fixed top-0 right-0 left-0 shadow-md z-50">
            <nav className="container mx-auto h-full flex justify-between items-center">
                <Link href={"/"}><h1 className="text-[24px] font-semibold">gowesmart</h1></Link>
                <div className="relative">
                    <input placeholder="search for bikes...." type="text" className="border bg-primary border-accent py-1 px-2 w-[480px] outline-none rounded-md" />
                </div>
                <div className="flex gap-5 items-center">
                    <Link href={"/register"} className="py-1 px-5 rounded-md border border-accent">Register</Link>
                    <Link href={"/login"} className="py-1 px-7 bg-secondary rounded-md">Login</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header