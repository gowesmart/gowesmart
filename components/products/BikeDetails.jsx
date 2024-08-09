import Image from 'next/image';
import Link from 'next/link';
import Quantity from '../global/Quantity';
import Review from '../review/Review';

const BikeDetails = ({ bike, reviews }) => {
  return (
    <main className="mt-[80px] pt-10 pb-20">
      <div className="container xl:max-w-[1280px] mx-auto">
        <section className="flex items-center gap-2">
          <Link href={'/'}>Home</Link>
          <p>/</p>
          <Link href={'/bikes'}>Bikes</Link>
          <p>/</p>
          <Link href={'/'}>{bike.name}</Link>
        </section>
        <section className="flex gap-10 mt-10">
          <Image src={bike.image_url} width={635} height={450} alt="bike" priority={true} />
          <div className="w-full">
            <div className="pb-3 border-b border-white">
              <h1 className="text-[36px] font-bold">{bike.name}</h1>
              <p className="flex items-center gap-2 text-[14px] pt-1">
                <i aria-hidden className="fa-solid fa-star text-yellow-400"></i>
                <p>(5) | {bike.stock} available</p>
              </p>
            </div>
            <p className="mt-2 font-semibold text-[24px]">Rp {bike.price.toLocaleString('id-ID')}</p>
            <div className="mt-[35px]">
              <p className="font-semibold text-[20px]">Description</p>
              <p className="font-light">{bike.description}</p>
            </div>
            <div className="mt-[35px] flex items-center justify-between bg-[#434343] py-5 px-14 border border-accent text-center">
              <div>
                <p className="font-bold text-[20px]">Brand</p>
                <p className="font-light">{bike.brand}</p>
              </div>
              <div>
                <p className="font-bold text-[20px]">Year</p>
                <p className="font-light">{bike.year}</p>
              </div>
              <div>
                <p className="font-bold text-[20px]">Stock</p>
                <p className="font-light">{bike.stock}</p>
              </div>
              <div>
                <p className="font-bold text-[20px]">Category</p>
                <p className="font-light">{bike.category}</p>
              </div>
            </div>
            <div className="mt-[35px] flex items-center gap-3">
              <Quantity />
              <button className="flex justify-center items-center h-[35px] w-[150px] border border-accent">go to cart</button>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-[#434343] mt-28">
        <section className="container xl:max-w-[1280px] mx-auto py-16 flex flex-col gap-10 justify-center items-center">
          <h2 className="text-[24px] font-bold">Why Should You Buy This Bike?</h2>
          <div className="flex gap-9">
            <div className="bg-primary p-7 flex justify-center items-center gap-5 rounded-md border border-accent">
              <div className="text-[24px] rounded-full bg-secondary w-[50px] h-[50px] flex justify-center items-center">
                <i aria-hidden className="fa-solid fa-receipt"></i>
              </div>
              <div>
                <p className="text-[20px] font-light">Bike Warranty</p>
              </div>
            </div>
            <div className="bg-primary p-7 flex justify-center items-center gap-5 rounded-md border border-accent">
              <div className="text-[24px] rounded-full bg-secondary w-[50px] h-[50px] flex justify-center items-center">
                <i aria-hidden className="fa-solid fa-screwdriver-wrench"></i>
              </div>
              <div>
                <p className="text-[20px] font-light">
                  Free Service Three
                  <br />
                  Times
                </p>
              </div>
            </div>
            <div className="bg-primary p-7 flex justify-center items-center gap-5 rounded-md border border-accent">
              <div className="text-[24px] rounded-full bg-secondary w-[50px] h-[50px] flex justify-center items-center">
                <i aria-hidden className="fa-solid fa-bicycle"></i>
              </div>
              <div>
                <p className="text-[20px] font-light">Free Bike Assembly</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container xl:max-w-[1280px] mx-auto mt-20 w-full flex flex-col gap-[25px]">
        <h2 className="text-[24px] font-bold">Reviews</h2>
        <Link href={'/auth/login'}>
          <button className="bg-secondary w-full py-6 font-bold rounded-md">Please Login to Add a Review</button>
        </Link>
        <Review />
        <Review />
      </div>
    </main>
  );
};

export default BikeDetails;
