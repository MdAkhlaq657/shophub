'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { logout } from '@/lib/features/authSlice';
import { User, LogOut, Package, Heart, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import AuthModal from './AuthModal';

export default function UserProfileMenu() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    toast.success('Logged out successfully');
  };

  if (!isAuthenticated) {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAuthModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <User className="w-4 h-4" />
          <span>Sign In</span>
        </motion.button>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/40 dark:hover:to-purple-800/40 px-4 py-2.5 rounded-xl transition-all border-2 border-blue-200 dark:border-blue-700"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <span className="font-semibold text-gray-900 dark:text-white hidden md:block">
          {user?.name}
        </span>
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
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
            >
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-white/30">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{user?.name}</p>
                    <p className="text-sm text-white/80">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <Link
                  href="/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all group"
                >
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">My Orders</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Track your purchases</p>
                  </div>
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-6 py-3 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 dark:hover:from-pink-900/20 dark:hover:to-red-900/20 transition-all group"
                >
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Wishlist</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Your saved items</p>
                  </div>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-6 py-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700/20 dark:hover:to-gray-600/20 transition-all group"
                >
                  <div className="bg-gray-100 dark:bg-gray-700/30 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Settings</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Manage your account</p>
                  </div>
                </Link>
              </div>

              <div className="border-t-2 border-gray-200 dark:border-gray-700 p-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-3 w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all rounded-xl text-white font-semibold shadow-lg"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}