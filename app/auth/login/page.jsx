import FormLogin from "@/components/auth/FormLogin";

export default function Login() {
  return (
    <main className="flex min-h-dvh items-center justify-center pt-[80px]">
      <div className="w-full flex justify-center">
        <div className="flex w-full md:w-[30rem] flex-col gap-8 rounded-lg md:border border-accent bg-primary p-12">
          <div className="w-full md:max-w-lg">
            <h1 className="text-2xl font-bold">Login</h1>
            <p>enter your email and password to use our platform</p>
          </div>
          <FormLogin />
        </div>
      </div>
    </main>
  );
}
