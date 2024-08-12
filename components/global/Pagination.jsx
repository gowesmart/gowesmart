const Pagination = ({ current, total, items, setPage }) => {
    const handlePrev = () => {
        if (current !== 1) {
            setPage(prev => ({ ...prev, current: prev.current - 1 }))
        }
    }

    const handleNext = () => {
        if (current !== total) {
            setPage(prev => ({ ...prev, current: prev.current + 1 }))
        }
    }

    return (
        <div className="mt-5 flex justify-center md:justify-end gap-2 text-[10px] md:text-[14px]">
            <button onClick={handlePrev} className="border border-accent hover:bg-[#434343] duration-150 w-[60px] h-[30px] md:w-[80px] md:h-[40px] flex justify-center items-center rounded-md">prev</button>
            {current > 2 && <div className={`border border-accent w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex justify-center items-center rounded-md`}>...</div>}
            {
                items.map((item, index) => (
                    <button onClick={() => { setPage(prev => ({ ...prev, current: item })) }} key={index} className={`border border-accent ${item === current ? "bg-secondary" : "hover:bg-[#434343] duration-150"} w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex justify-center items-center rounded-md`}>{item}</button>
                ))
            }
            {(current !== total && (current !== total - 1 || current % 2 === 0)) && <div className={`border border-accent w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex justify-center items-center rounded-md`}>...</div>}
            <button onClick={handleNext} className="border border-accent hover:bg-[#434343] duration-150 w-[60px] h-[30px] md:w-[80px] md:h-[40px] flex justify-center items-center rounded-md">next</button>
        </div >
    )
}

export default Pagination