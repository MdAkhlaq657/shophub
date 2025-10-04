'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SuccessPage() {
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  const router = useRouter();

  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Redirect if no order
    if (!currentOrder) {
      router.push('/');
    }
  }, [currentOrder, router]);

  if (!currentOrder) return null;

  const steps = [
    { icon: CheckCircle, title: 'Order Confirmed', status: 'completed' },
    { icon: Package, title: 'Processing', status: 'current' },
    { icon: Truck, title: 'Shipping', status: 'pending' },
    { icon: Mail, title: 'Delivered', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-gray-900 mb-4"
          >
            Order Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Thank you for your purchase. Your order has been received and is being processed.
          </motion.p>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="text-lg font-bold text-gray-900">{currentOrder.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(currentOrder.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-lg font-bold text-blue-600">
                  ${currentOrder.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Order Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Status</h3>
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                      step.status === 'completed'
                        ? 'bg-green-500'
                        : step.status === 'current'
                        ? 'bg-blue-600'
                        : 'bg-gray-300'
                    }`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      step.status === 'completed' || step.status === 'current'
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </p>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-full mt-8 absolute ${
                        step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                      style={{ left: `${(100 / steps.length) * index}%`, width: `${100 / steps.length}%`, top: '32px' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Email Confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
          >
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <p className="text-gray-700">
              A confirmation email has been sent to{' '}
              <span className="font-bold">{currentOrder.shippingInfo.email}</span>
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/orders">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>View Order Details</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all border-2 border-gray-300"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}