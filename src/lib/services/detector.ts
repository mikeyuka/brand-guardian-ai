import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ProductData {
  title: string;
  price: number;
  msrp: number;
  seller: string;
  platform: string;
}

export interface DetectionResult {
  threatScore: number;
  reason: string;
}

export async function detectThreat(product: ProductData): Promise<DetectionResult> {
  const prompt = `
    Analyze the following e-commerce product listing for potential brand violations (counterfeits, hijackers, or unauthorized resellers).
    
    Product Details:
    - Title: ${product.title}
    - Platform: ${product.platform}
    - Listing Price: $${product.price}
    - Authorized MSRP: $${product.msrp}
    - Seller Name: ${product.seller}

    Criteria for high threat score:
    1. Price is significantly lower than MSRP (>30% discount).
    2. Seller name is suspicious (e.g., generic names, random characters, "Direct-Shop").
    3. Listing title contains suspicious keywords like "OEM", "Compatible", or "Replacement" for items that should be original.
    
    Return the result in JSON format:
    {
      "threatScore": number (0-100),
      "reason": "short explanation of the score"
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert e-commerce brand protection agent." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || '{"threatScore": 0, "reason": "No data returned"}';
    return JSON.parse(content) as DetectionResult;
  } catch (error) {
    console.error('Error in detection engine:', error);
    return {
      threatScore: 0,
      reason: "Error communicating with detection engine"
    };
  }
}
