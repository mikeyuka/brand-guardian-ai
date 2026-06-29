-- schema.sql
-- Foundational schema for AI Amazon Brand Guardian (AI-ABG)

-- 1. Brands Table
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    owner_id UUID NOT NULL, -- References auth.users(id) in Supabase
    amazon_brand_registry_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Monitored Items Table
CREATE TABLE IF NOT EXISTS monitored_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    platform TEXT NOT NULL DEFAULT 'amazon', -- e.g., 'amazon', 'ebay', 'temu'
    identifier TEXT NOT NULL, -- ASIN or SKU
    msrp DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Whitelisted Sellers Table
CREATE TABLE IF NOT EXISTS whitelisted_sellers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    seller_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(brand_id, seller_name)
);

-- 4. Incidents Table
CREATE TABLE IF NOT EXISTS incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    monitored_item_id UUID REFERENCES monitored_items(id) ON DELETE CASCADE,
    seller_name TEXT NOT NULL,
    price DECIMAL(10, 2),
    threat_level TEXT CHECK (threat_level IN ('low', 'medium', 'high', 'critical')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'neutralized', 'false_positive')),
    evidence_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enforcement Logs Table
CREATE TABLE IF NOT EXISTS enforcement_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id UUID REFERENCES incidents(id) ON DELETE SET NULL,
    platform_reference TEXT, -- Case ID or reference from Amazon/eBay
    action_taken TEXT NOT NULL, -- e.g., 'takedown_requested', 'cease_and_desist_sent'
    status TEXT NOT NULL, -- e.g., 'success', 'failed', 'under_review'
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
