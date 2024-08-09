import FormForgotPassword from '@/components/auth/FormForgotPassword';

export default function ForgotPassword() {
  return (
    <main className="pt-[80px] min-h-dvh flex justify-center items-center">
      <div>
        <div className="flex flex-col gap-8 p-12 w-[30rem] rounded-lg border">
          <div className="w-full max-w-lg">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p>enter your credentials for temporary login</p>
          </div>
          <FormForgotPassword />
        </div>
      </div>
    </main>
  );
}
