import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ bike }) => {
  return (
    <Link
      href={`/bikes/${bike.id}`}
      className="flex xl:h-[406px] xl:w-[300px] flex-col items-center justify-center rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] p-5 xl:p-10 duration-200 hover:scale-105"
    >
      <div className="w-full h-fit xl:h-[150px] overflow-hidden">
        <Image
          src={bike.image_url}
          width={0}
          height={0}
          sizes="100vw"
          alt="bike"
          priority={true}
          className="w-full h-auto"
        />
      </div>
      <div className="w-full">
        <p className="mt-3 max-h-[25px] xl:max-h-[30px] overflow-hidden xl:text-[20px] font-semibold">
          {bike.name}
        </p>
        <p className="max-h-[14px] xl:max-h-[20px] overflow-hidden text-[10px] xl:text-[14px]">
          {bike.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col items-start">
            <p className="text-[12px] xl:text-[20px] xl:font-semibold">
              Rp {bike.price.toLocaleString("id-ID")}
            </p>
            <div className="flex items-center justify-center gap-1 text-[8px] xl:text-[14px]">
              <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
              <p>({bike.rating}) | {bike.stock} available</p>
            </div>
          </div>
          <button className="hidden xl:flex items-center justify-center rounded-sm border border-accent p-3 duration-150 hover:bg-secondary">
            <i aria-hidden className="fa-solid fa-cart-plus text-[16px]"></i>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
