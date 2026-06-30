import { supabase } from '@/lib/supabase';
import { checkCompliance } from './compliance';
import { generateTakedownNotice } from './templates';

export async function enforceTakedown(incidentId: string) {
  console.log(`[Enforcer] Initiating takedown for incident: ${incidentId}`);

  try {
    // 1. Fetch incident and brand details
    const { data: incident, error: fetchError } = await supabase
      .from('incidents')
      .select('*, monitored_items(identifier, platform, brands(name))')
      .eq('id', incidentId)
      .single();

    if (fetchError || !incident) {
      throw new Error(`Incident not found: ${fetchError?.message}`);
    }

    const brandName = (incident.monitored_items as any).brands.name;
    const platform = (incident.monitored_items as any).platform;
    const asin = (incident.monitored_items as any).identifier;
    
    // Determine violation type based on threat score (simplified logic)
    const violationType = incident.threat_level === 'critical' ? 'trademark' : 'copyright';

    // 2. Perform RCE (Regulatory Compliance Engine) Check
    const isCompliant = await checkCompliance(platform, violationType);
    if (!isCompliant) {
      throw new Error(`Action blocked by RCE: ${violationType} enforcement not permitted on ${platform} with current policy.`);
    }

    // 3. Generate Dynamic Legal Template
    const legalNotice = await generateTakedownNotice({
      brandName,
      sellerName: incident.seller_name,
      infringingUrl: incident.evidence_url || `https://www.amazon.com/dp/${asin}`,
      violationType,
      platform,
      identifier: asin
    });

    console.log(`[Enforcer] Legal Notice Generated:\n${legalNotice.substring(0, 100)}...`);

    // 4. Mock API call to Platform Enforcement API
    console.log(`[Enforcer] MOCK API: Filing legally-compliant takedown for ${asin} on ${platform}`);
    const mockPlatformReference = `RCE-${Math.floor(Math.random() * 1000000)}`;

    // 5. Update incident status
    const { error: updateError } = await supabase
      .from('incidents')
      .update({ status: 'neutralized' })
      .eq('id', incidentId);

    if (updateError) throw updateError;

    // 6. Create enforcement log entry with legal notice snapshot
    const { error: logError } = await supabase
      .from('enforcement_logs')
      .insert({
        incident_id: incidentId,
        platform_reference: mockPlatformReference,
        action_taken: `${violationType}_takedown_requested`,
        status: 'success',
        // In real world, we'd store legalNotice in a field
      });

    if (logError) throw logError;

    return {
      success: true,
      reference: mockPlatformReference,
      message: `Compliant ${violationType} takedown filed for ${asin}`
    };

  } catch (error: any) {
    console.error(`[Enforcer Error]:`, error);
    return {
      success: false,
      message: error.message
    };
  }
}
