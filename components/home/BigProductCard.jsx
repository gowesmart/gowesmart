import Image from "next/image"
import Link from "next/link"

const BigProductCard = ({ bike }) => {
    return (
        <Link href={`/bikes/${bike.id}`} className="w-[600px] h-[550px] p-10 hover:scale-105 duration-200 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] flex-col justify-center items-start hidden xl:flex">
            <Image src={bike.image_url} width={500} height={500} alt="speda" className="mb-3" priority={true} />
            <p className="font-semibold text-[20px]">{bike.name}</p>
            <p className="text-[14px]">{bike.description}</p>
            <div className="w-full flex justify-between items-center mt-5">
                <div>
                    <p className="font-semibold text-[20px]">Rp {bike.price.toLocaleString("id-ID")}</p>
                    <div className="flex text-[14px] justify-start items-center gap-2">
                        <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                        <p>5 | {bike.stock} available</p>
                    </div>
                </div>
                <div className="border hover:bg-secondary duration-150 border-accent rounded-sm p-4 flex justify-center items-center">
                    <i aria-hidden className="fa-solid fa-cart-plus"></i>
                </div>
            </div>
        </Link>
    )
}

export default BigProductCard