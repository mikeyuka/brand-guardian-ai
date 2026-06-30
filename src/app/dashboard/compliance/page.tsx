'use client';

import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Scale,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

const complianceAlerts = [
  { id: 1, platform: 'Amazon', title: 'RAV Policy Update', description: 'Amazon has updated documentation requirements for Trademark takedowns. Current templates are compliant.', status: 'info', date: '2026-06-28' },
  { id: 2, platform: 'eBay', title: 'VeRO Authentication', description: 'Action Required: Renew your eBay VeRO authorization token to ensure uninterrupted protection.', status: 'warning', date: '2026-06-25' },
  { id: 3, platform: 'Global', title: 'DMCA Safe Harbor Shift', description: 'Minor changes in DMCA safe harbor filings for EU-based sellers.', status: 'info', date: '2026-06-20' },
];

export default function CompliancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-6 h-6 text-indigo-600" />
          Regulatory Compliance Engine
        </h1>
        <p className="text-slate-500">Monitor your brand's legal health and platform-specific protection status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-8">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * 94) / 100} className="text-green-500" />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-bold text-slate-900">94</span>
              <span className="text-xs block text-slate-500 font-medium">SCORE</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Brand Compliance Health</h2>
            <p className="text-slate-500 mt-1 max-w-md">Your brand protection strategy is highly aligned with current platform policies. 12/12 enforcement actions this month were legally verified.</p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Legal Templates
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Policy Sync Active
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              <ShieldAlert className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold">RCE Active Protection</h3>
            <p className="text-slate-400 text-sm mt-2">The Regulatory Compliance Engine is intercepting and verifying 100% of takedown attempts.</p>
          </div>
          <button className="mt-6 flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
            View Policy Logs
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Regulatory Risk Alerts
          </h2>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Sync: 2 minutes ago</span>
        </div>
        <div className="divide-y divide-slate-100">
          {complianceAlerts.map((alert) => (
            <div key={alert.id} className="p-6 flex gap-4 hover:bg-slate-50 transition-colors">
              <div className={`p-2 h-fit rounded-lg ${alert.status === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                {alert.status === 'warning' ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">{alert.title}</h4>
                  <span className="text-xs font-medium text-slate-400">{alert.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">{alert.platform}</span>
                  <p className="text-sm text-slate-600">{alert.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
