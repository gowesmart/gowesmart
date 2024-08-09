import FormLogin from '@/components/auth/FormLogin';
import Link from 'next/link';

export default function Login() {
  return (
    <main className="pt-[80px] min-h-dvh flex justify-center items-center">
      <div>
        <div className="flex flex-col gap-8 p-12 w-[30rem] rounded-lg border">
          <div className="w-full max-w-lg">
            <h1 className="text-2xl font-bold">Login</h1>
            <p>enter your email and password to use our platform</p>
          </div>
          <FormLogin />
          <p>
            Don't have an account?{' '}
            <Link href={'/auth/register'} className="text-secondary">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
