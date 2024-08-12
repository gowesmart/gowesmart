import FormRegister from "@/components/auth/FormRegister";

export default function Register() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center pt-[80px] px-10 md:px-0 container mx-auto">
      <div className="w-full flex justify-center">
        <div className="flex w-full md:w-[30rem] flex-col gap-8 rounded-lg md:border border-accent bg-primary md:p-12 my-8">
          <div className="w-full max-w-lg">
            <h1 className="text-2xl font-bold">Register</h1>
            <p>create your account to get access</p>
          </div>
          <FormRegister />
        </div>
      </div>
    </main>
  );
}
