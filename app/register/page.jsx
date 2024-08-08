import FormRegister from '@/components/auth/FormRegister';
import Link from 'next/link';

export default function Register() {
  return (
    <main className="pt-[80px] min-h-dvh flex justify-center items-center relative">
      <div>
        <div className="flex flex-col gap-8 p-12 w-[30rem] rounded-lg border">
          <div className="w-full max-w-lg">
            <h1 className="text-2xl font-bold">Register</h1>
            <p>create your account to get access</p>
          </div>
          <FormRegister />
          <p>
            Already have an account?{' '}
            <Link href={'/login'} className="text-secondary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
