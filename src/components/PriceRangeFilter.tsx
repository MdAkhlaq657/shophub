'use client';

import { useState } from 'react';
import { DollarSign } from 'lucide-react';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  onChange: (range: [number, number]) => void;
}

export default function PriceRangeFilter({ min, max, onChange }: PriceRangeFilterProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinValue(value);
    onChange([value, maxValue]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxValue(value);
    onChange([minValue, value]);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Price Range</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-2">Min</label>
            <input
              type="number"
              value={minValue}
              onChange={handleMinChange}
              min={min}
              max={maxValue}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-2">Max</label>
            <input
              type="number"
              value={maxValue}
              onChange={handleMaxChange}
              min={minValue}
              max={max}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-4">
          <input
            type="range"
            min={min}
            max={max}
            value={maxValue}
            onChange={handleMaxChange}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="text-center text-sm text-gray-600">
          ${minValue} - ${maxValue}
        </div>
      </div>
    </div>
  );
}