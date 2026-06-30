'use strict';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Search, 
  UserCheck, 
  AlertTriangle, 
  Scale,
  CreditCard,
  Settings,
  LogOut
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Search, label: 'Monitored Items', href: '/dashboard/monitored-items' },
  { icon: UserCheck, label: 'Whitelist', href: '/dashboard/whitelist' },
  { icon: AlertTriangle, label: 'Incidents', href: '/dashboard/incidents' },
  { icon: Scale, label: 'Compliance', href: '/dashboard/compliance' },
  { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-slate-900 text-slate-300 h-screen border-r border-slate-800">
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">Guardian AI</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
          >
            <item.icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors w-full text-left">
          <LogOut className="w-5 h-5 text-slate-400" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
