"use client";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../global/Button";
import Spinner from "../global/Spinner";
import DashboardInput from "../dashboard/DashboardInput";
import { InputGroup } from "../global/InputGroup";
import { Label } from "../global/Label";
import { useToast } from "@/hooks/useToast";
import axiosInstance from "@/lib/axios";

export default function FormForgotPassword() {
  const { toast } = useToast();
  const currentUser = useAuthStore((state) => state.currentUser);
  const [forgotPasswordInput, setForgotPasswordInput] = useState({
    username: "",
    email: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForgotPasswordInput({
      ...forgotPasswordInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(forgotPasswordInput);
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  const forgotPassword = async ({ username, email }) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/auth/forgot-password", {
        username,
        email,
      });
      const { forgot_password_token } = data.payload;
      toast({
        title: `Forgot password requested`,
        description: "Now lets reset yout password",
      });
      setForgotPasswordInput({
        username: "",
        email: "",
      });
      router.push(
        `/auth/reset-password?${new URLSearchParams({ token: forgot_password_token }).toString()}`,
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Username or email is incorrect",
        description: "Something went wrong, please try again",
      });
    }
    setIsLoading(false);
  };

  return (
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
          value={forgotPasswordInput.username}
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
          value={forgotPasswordInput.email}
          id="email"
          placeholder="Your epic email"
          className="bg-accent py-5 text-base"
          required
        />
      </InputGroup>
      <Button
        disabled={isLoading}
        size="lg"
        type="submit"
        className="mt-2 w-full"
      >
        <Spinner show={isLoading} />
        Submit
      </Button>
    </form>
  );
}
