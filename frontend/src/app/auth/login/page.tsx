'use client';

import { useState } from 'react';
import { account } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { AppwriteException, OAuthProvider } from 'appwrite';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      toast.success('Logged in successfully!');
      router.push('/');
    } catch (error) {
      console.error(error);
      if (error instanceof AppwriteException) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  const handleOAuthLogin = async (provider: OAuthProvider) => {
    try {
      await account.createOAuth2Session(
        provider,
        'http://localhost:3001/', // Success URL
        'http://localhost:3001/auth/login' // Failure URL
      );
    } catch (error) {
      console.error(error);
      if (error instanceof AppwriteException) {
        toast.error(error.message);
      } else {
        toast.error(`An unexpected error occurred with ${provider} login.`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Login</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500"
                />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500"
                />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <button
              onClick={() => handleOAuthLogin(OAuthProvider.Google)}
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <span className="sr-only">Sign in with Google</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M20 10a10 10 0 11-20 0 10 10 0 0120 0zm-9.3-3.3a.9.9 0 00-1.4 1.4l2.3 2.3H5a1 1 0 000 2h6.6l-2.3 2.3a.9.9 0 101.4 1.4l4-4a.9.9 0 000-1.4l-4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div>
            <button
              onClick={() => handleOAuthLogin(OAuthProvider.Facebook)}
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <span className="sr-only">Sign in with Facebook</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M20 10a10 10 0 11-20 0 10 10 0 0120 0zm-9.3-3.3a.9.9 0 00-1.4 1.4l2.3 2.3H5a1 1 0 000 2h6.6l-2.3 2.3a.9.9 0 101.4 1.4l4-4a.9.9 0 000-1.4l-4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}