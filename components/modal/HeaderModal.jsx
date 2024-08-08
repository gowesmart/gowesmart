import Link from "next/link"

const HeaderModal = ({ isModal, setIsModal, handleLogout, role }) => {
    return (
        <section onClick={() => { setIsModal(false) }} className={`fixed inset-0 bg-black bg-opacity-5 ${isModal ? "modal-in" : "modal-out"}`}>
            <div className='container xl:max-w-[1280px] mx-auto relative mt-[80px]'>
                <div className={`bg-primary flex flex-col shadow-2xl text-[14px] absolute top-0 right-0 mt-[15px] p-10 rounded-md border border-accent ${isModal ? "header-modal-in" : "header-modal-out"}`}>
                    {
                        role === "USER" ?
                            <>
                                <Link href={"/profile"} className='flex items-center rounded-md hover:bg-secondary duration-150'>
                                    <div className='flex justify-center items-center w-[50px] h-[50px]'><i className='fa-solid fa-user'></i></div>
                                    <p className='font-semibold text-left pr-[25px]'>Profile</p>
                                </Link>
                                <Link href={"/cart"} className='flex items-center rounded-md hover:bg-secondary duration-150'>
                                    <div className='flex justify-center items-center w-[50px] h-[50px]'><i className='fa-solid fa-cart-shopping'></i></div>
                                    <p className='font-semibold text-left pr-[25px]'>Shopping Cart</p>
                                </Link>
                                <Link href={"/history"} className='flex rounded-md hover:bg-secondary duration-150 items-center'>
                                    <div className='flex justify-center items-center w-[50px] h-[50px]'><i className='fa-solid fa-history'></i></div>
                                    <p className='font-semibold text-left pr-[25px]'>History</p>
                                </Link>
                            </>
                            :
                            <>
                                <Link href={"/dashboard/user"} className='flex items-center rounded-md hover:bg-secondary duration-150'>
                                    <div className='flex justify-center items-center w-[50px] h-[50px]'><i className='fa-solid fa-user'></i></div>
                                    <p className='font-semibold text-left pr-[25px]'>User</p>
                                </Link>
                                <Link href={"/dashboard/bike"} className='flex items-center rounded-md hover:bg-secondary duration-150'>
                                    <div className='flex justify-center items-center w-[50px] h-[50px]'><i className='fa-solid fa-gear'></i></div>
                                    <p className='font-semibold text-left pr-[25px]'>Bike</p>
                                </Link>
                                <Link href={"/dashboard/category"} className='flex items-center rounded-md hover:bg-secondary duration-150'>
                                    <div className='flex justify-center items-center w-[50px] h-[50px]'><i className='fa-solid fa-layer-group'></i></div>
                                    <p className='font-semibold text-left pr-[25px]'>Category</p>
                                </Link>
                                <Link href={"/dashboard/transaction"} className='flex items-center rounded-md hover:bg-secondary duration-150'>
                                    <div className='flex justify-center items-center w-[50px] h-[50px]'><i className='fa-solid fa-receipt'></i></div>
                                    <p className='font-semibold text-left pr-[25px]'>Transaction</p>
                                </Link>
                                <Link href={"/dashboard/review"} className='flex items-center rounded-md hover:bg-secondary duration-150'>
                                    <div className='flex justify-center items-center w-[50px] h-[50px]'><i className='fa-solid fa-comments'></i></div>
                                    <p className='font-semibold text-left pr-[25px]'>Review</p>
                                </Link>
                            </>
                    }
                    <button onClick={handleLogout} className='flex items-center rounded-md hover:bg-secondary hover:text-white duration-150 text-[#FF0000]'>
                        <div className='flex justify-center items-center w-[50px] h-[50px]'><i className='fa-solid fa-right-from-bracket'></i></div>
                        <p className='font-bold text-left pr-[25px]'>Logout</p>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HeaderModal