'use client';

import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, Clock, Truck, CheckCircle, ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  const orders = useAppSelector((state) => state.orders.orders);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'processing':
        return <Package className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ShoppingBag className="w-32 h-32 text-gray-300 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
            <p className="text-xl text-gray-600 mb-8">
              You haven't placed any orders. Start shopping now!
            </p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg"
              >
                Start Shopping
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Orders</span>
          </h1>
          <p className="text-xl text-gray-600">
            Track and manage your orders
          </p>
        </motion.div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Order #{order.id}
                    </h3>
                    <p className="text-blue-100">
                      Placed on {new Date(order.orderDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`px-4 py-2 rounded-full font-semibold flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Shipping Address */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      Shipping Address
                    </h4>
                    <p className="text-gray-900 font-medium">{order.shippingInfo.fullName}</p>
                    <p className="text-gray-600">{order.shippingInfo.address}</p>
                    <p className="text-gray-600">
                      {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                    </p>
                    <p className="text-gray-600">{order.shippingInfo.country}</p>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      Contact Information
                    </h4>
                    <p className="text-gray-900">{order.shippingInfo.email}</p>
                    <p className="text-gray-900">{order.shippingInfo.phone}</p>
                  </div>

                  {/* Order Total */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      Order Total
                    </h4>
                    <p className="text-3xl font-bold text-blue-600">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4"
                      >
                        <div className="relative w-20 h-20 bg-white rounded-lg flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-lg font-semibold text-gray-900 truncate">
                            {item.title}
                          </h5>
                          <p className="text-sm text-gray-600 capitalize">
                            {item.category}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Track Order
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all border-2 border-gray-300"
                  >
                    View Invoice
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}