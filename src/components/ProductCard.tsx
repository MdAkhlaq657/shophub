'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addToCart } from '@/lib/features/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/lib/features/wishlistSlice';
import { addToComparison } from '@/lib/features/comparisonSlice';
import { ShoppingCart, Star, Heart, Eye, GitCompare } from 'lucide-react';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const comparisonItems = useAppSelector((state) => state.comparison.products);
  const [showQuickView, setShowQuickView] = useState(false);
  
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const isInComparison = comparisonItems.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success('Added to cart!', {
      duration: 2000,
      icon: '🛒',
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist!', { icon: '❤️' });
    }
  };

  const handleAddToComparison = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (comparisonItems.length >= 4) {
      toast.error('You can only compare up to 4 products');
      return;
    }
    if (!isInComparison) {
      dispatch(addToComparison(product));
      toast.success('Added to comparison');
    }
  };

  const handleQuickView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowQuickView(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -10 }}
        className="group"
      >
        <Link href={`/products/${product.id}`}>
          <div className="card h-full flex flex-col relative">
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
              >
                20% OFF
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleWishlist}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickView}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <Eye className="w-5 h-5 text-gray-600" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToComparison}
                className={`bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 ${
                  isInComparison ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <GitCompare className={`w-5 h-5 ${isInComparison ? 'text-blue-600' : 'text-gray-600'}`} />
              </motion.button>
            </div>

            {/* Product Image */}
            <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-grow">
              <p className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wide">
                {product.category}
              </p>

              <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating?.rate || 0)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  ({product.rating?.count || 0})
                </span>
              </div>

              {/* Price and Button */}
              <div className="mt-auto flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="text-2xl font-bold text-gray-900 ml-2">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}