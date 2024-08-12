"use client";

import useAuthStore from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAuthStore((s) => s.currentUser);
  const mustLogin =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/user")

  useEffect(() => {
    if (currentUser) {
      if (pathname.startsWith("/auth")) {
        router.push("/");
      }
      if (pathname.startsWith("/dashboard") && currentUser?.role !== "ADMIN") {
        router.push("/");
      }
    } else {
      if (mustLogin) {
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      }
    }
  }, [pathname]);

  return children;
}
