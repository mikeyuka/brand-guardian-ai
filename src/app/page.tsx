'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Zap, 
  Search, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  BarChart3,
  Globe,
  Lock,
  Menu,
  X,
  Loader2,
  ShieldAlert
} from 'lucide-react';

export default function LandingPage() {
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleQuickCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!asin) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/v1/quick-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asin }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Guardian AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#problem" className="hover:text-indigo-600 transition-colors">The Problem</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4">Log in</Link>
            <Link 
              href="/dashboard/onboarding" 
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 lg:pt-52 lg:pb-32 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 mb-4">
            <Zap className="w-3.5 h-3.5 fill-current" />
            24/7 AUTONOMOUS PROTECTION
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Automated Peace of Mind for <span className="text-indigo-600">Amazon Brand Owners.</span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            24/7 AI-powered hijacker detection and automated IP enforcement. Stop losing margins to counterfeiters while you sleep.
          </p>

          {/* [C-04] Viral Risk Widget */}
          <div className="max-w-xl mx-auto pt-8">
            <div className="bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 flex flex-col sm:flex-row gap-2 transition-all focus-within:ring-2 focus-within:ring-indigo-500">
              <input 
                type="text" 
                placeholder="Enter ASIN (e.g. B08N5KWB9H)" 
                className="flex-1 px-4 py-3 outline-none text-slate-900 font-medium"
                value={asin}
                onChange={(e) => setAsin(e.target.value)}
              />
              <button 
                onClick={handleQuickCheck}
                disabled={loading}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldAlert className="w-5 h-5" />}
                Free Risk Audit
              </button>
            </div>
            
            {result && (
              <div className="mt-6 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-left animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${result.riskScore > 70 ? 'bg-red-500' : result.riskScore > 30 ? 'bg-amber-500' : 'bg-green-500'}`} />
                    <span className="text-sm font-bold text-slate-900">ASIN: {result.asin}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">Risk Score: {result.riskScore}/100</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{result.summary}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {result.threats.map((t: string) => (
                    <span key={t} className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded uppercase tracking-wider">{t}</span>
                  ))}
                </div>
                <Link href="/dashboard/onboarding" className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  Fix this now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
            
            <p className="mt-4 text-[10px] text-slate-400 font-medium uppercase tracking-widest flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" /> Encrypted & Secure Scan
            </p>
          </div>
        </div>
      </header>

      {/* The Problem Section */}
      <section id="problem" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight">Protecting your brand shouldn't cost a fortune.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Manual brand protection is slow, expensive, and reactive. Guardian AI is 10x faster and 1/10th the cost.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-left space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Manual Legal Team</h3>
                <span className="text-red-500 font-bold">$10k+ /mo</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-500">
                <li className="flex items-start gap-3"><X className="w-5 h-5 text-red-400 shrink-0" /> Slow reaction times (24-48 hours)</li>
                <li className="flex items-start gap-3"><X className="w-5 h-5 text-red-400 shrink-0" /> Billable hours for every filing</li>
                <li className="flex items-start gap-3"><X className="w-5 h-5 text-red-400 shrink-0" /> Manual review of listings</li>
                <li className="flex items-start gap-3"><X className="w-5 h-5 text-red-400 shrink-0" /> Human error & missed threats</li>
              </ul>
            </div>

            <div className="bg-indigo-900 p-8 rounded-3xl border border-indigo-800 text-left space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-24 h-24 text-white" />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <h3 className="text-xl font-bold text-white">Guardian AI</h3>
                <span className="text-indigo-400 font-bold">$199 /mo</span>
              </div>
              <ul className="space-y-4 text-sm text-indigo-100/70 relative z-10">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" /> Instant 24/7 detection</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" /> Unlimited automated filings</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" /> AI Vision & Price Parity checks</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" /> 100% legal compliance built-in</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight">Enterprise-grade tools for every brand.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We use advanced computer vision and autonomous agents to do the work of a 20-person legal team.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 hover:bg-white hover:shadow-xl transition-all group">
              <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Visual Fingerprinting</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Our AI uses AWS Rekognition to detect logo misuse and counterfeit packaging even if the seller hides the brand name in metadata.</p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 hover:bg-white hover:shadow-xl transition-all group">
              <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Price Parity Monitor</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Track your MAP (Minimum Advertised Price) across Amazon, eBay, and Temu. Detect predatory pricing that threatens your Buy-Box.</p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 hover:bg-white hover:shadow-xl transition-all group">
              <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Compliance Engine</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Every takedown is legally vetted. Our AI populates dynamic DMCA and RAV templates ensuring you stay 100% platform compliant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[160px] opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[160px] opacity-10" />

        <div className="max-w-7xl mx-auto px-4 text-center space-y-16 relative">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">Transparent pricing. No contracts.</h2>
            <p className="text-slate-400">Choose the plan that fits your current volume.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] text-left flex flex-col backdrop-blur-sm">
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-indigo-400 uppercase tracking-widest">Starter</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-5xl font-bold">$199</span>
                    <span className="text-slate-400 text-sm">/mo</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">Perfect for single-brand sellers launching their first product.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> 1 Protected Brand</li>
                  <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> 24/7 Metadata Scans</li>
                  <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Manual Takedowns</li>
                </ul>
              </div>
              <Link 
                href="/dashboard/billing" 
                className="mt-8 block w-full py-4 bg-white text-slate-900 text-center rounded-2xl font-bold hover:bg-slate-100 transition-colors"
              >
                Choose Starter
              </Link>
            </div>

            {/* Professional */}
            <div className="bg-indigo-600 border border-indigo-500 p-8 rounded-[40px] text-left flex flex-col relative scale-105 shadow-2xl shadow-indigo-600/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-indigo-600 text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full shadow-lg uppercase">Recommended</div>
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-widest">Professional</h3>
                  <div className="mt-2 flex items-baseline gap-1 text-white">
                    <span className="text-5xl font-bold">$499</span>
                    <span className="text-indigo-200 text-sm">/mo</span>
                  </div>
                </div>
                <p className="text-indigo-100 text-sm opacity-80">Autonomous protection for growing brand portfolios.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-white"><CheckCircle2 className="w-5 h-5 text-indigo-300" /> 3 Protected Brands</li>
                  <li className="flex items-center gap-3 text-sm text-white"><CheckCircle2 className="w-5 h-5 text-indigo-300" /> AI Visual Fingerprinting</li>
                  <li className="flex items-center gap-3 text-sm text-white"><CheckCircle2 className="w-5 h-5 text-indigo-300" /> Fully Automated Enforcement</li>
                </ul>
              </div>
              <Link 
                href="/dashboard/billing" 
                className="mt-8 block w-full py-4 bg-white text-indigo-600 text-center rounded-2xl font-bold hover:shadow-xl transition-colors"
              >
                Go Professional
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] text-left flex flex-col backdrop-blur-sm">
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-indigo-400 uppercase tracking-widest">Enterprise</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-5xl font-bold">$1,499</span>
                    <span className="text-slate-400 text-sm">/mo</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">Global protection for established e-commerce empires.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Unlimited Brands</li>
                  <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Custom Compliance API</li>
                  <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Dedicated Account Manager</li>
                </ul>
              </div>
              <Link 
                href="/dashboard/billing" 
                className="mt-8 block w-full py-4 border border-white/20 text-white text-center rounded-2xl font-bold hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <footer className="py-24 bg-white px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="bg-indigo-600 p-1 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Guardian AI</span>
              </div>
              <p className="text-slate-500 text-sm">Building the future of autonomous brand protection. We help brand owners regain their time and their margins.</p>
            </div>
            
            <div className="flex items-center gap-12">
              <div className="text-center">
                <div className="text-2xl font-bold">50k+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Threats Neutralized</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99.8%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$12M+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Revenue Recovered</div>
              </div>
            </div>
          </div>

          <div className="pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 text-xs font-medium text-slate-400">
            <div className="flex gap-8">
              <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Cookie Policy</a>
            </div>
            <p>© 2026 Guardian AI Protection. All rights reserved.</p>
            <div className="flex gap-4 grayscale opacity-30">
              <Lock className="w-4 h-4" />
              <Globe className="w-4 h-4" />
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
