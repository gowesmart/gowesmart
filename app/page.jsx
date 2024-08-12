import AboutUs from "@/components/home/AboutUs";
import Feature from "@/components/home/Feature";
import ProductPreview from "@/components/home/ProductPreview";
import { baseUrl } from "@/utils/constants";
import Link from "next/link";

const fetchData = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/bikes/?limit=9&page=1`, {
      next: { revalidate: 10 },
    });
    const data = await res.json();

    return data.payload;
  } catch (error) {
    throw error;
  }
};

export default async function Home() {
  const data = await fetchData();

  return (
    <main className="flex flex-col items-center justify-between pt-[80px]">
      <div className="relative h-[90vh] w-full bg-[url('/hero-image.jpg')] bg-cover">
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-[64px] font-black">Ride Beyond Limits</h1>
            <p className="text-[16px] font-semibold text-[#F5F5F5]">
              Discover the best bikes for every adventure.
              <br />
              From city streets to mountain trails, find your perfect ride here
            </p>
            <div className="mt-6 flex gap-5">
              <button className="rounded-md bg-secondary px-12 py-2">
                shop now
              </button>
              <Link
                href={"/bikes"}
                className="rounded-md border border-secondary px-8 py-2 text-secondary"
              >
                explore bikes
              </Link>
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
