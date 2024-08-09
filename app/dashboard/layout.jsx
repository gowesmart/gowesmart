import Navbar from "@/components/dashboard/Navbar";

export const metadata = {
  title: "Dashboard | Gowesmart",
};

export default function layout({ children }) {
  return (
    <div className="pt-[80px]">
      <div className="container mx-auto flex flex-col gap-5 py-7 xl:max-w-[1280px]">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
