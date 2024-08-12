"use client";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import HeaderModal from './modal/HeaderModal';
import useFilter from "@/store/filterStore";

const Header = () => {
  const [isLight, setIsLight] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [isModal, setIsModal] = useState(false);
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
    <header
      className={`fixed left-0 right-0 top-0 h-[80px] border-b border-accent bg-primary text-[14px] ${isLight ? "shadow-xl shadow-secondary" : "shadow-sm"} z-50`}
    >
      <nav className="container mx-auto flex h-full items-center justify-between xl:w-[1280px] px-5 xl:px-0">
        <Link
          onClick={() => {
            setIsModal(false);
          }}
          href={"/"}
          className="z-50 hidden xl:inline-block"
        >
          <h1 className="text-[24px] font-semibold">gowesmart</h1>
        </Link>
        <div className="flex gap-3 w-full xl:w-fit">
          <button
            onClick={() => {
              setIsModal(false);
              handleLight();
            }}
            className={`z-50 xl:hidden flex h-[40px] min-w-[40px]  items-center justify-center duration-150 hover:bg-[#252525] ${isLight && "text-yellow-400"} rounded-md border border-accent`}
          >
            <i
              aria-hidden
              className={cn(`fa-solid fa-bolt`, {
                "fa-shake": isShake,
              })}
            />
          </button>
          <form onSubmit={(e) => { handleSearch(e) }} className="relative z-50 xl:w-[480px] w-full mr-3 xl:mr-0">
            <input
              ref={inputRef}
              onChange={(e) => { setFilters({ name: e.target.value }) }}
              value={filters.name}
              onClick={() => { setIsModal(false) }}
              placeholder="search for bikes...."
              type="text"
              className="w-full rounded-md border border-accent bg-primary py-2 pl-3 pr-10 outline-none duration-150 hover:bg-[#252525] focus:bg-primary"
            />
            <button
              className="absolute bottom-0 right-0 top-0 px-3"
              type="submit"
            >
              <i aria-hidden className="fa-solid fa-search"></i>
            </button>
          </form>
          <button
            onClick={() => {
              setIsModal(false);
              handleLight();
            }}
            href={"/cart"}
            className={`z-50 hidden xl:flex h-[40px] w-[40px] items-center justify-center duration-150 hover:bg-[#252525] ${isLight && "text-yellow-400"} rounded-md border border-accent`}
          >
            <i
              aria-hidden
              className={cn(`fa-solid fa-bolt`, {
                "fa-shake": isShake,
              })}
            />
          </button>
        </div>

        {/* desktop */}
        <div className="hidden xl:flex items-center gap-3">
          {currentUser ? (
            <>
              <Link
                onClick={() => {
                  setIsModal(false);
                }}
                href={"/"}
                className="z-50 flex h-[40px] w-[40px] items-center justify-center rounded-md border border-accent duration-150 hover:bg-[#252525]"
              >
                <i aria-hidden className="fa-solid fa-house"></i>
              </Link>
              <Link
                onClick={() => {
                  setIsModal(false);
                }}
                href={"/cart"}
                className="z-50 flex h-[40px] w-[40px] items-center justify-center rounded-md border border-accent duration-150 hover:bg-[#252525]"
              >
                <i aria-hidden className="fa-solid fa-cart-shopping"></i>
              </Link>
              <Link
                onClick={() => {
                  setIsModal(false);
                }}
                href={"/bikes"}
                className="z-50 flex h-[40px] w-[40px] items-center justify-center rounded-md border border-accent duration-150 hover:bg-[#252525]"
              >
                <i aria-hidden className="fa-solid fa-bicycle"></i>
              </Link>
              <button
                onClick={() => {
                  setIsModal((prev) => !prev);
                }}
                className="z-50 bg-secondary flex h-[40px] w-[40px] items-center justify-center rounded-md duration-150 hover:opacity-80"
              >
                <i aria-hidden className={`fa-solid ${isModal ? "fa-xmark" : "fa-user"}`}></i>
              </button>
              <HeaderModal
                isModal={isModal}
                setIsModal={setIsModal}
                handleLogout={handleLogout}
                role={currentUser.role}
              />
            </>
          ) : (
            <>
              <Link
                onClick={() => {
                  setIsModal(false);
                }}
                href={"/"}
                className="z-50 flex h-[40px] w-[40px] items-center justify-center rounded-md border border-accent duration-150 hover:bg-[#252525]"
              >
                <i aria-hidden className="fa-solid fa-house"></i>
              </Link>
              <Link
                href={"/cart"}
                className="flex h-[40px] w-[40px] items-center justify-center rounded-md border border-accent duration-150 hover:bg-[#252525]"
              >
                <i aria-hidden className="fa-solid fa-cart-shopping"></i>
              </Link>
              <Link
                href={"/bikes"}
                className="flex h-[40px] w-[40px] items-center justify-center rounded-md border border-accent duration-150 hover:bg-[#252525]"
              >
                <i aria-hidden className="fa-solid fa-bicycle"></i>
              </Link>
              <Link
                href={"/auth/register"}
                className="rounded-md border border-accent px-5 py-2 duration-150 hover:bg-[#252525]"
              >
                Register
              </Link>
              <Link
                href={"/auth/login"}
                className="rounded-md bg-secondary px-7 py-2 duration-150 hover:opacity-80"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* mobile */}
        <div className="flex xl:hidden">
          <button
            onClick={() => {
              setIsModal(prev => !prev);
            }}
            className="z-50 flex h-[40px] w-[40px] items-center justify-center rounded-md border border-accent duration-150 hover:bg-[#252525]"
          >
            <i aria-hidden className={`fa-solid ${isModal ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
          <HeaderModal
            isModal={isModal}
            setIsModal={setIsModal}
            handleLogout={handleLogout}
            role={currentUser ? currentUser.role : null}
          />
        </div>
      </nav>
    </header>
  );
};
export default Header;
