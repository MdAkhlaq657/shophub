'use client';

import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { removeFromComparison, clearComparison } from '@/lib/features/comparisonSlice';
import { motion } from 'framer-motion';
import { X, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '@/lib/features/cartSlice';
import toast from 'react-hot-toast';

export default function ComparePage() {
  const products = useAppSelector((state) => state.comparison.products);
  const dispatch = useAppDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromComparison(id));
    toast.success('Removed from comparison');
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              No Products to Compare
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Add products from the catalog to compare them here
            </p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg"
              >
                Browse Products
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900">
            Compare <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Products</span>
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(clearComparison())}
            className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
          >
            Clear All
          </motion.button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <th className="p-6 text-left font-bold">Feature</th>
                {products.map((product) => (
                  <th key={product.id} className="p-6 text-center relative">
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="mt-4">Product {product.id}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Product Images */}
              <tr className="border-b border-gray-200">
                <td className="p-6 font-semibold text-gray-900">Image</td>
                {products.map((product) => (
                  <td key={product.id} className="p-6">
                    <div className="relative h-48 bg-gray-100 rounded-xl">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  </td>
                ))}
              </tr>

              {/* Product Names */}
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-6 font-semibold text-gray-900">Name</td>
                {products.map((product) => (
                  <td key={product.id} className="p-6 text-center">
                    <Link href={`/products/${product.id}`} className="text-blue-600 hover:text-blue-700 font-medium">
                      {product.title}
                    </Link>
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="border-b border-gray-200">
                <td className="p-6 font-semibold text-gray-900">Price</td>
                {products.map((product) => (
                  <td key={product.id} className="p-6 text-center">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-6 font-semibold text-gray-900">Category</td>
                {products.map((product) => (
                  <td key={product.id} className="p-6 text-center capitalize">
                    {product.category}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr className="border-b border-gray-200">
                <td className="p-6 font-semibold text-gray-900">Rating</td>
                {products.map((product) => (
                  <td key={product.id} className="p-6">
                    <div className="flex items-center justify-center space-x-1">
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
                      <span className="ml-2 text-gray-600">
                        ({product.rating?.count || 0})
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Description */}
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-6 font-semibold text-gray-900">Description</td>
                {products.map((product) => (
                  <td key={product.id} className="p-6 text-sm text-gray-600 text-center">
                    <div className="line-clamp-3">{product.description}</div>
                  </td>
                ))}
              </tr>

              {/* Add to Cart */}
              <tr>
                <td className="p-6 font-semibold text-gray-900">Action</td>
                {products.map((product) => (
                  <td key={product.id} className="p-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </motion.button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>You can compare up to 4 products at a time</p>
        </div>
      </div>
    </div>
  );
}