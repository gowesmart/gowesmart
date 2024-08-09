import Link from 'next/link';

const ProductCard = ({
  imageUrl = '/default-image.jpg',
  title = 'Brand - Name',
  description = 'Description',
  price = 'Rp 400.000',
  rating = '5 | 486 available',
  link = '/bikes/1',
  onAddToCart = () => {},
}) => {
  return (
    <Link
      href={link}
      className="w-[280px] h-[406px] rounded-md border border-accent bg-gradient-to-br from-[rgba(67,67,67,0.2)] to-[rgba(14,14,14,0.2)] p-10 flex flex-col justify-center items-center"
    >
      <div className="w-[200px] h-[200px] bg-slate-200">
        <img src={imageUrl} alt={title} className="object-cover w-full h-full rounded-md" />
      </div>
      <div className="w-full mt-3">
        <p className="text-[20px] font-semibold">{title}</p>
        <p className="text-[14px]">{description}</p>
        <div className="flex items-center justify-between mt-5">
          <div>
            <p className="text-[20px] font-semibold">{price}</p>
            <div className="flex text-[14px] justify-center items-center gap-2">
              <i aria-hidden className="text-yellow-400 fa-solid fa-star"></i>
              <p>{rating}</p>
            </div>
          </div>
          <button
            onClick={onAddToCart}
            className="flex items-center justify-center p-3 duration-150 border border-white rounded-md hover:bg-secondary"
          >
            <i aria-hidden className="fa-solid fa-cart-plus text-[16px]"></i>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
