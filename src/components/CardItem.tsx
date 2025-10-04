'use client';

import Image from 'next/image';
import { useAppDispatch } from '@/lib/hooks';
import { removeFromCart, updateQuantity } from '@/lib/features/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    toast.success('Removed from cart');
  };

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-6 hover:shadow-lg transition-shadow"
    >
      {/* Product Image */}
      <div className="relative w-28 h-28 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-2"
          sizes="112px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow min-w-0">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 capitalize mb-3">{item.category}</p>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">each</span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
          className="bg-white hover:bg-gray-200 rounded-lg p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4 text-gray-700" />
        </motion.button>

        <span className="text-lg font-bold text-gray-900 w-12 text-center">
          {item.quantity}
        </span>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleIncrement}
          className="bg-white hover:bg-gray-200 rounded-lg p-2 transition-colors"
        >
          <Plus className="w-4 h-4 text-gray-700" />
        </motion.button>
      </div>

      {/* Total Price */}
      <div className="text-right flex-shrink-0">
        <p className="text-sm text-gray-500 mb-1">Total</p>
        <p className="text-2xl font-bold text-blue-600">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
      >
        <Trash2 className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}