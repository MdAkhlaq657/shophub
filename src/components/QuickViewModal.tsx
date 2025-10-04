'use client';

import { Product } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { useAppDispatch } from '@/lib/hooks';
import { addToCart } from '@/lib/features/cartSlice';
import toast from 'react-hot-toast';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const dispatch = useAppDispatch();

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Image */}
                <div className="relative h-96 bg-gray-100 rounded-2xl">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-8"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full capitalize w-fit mb-4">
                    {product.category}
                  </span>

                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {product.title}
                  </h2>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating?.rate || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 ml-2">
                      ({product.rating?.count || 0} reviews)
                    </span>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-4">
                    {product.description}
                  </p>

                  <div className="flex gap-4 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-100 text-gray-800 p-3 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <Heart className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}