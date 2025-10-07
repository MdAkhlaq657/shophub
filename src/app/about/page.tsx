'use client';

import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart, ShieldCheck, Zap } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Hand-picked products from trusted brands worldwide',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Shopping',
      description: '100% secure payment and data protection',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Lightning-fast shipping to your doorstep',
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Dedicated customer service team always ready to help',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Shipping to over 100 countries worldwide',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Products' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '100+', label: 'Countries' },
    { value: '4.9/5', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ShopHub</span>
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re revolutionizing online shopping with premium products, unbeatable prices, and exceptional service.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-12 mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Founded in 2025, ShopHub began with a simple mission: to make premium products accessible to everyone. We believe that quality shouldn&apos;t come with a premium price tag.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Today, we serve over 50,000 happy customers across 100+ countries, offering a curated selection of 10,000+ products from trusted brands worldwide.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment to customer satisfaction, combined with our innovative approach to e-commerce, has made us one of the fastest-growing online retailers.
              </p>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl" />
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the future of online shopping today!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/products'}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
          >
            Shop Now →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}