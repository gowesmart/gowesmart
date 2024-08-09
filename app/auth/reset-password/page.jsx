import FormResetPassword from '@/components/auth/FormResetPassword';

export default function ResetPassword() {
  return (
    <main className="pt-[80px] min-h-dvh flex justify-center items-center">
      <div>
        <div className="flex flex-col gap-8 p-12 w-[30rem] rounded-lg border">
          <div className="w-full max-w-lg">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p>form for resetting your password account</p>
          </div>
          <FormResetPassword />
        </div>
      </div>
    </main>
  );
}
