import React from 'react';
import { 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';

const recentIncidents = [
  { id: 1, item: 'Aura Skin Serum', platform: 'Amazon', seller: 'QuickShop Ltd', price: '$24.99', status: 'Pending', threat: 'High' },
  { id: 2, item: 'Glow Moisturizer', platform: 'eBay', seller: 'BeautyDirect24', price: '$19.00', status: 'Neutralized', threat: 'Medium' },
  { id: 3, item: 'Aura Skin Serum', platform: 'Amazon', seller: 'FakesHunter', price: '$12.50', status: 'Neutralized', threat: 'High' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Brand Overview</h1>
        <p className="text-slate-500">Real-time protection status for your registered brands.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Protected Brands" 
          value="4" 
          icon={Shield} 
        />
        <StatsCard 
          title="Active Incidents" 
          value="12" 
          change="+3"
          trend="up"
          icon={AlertCircle} 
        />
        <StatsCard 
          title="Threats Neutralized" 
          value="84" 
          change="92% rate"
          trend="up"
          icon={CheckCircle2} 
        />
        <StatsCard 
          title="Recovered Revenue" 
          value="$12,450" 
          change="+$1.2k"
          trend="up"
          icon={TrendingUp} 
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Incidents</h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-semibold">Item</th>
                <th className="px-6 py-3 font-semibold">Platform</th>
                <th className="px-6 py-3 font-semibold">Seller</th>
                <th className="px-6 py-3 font-semibold">Price</th>
                <th className="px-6 py-3 font-semibold">Threat</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentIncidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{incident.item}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{incident.platform}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{incident.seller}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{incident.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      incident.threat === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {incident.threat}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{incident.status}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
