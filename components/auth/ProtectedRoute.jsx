"use client";

import useAuthStore from "@/store/authStore";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const { currentUser } = useAuthStore();
  const mustLogin = ["/cart"];
  const AlreadyLoggedIn = ["/auth/login", "/auth/register"];
  const mustAdmin = ["/dashboard"];

  useEffect(() => {
    if (currentUser) {
      if (AlreadyLoggedIn.includes(pathname)) {
        router.push("/");
      }
      if (mustAdmin.includes(pathname) && currentUser.role !== "ADMIN") {
        router.push("/");
      }
    } else {
      if (mustLogin.includes(pathname)) {
        router.push("/auth/login");
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
