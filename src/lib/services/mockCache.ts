export const mockRiskCache: Record<string, any> = {
  'B08N5KWB9H': {
    riskScore: 85,
    summary: 'High Risk. 3 unauthorized sellers detected. Price is 42% below MSRP on eBay.',
    threats: ['Hijacker Detected', 'MAP Violation'],
    recommendation: 'Immediate automated enforcement recommended.'
  },
  'B07XJ8C8F1': {
    riskScore: 12,
    summary: 'Low Risk. All sellers are whitelisted. Pricing is stable across platforms.',
    threats: [],
    recommendation: 'Continuous monitoring active.'
  },
  'DEFAULT': {
    riskScore: 45,
    summary: 'Moderate Risk. Potential pricing anomaly detected on secondary platforms.',
    threats: ['Price Discrepancy'],
    recommendation: 'Run a deep scan to verify seller authenticity.'
  }
};

export function getMockRisk(asin: string) {
  return mockRiskCache[asin] || mockRiskCache['DEFAULT'];
}
