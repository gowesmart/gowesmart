"use client";

import useAuthStore from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAuthStore((state) => state.currentUser);
  const mustLogin =
    pathname.startsWith("/cart") || pathname.startsWith("/dashboard");
  const alreadyLoggedIn = ["/login", "/register"];

  useEffect(() => {
    if (currentUser) {
      if (alreadyLoggedIn.includes(pathname)) {
        router.push("/");
      }
      if (pathname.startsWith("/dashboard") && currentUser.role !== "ADMIN") {
        router.push("/");
      }
    } else {
      if (mustLogin) {
        router.push("/login");
      }
    }
  }, [pathname]);

  return children;
}
