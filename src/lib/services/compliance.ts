/**
 * Regulatory Compliance Service (RCE)
 * Manages platform-specific policies and compliance rules.
 */

export interface Policy {
  platform: string;
  version: string;
  rules: string[];
  templateKeys: string[];
}

const POLICIES: Record<string, Policy> = {
  amazon: {
    platform: 'Amazon',
    version: '2026.1',
    rules: [
      'Must identify specific intellectual property being infringed.',
      'Must provide proof of brand ownership (Registry ID).',
      'Requires a statement of good faith belief.'
    ],
    templateKeys: ['trademark_infringement', 'copyright_violation']
  },
  ebay: {
    platform: 'eBay',
    version: 'VeRO-2026.05',
    rules: [
      'Must be submitted via the Verified Rights Owner (VeRO) program.',
      'Requires specific listing numbers.',
      'Must specify if the item is counterfeit or uses unauthorized images.'
    ],
    templateKeys: ['vero_trademark', 'vero_counterfeit']
  }
};

export async function getLatestPolicy(platform: string): Promise<Policy> {
  const normalizedPlatform = platform.toLowerCase();
  const policy = POLICIES[normalizedPlatform];
  
  if (!policy) {
    throw new Error(`No compliance policy found for platform: ${platform}`);
  }

  return policy;
}

export async function checkCompliance(platform: string, violationType: string): Promise<boolean> {
  console.log(`[RCE] Verifying compliance for ${violationType} on ${platform}...`);
  const policy = await getLatestPolicy(platform);
  
  // Basic check: ensure the violation type matches a supported template key for the platform
  const isValid = policy.templateKeys.some(key => key.includes(violationType.toLowerCase()));
  
  return isValid;
}
