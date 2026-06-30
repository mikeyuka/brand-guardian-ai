'use client';

import React from 'react';
import { ShoppingBag, Tag } from 'lucide-react';

interface PricePoint {
  platform: string;
  price: number;
  isViolation: boolean;
}

interface PriceChartProps {
  productName: string;
  msrp: number;
  prices: PricePoint[];
}

export function PriceChart({ productName, msrp, prices }: PriceChartProps) {
  const maxPrice = Math.max(msrp, ...prices.map(p => p.price));
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{productName}</h3>
          <p className="text-sm text-slate-500">Cross-Platform Price Parity</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
          <Tag className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-bold text-slate-700">MSRP: ${msrp}</span>
        </div>
      </div>

      <div className="space-y-6">
        {prices.map((point) => (
          <div key={point.platform} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                {point.platform}
              </span>
              <span className={`text-sm font-bold ${point.isViolation ? 'text-red-600' : 'text-slate-900'}`}>
                ${point.price}
                {point.isViolation && <span className="ml-2 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full uppercase">MAP Violation</span>}
              </span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div 
                className={`h-full transition-all duration-1000 ${point.isViolation ? 'bg-red-500' : 'bg-indigo-500'}`}
                style={{ width: `${(point.price / maxPrice) * 100}%` }}
              />
            </div>
          </div>
        ))}

        {/* MSRP Reference Line */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Price Index</span>
            <span>Market Benchmark (MSRP)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
