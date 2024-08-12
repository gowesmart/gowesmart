"use client"

import Link from "next/link"

const Error = () => {
    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <div className="flex h-screen justify-center items-center px-5">
            <div className="flex flex-col justify-center items-center border border-accent p-10 rounded-md text-center">
                <i aria-hidden className="fa-solid fa-circle-xmark text-[64px] mb-2"></i>
                <p className="font-semibold text-[20px] mt-5">Oops Something Wrong!</p>
                <p>500 Internal Server Error</p>
                <Link href={"/"} className="bg-secondary w-full py-2 rounded-md mt-5 hover:opacity-80 duration-150">Home</Link>
                <button onClick={handleRefresh} className="border border-accent w-full py-2 rounded-md mt-2 hover:bg-gray-dark duration-150">Refresh</button>
            </div>
        </div>
    )
}

export default Error