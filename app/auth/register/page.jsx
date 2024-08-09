import FormRegister from "@/components/auth/FormRegister";

export default function Register() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center pt-[80px]">
      <div>
        <div className="flex w-[30rem] flex-col gap-8 rounded-lg border border-accent bg-primary p-12">
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
