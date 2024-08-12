"use client";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../global/Button";
import { useToast } from "@/hooks/useToast";
import Spinner from "../global/Spinner";
import axiosInstance from "@/lib/axios";
import { InputGroup } from "../global/InputGroup";
import { Label } from "../global/Label";
import DashboardInput from "../dashboard/DashboardInput";

export default function FormLogin() {
  const { toast } = useToast();

  const setToken = useAuthStore((state) => state.setToken);
  const currentUser = useAuthStore((state) => state.currentUser);
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleChange = (e) => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(loginInput);
  };

  useEffect(() => {
    if (currentUser) {
      router.push(redirectUrl);
    }
  }, [currentUser]);

  const loginUser = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      toast({
        title: `Hello, welcome back ${data.payload.username}👋`,
        description: "Good to see you again here 😁",
      });
      setToken(data.payload.token);
      setLoginInput({
        email: "",
        password: "",
      });
      router.push(redirectUrl);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Username or password is incorrect🚫",
        description: "Make sure your username and password is correct",
      });
    }
    setIsLoading(false);
  };

  return (
    <form
      className="flex w-full md:max-w-lg flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <InputGroup>
        <Label htmlFor="email" className="text-base text-white">
          Email
        </Label>
        <DashboardInput
          type="email"
          name="email"
          onChange={handleChange}
          value={loginInput.email}
          id="email"
          placeholder="Your epic email"
          className="bg-accent py-5 text-base"
          required
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="password" className="text-base text-white">
          Password
        </Label>
        <DashboardInput
          type="password"
          name="password"
          onChange={handleChange}
          value={loginInput.password}
          id="password"
          placeholder="Your secret password"
          className="bg-accent py-5 text-base"
          required
        />
        <div className="mt-2 flex justify-end">
          <Link
            href="/auth/forgot-password"
            id="helper-forgot-password"
            className="text-sm text-zinc-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </InputGroup>
      <Button
        disabled={isLoading}
        size="lg"
        type="submit"
        className="mt-2 w-full"
      >
        <Spinner show={isLoading} />
        Login
      </Button>
      <p>
        Don't have an account?{" "}
        <Link href={"/auth/register"} className="text-left text-secondary">
          Register Now
        </Link>
      </p>
    </form>
  );
}
