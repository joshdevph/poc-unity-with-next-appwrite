'use client';

import { useEffect, useState } from 'react';
import { account } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { AppwriteException, Models } from 'appwrite';
import toast from 'react-hot-toast';

export default function Home() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        if (error instanceof AppwriteException) {
          router.push('/auth/login');
        } else {
          console.error(error);
          toast.error('An error occurred.');
        }
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      toast.success('Logged out successfully!');
      router.push('/auth/login');
    } catch (error) {
      console.error(error);
      toast.error('Failed to log out.');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Welcome, {user.name}!
          </h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Log Out
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            Training Modules
          </h3>
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for training modules */}
            <div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">A320 Walk Around Inspection</h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                An interactive training module for the A320 walk around
                inspection.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">A320 Aircraft Marshalling</h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                An interactive training module for A320 aircraft marshalling.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                CFM56-5B Engine General Overview
              </h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                An interactive training module for the CFM56-5B engine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
