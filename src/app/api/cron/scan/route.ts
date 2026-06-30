import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { detectThreat, ProductData } from '@/lib/services/detector';

export async function GET() {
  console.log('Autonomous Scan Triggered:', new Date().toISOString());

  try {
    const { data: monitoredItems, error: fetchError } = await supabase
      .from('monitored_items')
      .select('*, brands(name)');

    if (fetchError) throw fetchError;

    const results = [];

    for (const item of monitoredItems || []) {
      const mockProductData: ProductData = {
        identifier: item.identifier,
        title: `${item.brands.name} Professional Series - ${item.identifier}`,
        price: item.msrp * (Math.random() < 0.2 ? 0.5 : 0.95),
        msrp: item.msrp,
        seller: Math.random() < 0.2 ? "QuickFake-Direct" : "Authorized Seller Inc",
        platform: item.platform,
        brandId: item.brand_id // [C-02] Pass brandId for whitelist pre-filter
      };

      const detection = await detectThreat(mockProductData);

      if (detection.threatScore > 80) {
        const { error: incidentError } = await supabase.from('incidents').insert({
          monitored_item_id: item.id,
          seller_name: mockProductData.seller,
          price: mockProductData.price,
          threat_level: detection.threatScore > 90 ? 'critical' : 'high',
          status: 'pending',
          evidence_url: `https://www.amazon.com/dp/${item.identifier}`,
        });

        if (incidentError) {
          console.error('Failed to create incident:', incidentError);
        } else {
          results.push({ item: item.identifier, threatScore: detection.threatScore, action: 'incident_created' });
        }
      } else {
        results.push({ item: item.identifier, threatScore: detection.threatScore, action: 'neutral' });
      }
    }

    return NextResponse.json({
      message: 'Scan completed',
      processed: monitoredItems?.length || 0,
      results
    });

  } catch (error: any) {
    console.error('Scan Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
