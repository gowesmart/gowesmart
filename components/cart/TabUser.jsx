"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabUser() {
  const pathname = usePathname();

  return (
    <div className="bg-accent py-2 px-4 rounded-md w-fit flex flex-wrap gap-3 font-semibold">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            "py-1.5 px-2.5 rounded-md text-[12px] md:text-sm transition-all",
            {
              "bg-white text-black": pathname === link.href,
              "hover:bg-black/20": pathname !== link.href,
            }
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

const NAV_LINKS = [
  {
    name: "Profile",
    href: "/user/profile",
  },
  {
    name: "Cart",
    href: "/user/cart",
  },
  {
    name: "History",
    href: "/user/history",
  },
];
