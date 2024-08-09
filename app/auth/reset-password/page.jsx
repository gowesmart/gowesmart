import FormResetPassword from "@/components/auth/FormResetPassword";
import { redirect } from "next/navigation";

export default function ResetPassword({ searchParams: { token } }) {
  if (!token) {
    return redirect("/auth/login");
  }

  return (
    <main className="flex min-h-dvh items-center justify-center pt-[80px]">
      <div>
        <div className="flex w-[30rem] flex-col gap-8 rounded-lg border border-accent bg-primary p-12">
          <div className="w-full max-w-lg">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p>form for resetting your password account</p>
          </div>
          <FormResetPassword token={token} />
        </div>
      </div>
    </main>
  );
}
