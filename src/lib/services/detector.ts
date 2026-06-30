import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';
import { compareImages } from './vision';
import { checkPriceParity } from './priceMonitor';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ProductData {
  identifier: string; // ASIN/SKU
  title: string;
  price: number;
  msrp: number;
  seller: string;
  platform: string;
  imageUrl?: string;
  masterImageUrl?: string;
  brandId?: string; // Needed for whitelist check
}

export interface DetectionResult {
  threatScore: number;
  reason: string;
  signals: {
    visualSimilarity?: number;
    logoMisuse?: boolean;
    mapViolation?: boolean;
    predatoryPricing?: boolean;
    priceGap?: number;
    isWhitelisted?: boolean;
  };
}

export async function detectThreat(product: ProductData): Promise<DetectionResult> {
  console.log(`[Detector] Analyzing ${product.identifier} (${product.title})`);

  // [C-02] Stage 1: Lightweight Pre-filter (Whitelist Check)
  if (product.brandId) {
    const { data: whitelistEntry } = await supabase
      .from('whitelisted_sellers')
      .select('id')
      .eq('brand_id', product.brandId)
      .eq('seller_name', product.seller)
      .single();

    if (whitelistEntry) {
      console.log(`[Detector] Skipping AI calls for whitelisted seller: ${product.seller}`);
      return {
        threatScore: 0,
        reason: "Authorized seller detected (Whitelisted).",
        signals: { isWhitelisted: true }
      };
    }
  }

  // Stage 2: Full AI/Vision Analysis (High Cost)
  const [visionData, priceData] = await Promise.all([
    product.imageUrl && product.masterImageUrl 
      ? compareImages(product.imageUrl, product.masterImageUrl)
      : Promise.resolve(null),
    checkPriceParity(product.identifier, product.msrp)
  ]);

  const prompt = `
    Analyze this e-commerce listing for brand violations.
    
    Product Details:
    - Title: ${product.title}
    - Seller: ${product.seller}
    - Platform Price: $${product.price}
    - Authorized MSRP: $${product.msrp}
    
    Advanced Detection Signals:
    - Visual Similarity Score: ${visionData?.similarity || 'N/A'}%
    - Logo Misuse Detected: ${visionData?.logoMisuseDetected || 'N/A'}
    - Cross-Platform Price Gap: ${priceData.gapPercentage}%
    - MAP Violation: ${priceData.mapViolation}
    - Predatory Pricing Alert: ${priceData.predatoryPricing}

    Scoring Logic:
    - High similarity (>90%) + unauthorized seller = High Threat (Hijacker).
    - Similarity >70% but <90% + logo misuse = Counterfeit.
    - MAP Violation = Unauthorized Reseller.
    - Predatory Pricing (>40% gap) = Critical Threat.

    Return JSON:
    {
      "threatScore": number (0-100),
      "reason": "explanation including signals"
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an enterprise brand protection AI. Integrate visual and pricing signals." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const content = JSON.parse(response.choices[0].message.content || '{}');

    return {
      threatScore: content.threatScore || 0,
      reason: content.reason || "Unable to determine threat",
      signals: {
        visualSimilarity: visionData?.similarity,
        logoMisuse: visionData?.logoMisuseDetected,
        mapViolation: priceData.mapViolation,
        predatoryPricing: priceData.predatoryPricing,
        priceGap: priceData.gapPercentage,
        isWhitelisted: false
      }
    };
  } catch (error) {
    console.error('[Detector Error]:', error);
    return {
      threatScore: 0,
      reason: "Detection engine failure",
      signals: {}
    };
  }
}
