"use client";

import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./global/Button";
import { cn } from "@/lib/cn";

const Header = () => {
  const [isLight, setIsLight] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const { currentUser, logOut } = useAuthStore();
  const router = useRouter();

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

  return (
    <header
      className={`fixed left-0 right-0 top-0 h-[80px] bg-primary ${isLight ? "shadow-xl shadow-secondary" : "shadow-md"} z-50`}
    >
      <nav className="container mx-auto flex h-full items-center justify-between xl:max-w-[1280px]">
        <Link href={"/"}>
          <h1 className="text-[24px] font-semibold">gowesmart</h1>
        </Link>
        <div className="flex gap-3">
          <form className="relative">
            <input
              placeholder="search for bikes...."
              type="text"
              className="w-[480px] rounded-md border border-accent bg-primary py-2 pl-3 pr-10 text-[16px] outline-none"
            />
            <button
              className="absolute bottom-0 right-0 top-0 px-3 text-[16px]"
              type="submit"
            >
              <i className="fa-solid fa-search"></i>
            </button>
          </form>
          <Button
            onClick={handleLight}
            variant="outline"
            className={cn(`px-3 py-2 text-[16px]`, {
              "text-yellow-400": isLight,
            })}
          >
            <i
              className={cn(`fa-solid fa-bolt`, {
                "fa-shake": isShake,
              })}
            />
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="px-3 py-2 text-[16px]">
            <Link href={"/cart"}>
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </Button>
          {currentUser ? (
            <>
              <p>{currentUser.username}</p>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="px-5 py-2 text-[16px]"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="px5 py-2 text-[16px]"
              >
                <Link href={"/register"}>Register</Link>
              </Button>
              <Button asChild className="px-7 py-2 text-[16px]">
                <Link href={"/login"}>Login</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
