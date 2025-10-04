'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { login, logout } from '@/lib/features/authSlice';
import { User, LogOut, Package, Heart, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function UserProfileMenu() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    // Mock login
    dispatch(login({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      isAuthenticated: true,
    }));
    toast.success('Welcome back!');
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    toast.success('Logged out successfully');
  };

  if (!isAuthenticated) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogin}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
      >
        Sign In
      </motion.button>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          {user?.name.charAt(0)}
        </div>
        <span className="font-medium text-gray-900 hidden md:block">{user?.name}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>

              <div className="py-2">
                <Link
                  href="/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <Package className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">My Orders</span>
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <Heart className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Wishlist</span>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Settings</span>
                </Link>
              </div>

              <div className="border-t border-gray-200 p-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-red-50 transition-colors rounded-lg text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}