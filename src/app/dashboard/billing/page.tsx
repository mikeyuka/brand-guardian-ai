'use client';

import React, { useState } from 'react';
import { 
  Check, 
  Zap, 
  Shield, 
  Globe, 
  CreditCard,
  Loader2,
  Sparkles
} from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$199',
    description: 'Essential protection for single-brand sellers.',
    features: [
      '1 Protected Brand',
      'Metadata Scanning (ASIN/SKU)',
      'Price Parity Monitoring',
      'Manual Takedown Requests',
      'Standard Email Support',
      'Daily Health Reports'
    ],
    cta: 'Subscribe Now',
    highlighted: false,
    icon: Shield
  },
  {
    name: 'Professional',
    price: '$499',
    description: 'Full automation for growing and established brands.',
    features: [
      'Up to 3 Protected Brands',
      'AI Visual Fingerprinting',
      'Automated Takedown Engine',
      'MAP Violation Alerts',
      'Priority 24/7 Support',
      'Advanced Risk Analytics'
    ],
    cta: 'Go Pro',
    highlighted: true,
    icon: Zap
  },
  {
    name: 'Enterprise',
    price: '$1,499',
    description: 'Global protection for large-scale operations.',
    features: [
      'Unlimited Brands',
      'Custom Enforcement Workflows',
      'API Access for Integrations',
      'Dedicated Account Manager',
      'Legal Compliance Review',
      'Custom Platform Support'
    ],
    cta: 'Contact Sales',
    highlighted: false,
    icon: Globe
  }
];

export default function BillingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscription = (planName: string) => {
    if (planName === 'Enterprise') {
      window.location.href = 'mailto:sales@brandguardian.ai';
      return;
    }
    
    setLoadingPlan(planName);
    // Mock Stripe Checkout simulation
    setTimeout(() => {
      alert(`Simulating Stripe checkout for ${planName} plan...`);
      setLoadingPlan(null);
    }, 1500);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Subscription Plans</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Scale your brand protection as you grow. Our AI-driven engine works 24/7 to ensure your listings remain clean and profitable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
              plan.highlighted 
                ? 'bg-white border-indigo-600 shadow-2xl scale-105 z-10' 
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-indigo-200">
                <Sparkles className="w-3 h-3" />
                MOST POPULAR
              </div>
            )}

            <div className="mb-8">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                plan.highlighted ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200 shadow-sm'
              }`}>
                <plan.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-slate-900">{plan.price}</span>
                <span className="text-slate-500 text-sm font-medium">/mo</span>
              </div>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed">{plan.description}</p>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                  <div className={`mt-0.5 rounded-full p-0.5 ${plan.highlighted ? 'text-indigo-600' : 'text-slate-400'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscription(plan.name)}
              disabled={loadingPlan !== null}
              className={`w-full py-4 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                plan.highlighted 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300' 
                  : 'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {loadingPlan === plan.name ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {plan.name === 'Enterprise' ? <Globe className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                  {plan.cta}
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-10 text-center space-y-4">
        <h3 className="text-white text-xl font-bold">Trusted by 500+ E-commerce Brands</h3>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Join the network of protected brands. Our AI has neutralized over 50,000 threats this year alone, recovering millions in lost revenue.
        </p>
      </div>
    </div>
  );
}
