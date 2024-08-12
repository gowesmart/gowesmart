import Image from "next/image"
import Link from "next/link"

const SmallProductCard = ({ bike }) => {
    return (
        <Link href={`/bikes/${bike.id}`} className="min-w-[190px] max-w-[190px] h-[260px] hover:scale-105 duration-200 p-5 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] flex flex-col justify-center items-start">
            <div className="w-[150px] h-[100px] overflow-hidden">
                <Image src={bike.image_url} width={0} height={0} sizes="100vw" alt="speda" className="w-full h-auto" />
            </div>
            <p className="text-[14px] mt-2">{bike.name}</p>
            <p className="text-[10px] max-h-[17px] overflow-hidden">{bike.description}</p>
            <div className="w-full flex justify-between items-center mt-2">
                <div>
                    <p className="font-semibold text-[14px]">Rp {bike.price.toLocaleString("id-ID")}</p>
                    <div className="flex text-[10px] justify-start items-center gap-2">
                        <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                        <p>({bike.rating}) | {bike.stock} available</p>
                    </div>
                </div>
                <div className="border border-accent hover:bg-secondary duration-150 rounded-sm p-2 flex justify-center items-center">
                    <i aria-hidden className="fa-solid fa-cart-plus text-[10px]"></i>
                </div>
            </div>
        </Link>
    )
}

export default SmallProductCard