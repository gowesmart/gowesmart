"use client"

import Link from "next/link"
import { useState } from "react"

const Header = () => {
    const [isLight, setIsLight] = useState(true)
    const [isShake, setIsShake] = useState(false)

    const handleLight = () => {
        setIsLight(prev => !prev)
        setIsShake(true)

        setTimeout(() => {
            setIsShake(false)
        }, 500)
    }

    return (
        <header className={`bg-primary h-[80px] fixed top-0 right-0 left-0 ${isLight ? "shadow-secondary shadow-xl" : "shadow-md"} z-50`}>
            <nav className="container mx-auto h-full flex justify-between items-center xl:max-w-[1280px]">
                <Link href={"/"}><h1 className="text-[24px] font-semibold">gowesmart</h1></Link>
                <div className="flex gap-3">
                    <form className="relative">
                        <input placeholder="search for bikes...." type="text" className="border text-[16px] bg-primary border-accent py-2 pl-3 pr-10 w-[480px] outline-none rounded-md" />
                        <button className="absolute top-0 right-0 bottom-0 text-[16px] px-3" type="submit"><i aria-hidden className="fa-solid fa-search"></i></button>
                    </form>
                    <button onClick={handleLight} href={"/cart"} className={`py-2 px-3 text-[16px] ${isLight && "text-yellow-400"} rounded-md border border-accent`}><i aria-hidden className={`fa-solid fa-bolt ${isShake && "fa-shake"}`}></i></button>
                </div>
                <div className="flex gap-3 items-center">
                    <Link href={"/cart"} className="py-2 px-3 text-[16px] rounded-md border border-accent"><i aria-hidden className="fa-solid fa-cart-shopping"></i></Link>
                    <Link href={"/register"} className="py-2 px-5 text-[16px] rounded-md border border-accent">Register</Link>
                    <Link href={"/login"} className="py-2 px-7 text-[16px] bg-secondary rounded-md">Login</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header