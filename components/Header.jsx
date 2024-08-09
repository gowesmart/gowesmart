"use client";

import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "./global/Button";
import { cn } from "@/lib/cn";
import HeaderModal from './modal/HeaderModal';
import useFilter from "@/store/filterStore";

const Header = () => {
  const [isLight, setIsLight] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [isModal, setIsModal] = useState(false)
  const { currentUser, logOut } = useAuthStore();
  const router = useRouter();
  const inputRef = useRef(null)
  const pathname = usePathname()
  const { filters, setFilters } = useFilter()

  const handleLight = () => {
    setIsLight((prev) => !prev);
    setIsShake(true);

    setTimeout(() => {
      setIsShake(false);
    }, 500);
  };

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  const handleSearch = (e) => {
    e.preventDefault()
    inputRef.current.blur()

    if (pathname === "/bikes") {
      setFilters({ marker: true })
    } else {
      router.push("/bikes")
    }
  }

  return (
    <header className={`bg-primary h-[80px] text-[14px] border-b border-accent fixed top-0 right-0 left-0 ${isLight ? 'shadow-secondary shadow-xl' : 'shadow-sm'} z-50`}>
      <nav className="container mx-auto h-full flex justify-between items-center xl:max-w-[1280px]">
        <Link onClick={() => { setIsModal(false) }} href={'/'} className='z-50'>
          <h1 className="text-[24px] font-semibold">gowesmart</h1>
        </Link>
        <div className="flex gap-3">
          <form onSubmit={(e) => { handleSearch(e) }} className="relative z-50 onClick={() => { setIsModal(false) }}">
            <input
              ref={inputRef}
              onChange={(e) => { setFilters({ name: e.target.value }) }}
              value={filters.name}
              onClick={() => { setIsModal(false) }}
              placeholder="search for bikes...."
              type="text"
              className="border focus:bg-primary hover:bg-[#252525] duration-150 bg-primary border-accent py-2 pl-3 pr-10 w-[480px] outline-none rounded-md"
            />
            <button className="absolute top-0 right-0 bottom-0 px-3" type="submit">
              <i aria-hidden className="fa-solid fa-search"></i>
            </button>
          </form>
          <button
            onClick={() => {
              setIsModal(false)
              handleLight()
            }}
            href={'/cart'}
            className={`py-2 px-3 hover:bg-[#252525] duration-150 z-50 ${isLight && 'text-yellow-400'} rounded-md border border-accent`}
          >
            <i
              className={cn(`fa-solid fa-bolt`, {
                "fa-shake": isShake,
              })}
            />
          </button>
        </div>
        <div className="flex gap-3 items-center">
          {currentUser ? (
            <>
              <Link onClick={() => { setIsModal(false) }} href={'/'} className="w-[40px] hover:bg-[#252525] duration-150 z-50 h-[40px] flex justify-center items-center rounded-md border border-accent">
                <i aria-hidden className="fa-solid fa-house"></i>
              </Link>
              {currentUser.role === "USER" &&
                <Link onClick={() => { setIsModal(false) }} href={'/cart'} className="w-[40px] hover:bg-[#252525] duration-150 z-50 h-[40px] flex justify-center items-center rounded-md border border-accent">
                  <i aria-hidden className="fa-solid fa-cart-shopping"></i>
                </Link>}
              <Link onClick={() => { setIsModal(false) }} href={'/bikes'} className="w-[40px] hover:bg-[#252525] duration-150 z-50 h-[40px] flex justify-center items-center rounded-md border border-accent">
                <i aria-hidden className="fa-solid fa-bicycle"></i>
              </Link>
              <button onClick={() => { setIsModal(prev => !prev) }} className="w-[40px] z-50 hover:bg-[#252525] duration-150 h-[40px] flex justify-center items-center rounded-md border border-accent">
                <i aria-hidden className="fa-solid fa-user"></i>
              </button>
              <HeaderModal isModal={isModal} setIsModal={setIsModal} handleLogout={handleLogout} role={currentUser.role} />
            </>
          ) : (
            <>
              <Link onClick={() => { setIsModal(false) }} href={'/'} className="w-[40px] hover:bg-[#252525] duration-150 z-50 h-[40px] flex justify-center items-center rounded-md border border-accent">
                <i aria-hidden className="fa-solid fa-house"></i>
              </Link>
              <Link href={'/cart'} className="w-[40px] h-[40px] hover:bg-[#252525] duration-150 flex justify-center items-center rounded-md border border-accent">
                <i aria-hidden className="fa-solid fa-cart-shopping"></i>
              </Link>
              <Link href={'/bikes'} className="w-[40px] h-[40px] hover:bg-[#252525] duration-150 flex justify-center items-center rounded-md border border-accent">
                <i aria-hidden className="fa-solid fa-bicycle"></i>
              </Link>
              <Link href={'/auth/register'} className="py-2 px-5 hover:bg-[#252525] duration-150 rounded-md border border-accent">
                Register
              </Link>
              <Link href={'/auth/login'} className="py-2 px-7 hover:bg-opacity-80 duration-150 bg-secondary rounded-md">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
