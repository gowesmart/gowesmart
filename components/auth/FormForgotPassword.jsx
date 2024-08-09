'use client';

import useAuthStore from '@/store/authStore';
import { baseUrl } from '@/utils/constants';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FormForgotPassword() {
  const { setToken, currentUser } = useAuthStore();
  const [forgotPasswordInput, setForgotPasswordInput] = useState({
    username: '',
    email: '',
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForgotPasswordInput({
      ...forgotPasswordInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(forgotPasswordInput);
  };

  useEffect(() => {
    if (currentUser) {
      router.push('/');
    }
  }, [currentUser]);

  const forgotPassword = async ({ username, email }) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/api/auth/forgot-password`, {
        username,
        email,
      });
      const { forgot_password_token } = data.payload;
      setToken(forgot_password_token);
      setForgotPasswordInput({
        username: '',
        email: '',
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label for="username" className="block mb-2 text-base font-medium text-gray-900">
          Username
        </label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={forgotPasswordInput.username}
          id="username"
          className="bg-transparent border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
          placeholder="johndoe"
          required
        />
      </div>
      <div className="mb-5">
        <label for="email" className="block mb-2 text-base font-medium text-gray-900">
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={forgotPasswordInput.email}
          id="email"
          className="bg-transparent border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
          placeholder="john@email.com"
          required
        />
      </div>
      <button
        type="submit"
        className={`text-white bg-secondary font-medium rounded-md text-base w-24 px-5 py-2 text-center ${isLoading ? 'brightness-75' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div role="status" className="flex justify-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
}
