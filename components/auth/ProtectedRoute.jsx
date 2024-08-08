"use client";

import useAuthStore from "@/store/authStore";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const { currentUser } = useAuthStore();
  const mustLogin = ["/cart", `/cart/${id}`];
  const alreadyLoggedIn = ["/login", "/register"];
  const mustAdmin = ["/dashboard"];

  useEffect(() => {
    if (currentUser) {
      if (alreadyLoggedIn.includes(pathname)) {
        router.push("/");
      }
      if (mustAdmin.includes(pathname) && currentUser.role !== "ADMIN") {
        router.push("/");
      }
    } else {
      if (mustLogin.includes(pathname)) {
        router.push("/login");
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
