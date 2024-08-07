const Review = () => {
    return (
        <div className="w-full rounded-md flex flex-col justify-center p-11 gap-5 border border-accent">
            <div className="flex items-center gap-5">
                <div className="w-[50px] h-[50px] border border-accent flex justify-center items-center rounded-md"><i aria-hidden className="fa-solid fa-user"></i></div>
                <div className="flex flex-col justify-center h-[50px]">
                    <p className="text-[20px]">username</p>
                    <div className="flex gap-2 items-center text-[12px]">
                        <div className="flex gap-1">
                            <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                            <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                            <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                            <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                            <i aria-hidden className="fa-solid fa-star text-gray"></i>
                        </div>
                        <p>(4)</p>
                    </div>
                </div>
            </div>
            <div className="bg-primary border border-accent h-[220px]"></div>
        </div>
    )
}

export default Review