"use client";
import { useState } from "react";
import { Button } from "../global/Button";
import Spinner from "../global/Spinner";
import { InputGroup } from "../global/InputGroup";
import { Label } from "../global/Label";
import DashboardInput from "../dashboard/DashboardInput";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "../global/Toast/toast";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function FormResetPassword({ token }) {
  const { toast } = useToast();
  const router = useRouter();

  const [resetPasswordInput, setResetPasswordInput] = useState({
    new_password: "",
    token,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setResetPasswordInput({
      ...resetPasswordInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(resetPasswordInput);
  };

  const resetPassword = async ({ new_password, token }) => {
    setIsLoading(true);
    try {
      await axiosInstance.post(
        "/api/auth/reset-password",
        {
          new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast({
        title: "Password resetted success🎉",
        description: "Lets login to continue.",
        action: (
          <ToastAction altText="Login" asChild>
            <Button variant="outline" asChild>
              <Link href={"/auth/login"}>Login</Link>
            </Button>
          </ToastAction>
        ),
      });
      setResetPasswordInput({
        new_password: "",
      });
      router.push("/auth/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Token expired, lets request a new one",
        description: "Request forgot password again",
        action: (
          <ToastAction altText="Login" asChild>
            <Button variant="outline" asChild>
              <Link href={"/auth/forgot-password"}>Request</Link>
            </Button>
          </ToastAction>
        ),
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
        <Label htmlFor="new_password" className="text-base">
          New Password
        </Label>
        <DashboardInput
          type="password"
          name="new_password"
          onChange={handleChange}
          value={resetPasswordInput.new_password}
          id="new_password"
          placeholder="Your new password"
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
        Submit
      </Button>
    </form>
  );
}
