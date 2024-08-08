const Quantity = () => {
    return (
        <div className="flex gap-2">
            <div className="flex justify-center items-center w-[35px] h-[35px] border border-accent"><i aria-hidden className="fa-solid fa-minus"></i></div>
            <div className="flex justify-center items-center w-[35px] h-[35px] border border-accent">0</div>
            <div className="flex justify-center items-center w-[35px] h-[35px] border border-accent"><i aria-hidden className="fa-solid fa-plus"></i></div>
        </div>
    )
}

export default Quantity