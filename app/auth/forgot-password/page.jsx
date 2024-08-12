import FormForgotPassword from "@/components/auth/FormForgotPassword";

export default function ForgotPassword() {
  return (
    <main className="flex min-h-dvh items-center justify-center pt-[80px]">
      <div>
        <div className="flex w-full md:w-[30rem] flex-col gap-8 rounded-lg md:border border-accent bg-primary p-12">
          <div className="w-full max-w-lg">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p>enter your username and email for requesting change password</p>
          </div>
          <FormForgotPassword />
        </div>
      </div>
    </main>
  );
}
