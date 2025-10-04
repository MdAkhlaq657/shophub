'use client';

import { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface CouponInputProps {
  onApply: (discount: number) => void;
}

export default function CouponInput({ onApply }: CouponInputProps) {
  const [code, setCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Mock coupons
  const coupons = {
    'SAVE10': { discount: 10, type: 'percentage' as const },
    'SAVE20': { discount: 20, type: 'percentage' as const },
    'FLAT50': { discount: 50, type: 'fixed' as const },
  };

  const handleApply = () => {
    const coupon = coupons[code.toUpperCase() as keyof typeof coupons];
    
    if (coupon) {
      setAppliedCoupon(code.toUpperCase());
      onApply(coupon.discount);
      toast.success(`Coupon "${code.toUpperCase()}" applied! ${coupon.type === 'percentage' ? coupon.discount + '%' : '$' + coupon.discount} off`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleRemove = () => {
    setAppliedCoupon(null);
    setCode('');
    onApply(0);
    toast.success('Coupon removed');
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Tag className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-gray-900">Have a coupon?</h3>
      </div>

      <AnimatePresence mode="wait">
        {!appliedCoupon ? (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex space-x-2"
          >
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter code (e.g., SAVE10)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 uppercase"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleApply}
              disabled={!code}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="applied"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center justify-between bg-green-100 rounded-lg p-3"
          >
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-900">{appliedCoupon}</span>
            </div>
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-3 text-xs text-gray-600">
        Try: SAVE10, SAVE20, or FLAT50
      </div>
    </div>
  );
}