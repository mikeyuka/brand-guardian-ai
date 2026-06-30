'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  ShieldAlert,
  Loader2,
  RefreshCcw
} from 'lucide-react';

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchIncidents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('incidents')
      .select('*, monitored_items(identifier, brands(name))')
      .order('created_at', { ascending: false });

    if (!error) setIncidents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleNeutralize = async (incidentId: string) => {
    setProcessingId(incidentId);
    try {
      const response = await fetch('/api/incidents/enforce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incidentId }),
      });

      if (response.ok) {
        alert('Takedown successfully filed!');
        fetchIncidents();
      } else {
        const err = await response.json();
        alert(`Error: ${err.error}`);
      }
    } catch (err) {
      alert('Failed to trigger enforcement.');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-600" />
            Detected Incidents
          </h1>
          <p className="text-slate-500">Manage detected threats and execute automated takedowns.</p>
        </div>
        <button 
          onClick={fetchIncidents}
          className="p-2 text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p>Loading incidents...</p>
          </div>
        ) : incidents.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">All Clear</h3>
            <p>No threats currently detected for your brands.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Product / ASIN</th>
                  <th className="px-6 py-4 font-semibold">Seller</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Threat</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {incidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">
                        {incident.monitored_items?.brands?.name}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        {incident.monitored_items?.identifier}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{incident.seller_name}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">${incident.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        incident.threat_level === 'critical' ? 'bg-red-100 text-red-700' :
                        incident.threat_level === 'high' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {incident.threat_level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-sm ${
                        incident.status === 'neutralized' ? 'text-green-600' : 'text-slate-500'
                      }`}>
                        {incident.status === 'neutralized' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                        {incident.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {incident.status === 'pending' && (
                        <button 
                          onClick={() => handleNeutralize(incident.id)}
                          disabled={processingId === incident.id}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-sm hover:shadow-indigo-100 disabled:opacity-50 flex items-center gap-2"
                        >
                          {processingId === incident.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : 'Neutralize'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
