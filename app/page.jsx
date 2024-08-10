import AboutUs from "@/components/home/AboutUs";
import Feature from "@/components/home/Feature";
import ProductPreview from "@/components/home/ProductPreview";
import { baseUrl } from "@/utils/constants";
import Link from "next/link";

const fetchData = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/bikes/?limit=9&page=1`, { cache: "no-store" })
    const data = await res.json()

    return data.payload
  } catch (error) {
    throw error
  }
}

export default async function Home() {
  const data = await fetchData()

  return (
    <main className="flex flex-col items-center justify-between pt-[80px]">
      <div className="bg-[url('/hero-image.jpg')] h-[90vh] w-full bg-cover relative">
        <div className="absolute inset-0 bg-black bg-opacity-50 px-5 xl:px-0">
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-[40px] md:text-[64px] font-black">Ride Beyond Limits</h1>
            <p className="text-[#F5F5F5] text-[11px] md:text-[16px] md:font-semibold">Discover the best bikes for every adventure.<br />
              From city streets to mountain trails, find your perfect ride here</p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-5 mt-6">
              <button className="py-2 px-12 rounded-md bg-secondary hover:opacity-80 duration-150">shop now</button>
              <Link href={"/bikes"} className="py-2 px-8 rounded-md border border-secondary hover:bg-gray-dark duration-150 text-secondary">explore bikes</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto xl:max-w-[1280px]">
        <Feature />
        <ProductPreview bikes={data} />
        <AboutUs />
      </div>
    </main>
  );
}
