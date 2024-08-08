import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ bike }) => {
  return (
    <Link
      href={`/bikes/${bike.id}`}
      className="w-[300px] h-[406px] hover:scale-105 duration-200 rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] p-10 flex flex-col justify-center items-center mb-3"
    >
      <Image src={bike.image_url} width={220} height={220} alt="bike" priority={true} />
      <div className="w-full">
        <p className="text-[20px] max-h-[30px] overflow-hidden font-semibold mt-3">{bike.name}</p>
        <p className="text-[14px] max-h-[20px] overflow-hidden">{bike.description}</p>
        <div className="flex justify-between items-center mt-5">
          <div className="flex flex-col items-start">
            <p className="text-[20px] font-semibold">Rp {bike.price.toLocaleString('id-ID')}</p>
            <div className="flex text-[14px] justify-center items-center gap-1">
              <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
              <p>(5) | {bike.stock} available</p>
            </div>
          </div>
          <button className="border border-accent hover:bg-secondary duration-150 rounded-sm p-3 flex justify-center items-center">
            <i aria-hidden className="fa-solid fa-cart-plus text-[16px]"></i>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
