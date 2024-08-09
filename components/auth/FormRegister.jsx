"use client";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InputGroup } from "../global/InputGroup";
import { Label } from "../global/Label";
import { useToast } from "@/hooks/useToast";
import { Button } from "../global/Button";
import DashboardInput from "../dashboard/DashboardInput";
import Spinner from "../global/Spinner";
import Link from "next/link";
import { ToastAction } from "../global/Toast/toast";
import axiosInstance from "@/lib/axios";

export default function FormRegister() {
  const { toast } = useToast();

  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const router = useRouter();

  const handleChange = (e) => {
    setRegisterInput({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(registerInput);
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  const registerUser = async ({ username, email, password }) => {
    setIsLoading(true);
    try {
      await axiosInstance("/api/auth/register", {
        username,
        email,
        password,
      });
      toast({
        title: "Register success🎉",
        description: "Lets login to continue.",
        action: (
          <ToastAction altText="Login" asChild>
            <Button variant="outline" asChild>
              <Link href={"/auth/login"}>Login</Link>
            </Button>
          </ToastAction>
        ),
      });
      setRegisterInput({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Register failed",
        description: "Something went wrong, please try again",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <form
        className="flex w-full max-w-lg flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <InputGroup>
          <Label htmlFor="username" className="text-base">
            Username
          </Label>
          <DashboardInput
            type="text"
            name="username"
            onChange={handleChange}
            value={registerInput.username}
            id="username"
            placeholder="Your username"
            className="bg-accent py-5 text-base"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email" className="text-base">
            Email
          </Label>
          <DashboardInput
            type="email"
            name="email"
            onChange={handleChange}
            value={registerInput.email}
            id="email"
            placeholder="Your epic email"
            className="bg-accent py-5 text-base"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password" className="text-base">
            Password
          </Label>
          <DashboardInput
            type="password"
            name="password"
            onChange={handleChange}
            value={registerInput.password}
            id="password"
            placeholder="Your secret password"
            className="bg-accent py-5 text-base"
            required
          />
        </InputGroup>

        <Button
          disabled={isLoading}
          size="lg"
          type="submit"
          className="mt-4 w-full"
        >
          <Spinner show={isLoading} />
          Register
        </Button>
        <p>
          Already have an account?{" "}
          <Link href={"/auth/login"} className="text-secondary">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
