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

    const newBikes = data.payload.map((item) => ({
      ...item,
      rating: item.rating == 0 ? 0 : Math.floor(item.rating / item.reviewers)
  }))

    return newBikes
  } catch (error) {
    throw error;
  }
};

export default async function Home() {
  const data = await fetchData();

  return (
    <main className="flex flex-col items-center justify-between pt-[80px]">
      <div className="relative h-[90vh] w-full bg-[url('/hero-image.jpg')] bg-cover">
        <div className="absolute inset-0 bg-black bg-opacity-50 px-5 xl:px-0">
          <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-[40px] font-black md:text-[64px]">
              Ride Beyond Limits
            </h1>
            <p className="text-[11px] text-[#F5F5F5] md:text-[16px] md:font-semibold">
              Discover the best bikes for every adventure.
              <br />
              From city streets to mountain trails, find your perfect ride here
            </p>
            <div className="mt-6 flex flex-col gap-3 md:flex-row md:gap-5">
              <Link
                href={"/cart"}
                className="rounded-md bg-secondary px-12 py-2 duration-150 hover:opacity-80"
              >
                shop now
              </Link>
              <Link
                href={"/bikes"}
                className="rounded-md border border-secondary px-8 py-2 text-secondary duration-150 hover:bg-gray-dark"
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
