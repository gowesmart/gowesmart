import Navbar from "@/components/dashboard/Navbar"

export default function layout({children}) {
  return (
    <div className="pt-[80px]">
      <div className="container flex gap-5 flex-col mx-auto xl:max-w-[1280px] py-7">
        <Navbar/>
        {children}
      </div>
    </div>
  )
}
