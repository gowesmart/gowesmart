const Quantity = ({ quantity, setQuantity, stock }) => {
    return (
        <div className="flex gap-2">
            <button onClick={() => {
                if (quantity !== 0) {
                    setQuantity(prev => prev - 1)
                }
            }} className="flex hover:bg-gray-dark duration-150 justify-center items-center w-[35px] h-[35px] border border-accent"><i aria-hidden className="fa-solid fa-minus"></i></button>
            <div className="flex cursor-default justify-center items-center w-[35px] h-[35px] border border-accent">{quantity}</div>
            <button onClick={() => {
                if (quantity !== stock) {
                    setQuantity(prev => prev + 1)
                }
            }} className="flex hover:bg-gray-dark duration-150 justify-center items-center w-[35px] h-[35px] border border-accent"><i aria-hidden className="fa-solid fa-plus"></i></button>
        </div>
    )
}

export default Quantity