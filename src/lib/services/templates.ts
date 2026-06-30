import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface TemplateData {
  brandName: string;
  sellerName: string;
  infringingUrl: string;
  violationType: 'trademark' | 'copyright';
  platform: string;
  identifier: string; // ASIN/SKU
}

export async function generateTakedownNotice(data: TemplateData): Promise<string> {
  console.log(`[TemplateEngine] Generating ${data.violationType} notice for ${data.platform}...`);

  const prompt = `
    Generate a professional and legally sound takedown notice for the following violation.
    
    Platform: ${data.platform}
    Brand: ${data.brandName}
    Target Seller: ${data.sellerName}
    Infringing Item (ASIN/SKU): ${data.identifier}
    Evidence URL: ${data.infringingUrl}
    Violation Type: ${data.violationType === 'trademark' ? 'Trademark Infringement' : 'Copyright Infringement (Digital Millennium Copyright Act)'}

    Requirements:
    - Include a formal statement of authorization.
    - Reference the specific ${data.violationType} violation.
    - Demand immediate removal of the listing.
    - Include standard legal "good faith" and "under penalty of perjury" clauses.
    
    Output only the plain text of the notice.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a legal assistant specializing in e-commerce intellectual property enforcement." },
        { role: "user", content: prompt }
      ]
    });

    return response.choices[0].message.content || "Template generation failed.";
  } catch (error) {
    console.error('[TemplateEngine Error]:', error);
    throw new Error('Failed to generate compliance-ready template.');
  }
}
