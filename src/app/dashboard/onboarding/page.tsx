'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Hash, 
  ArrowRight, 
  CheckCircle2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brandName: '',
    registryId: '',
    asin: '',
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-10">
        <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Protect Your First Brand</h1>
        <p className="text-slate-500 mt-2">Let's set up your brand registry and first item to monitor.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex justify-between items-center">
          <div className="flex gap-4">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  s === step ? 'bg-indigo-600 text-white' : 
                  s < step ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
          <span className="text-sm font-medium text-slate-500">Step {step} of 3</span>
        </div>

        <form onSubmit={handleNext} className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Brand Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder="e.g., Aura Skin"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                    value={formData.brandName}
                    onChange={(e) => setFormData({...formData, brandName: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Amazon Brand Registry ID (Optional)</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g., BR-123456"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                    value={formData.registryId}
                    onChange={(e) => setFormData({...formData, registryId: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-800">
                  Enter an ASIN to begin 24/7 monitoring. We'll scan for unauthorized sellers and pricing anomalies.
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product ASIN</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., B08N5KWB9H"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  value={formData.asin}
                  onChange={(e) => setFormData({...formData, asin: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6 animate-in zoom-in duration-500">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Ready to Launch!</h2>
              <p className="text-slate-500 mt-2 px-8">
                Your brand <strong>{formData.brandName}</strong> is ready for setup. We'll start monitoring <strong>{formData.asin}</strong> immediately.
              </p>
              
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-indigo-200/50"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}

          {step < 3 && (
            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-200/50 flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
