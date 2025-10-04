'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { clearCart } from '@/lib/features/cartSlice';
import CouponInput from '@/components/CouponInput';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import CartItem from '@/components/CardItem';

export default function Cart() {
  const { items, totalQuantity, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [discount, setDiscount] = useState(0);

  const TAX_RATE = 0.1;
  const SHIPPING_FEE = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * TAX_RATE;
  const discountAmount = discount;
  const finalTotal = totalPrice + tax + SHIPPING_FEE - discountAmount;

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
      toast.success('Cart cleared');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <ShoppingBag className="w-32 h-32 text-gray-300 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Looks like you haven't added any products yet
            </p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg inline-flex items-center space-x-2"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-5 h-5" />
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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              Shopping <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cart</span>
            </h1>
            <p className="text-gray-600">
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearCart}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <Trash2 className="w-5 h-5" />
            <span>Clear Cart</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-gray-700 px-6 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                <span>Continue Shopping</span>
              </motion.button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 sticky top-24 space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {SHIPPING_FEE === 0 ? (
                    <span className="text-green-600 font-semibold">FREE</span>
                  ) : (
                    <span className="font-semibold">${SHIPPING_FEE.toFixed(2)}</span>
                  )}
                </div>

                {totalPrice < 50 && SHIPPING_FEE > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-700">
                      Add <span className="font-bold">${(50 - totalPrice).toFixed(2)}</span> more for FREE shipping!
                    </p>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Tax (estimated)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-2xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Coupon Input */}
              <CouponInput onApply={setDiscount} />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-3 text-lg font-bold mb-4"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* Trust Badges */}
              <div className="space-y-3 pt-6 border-t">
                {[
                  { icon: ShieldCheck, text: 'Secure Checkout' },
                  { icon: Truck, text: 'Fast Delivery' },
                  { icon: CreditCard, text: 'Safe Payment' },
                ].map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-600">
                    <badge.icon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}