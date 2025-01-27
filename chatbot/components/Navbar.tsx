'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          AI Chatbot
        </Link>
        <div className="space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span>{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
