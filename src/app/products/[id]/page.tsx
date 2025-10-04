'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { addToCart } from '@/lib/features/cartSlice';
import axios from 'axios';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProductCard from '@/components/ProductCard';
import { ShoppingCart, Star, ArrowLeft, Heart, Share2, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Product>(`https://fakestoreapi.com/products/${params.id}`);
      setProduct(response.data);
      
      // Fetch related products
      const relatedResponse = await axios.get<Product[]>(
        `https://fakestoreapi.com/products/category/${response.data.category}?limit=4`
      );
      setRelatedProducts(relatedResponse.data.filter(p => p.id !== response.data.id));
    } catch (err) {
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      toast.success(`Added ${quantity} item(s) to cart!`, {
        icon: '🛒',
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  if (loading) return <LoadingSpinner />;
  
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <button onClick={() => router.push('/products')} className="btn-primary mt-4">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Products</span>
        </motion.button>

        {/* Product Details */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
            {/* Left: Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="relative h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-12"
                  priority
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(i)}
                    className={`relative h-24 bg-gray-100 rounded-xl cursor-pointer overflow-hidden ${
                      selectedImage === i ? 'ring-4 ring-blue-600' : ''
                    }`}
                  >
                    <Image
                      src={product.image}
                      alt={`${product.title} ${i + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full capitalize">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(product.rating?.rate || 0)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg text-gray-700 ml-3 font-medium">
                  {product.rating?.rate || 'N/A'}
                </span>
                <span className="text-gray-500 ml-2">
                  ({product.rating?.count || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline space-x-3">
                  <span className="text-5xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-2xl text-gray-500 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full">
                    Save 20%
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-900 mb-3">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 w-12 h-12 rounded-xl font-bold text-xl transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 w-12 h-12 rounded-xl font-bold text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-3"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Add to Cart</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all"
                >
                  Buy Now
                </motion.button>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-red-500 hover:text-red-500 transition-all"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </motion.button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                {[
                  { icon: Truck, text: 'Free Shipping' },
                  { icon: Shield, text: 'Secure Payment' },
                  { icon: RotateCcw, text: '30 Day Returns' },
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">{feature.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Products</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}