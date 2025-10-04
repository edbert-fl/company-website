-- Updated SQL schema for proposals with pricing plans and success criteria arrays

-- Drop existing table if it exists (be careful in production!)
DROP TABLE IF EXISTS proposals CASCADE;

-- Create proposals table with JSON fields for flexible data
CREATE TABLE proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  project_overview TEXT NOT NULL,
  objectives TEXT,
  timeline TEXT,
  budget_range TEXT,
  technical_requirements TEXT,
  -- JSON fields for flexible data structures
  pricing_plans JSONB DEFAULT '[]'::jsonb,
  success_criteria JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations on proposals" ON proposals
  FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_created_at ON proposals(created_at);
CREATE INDEX idx_proposals_pricing_plans ON proposals USING GIN (pricing_plans);
CREATE INDEX idx_proposals_success_criteria ON proposals USING GIN (success_criteria);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on row changes
CREATE TRIGGER update_proposals_updated_at 
    BEFORE UPDATE ON proposals 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Example data structure for pricing_plans:
-- [
--   {
--     "title": "Essentials",
--     "price": "$25,000",
--     "description": "Core functionality package",
--     "deliverables": [
--       "Basic chatbot implementation",
--       "Standard integrations",
--       "Email support"
--     ],
--     "features": [
--       "Up to 1000 conversations/month",
--       "Basic analytics dashboard",
--       "Standard response templates"
--     ]
--   },
--   {
--     "title": "Premium", 
--     "price": "$50,000",
--     "description": "Advanced features package",
--     "deliverables": [
--       "Advanced AI chatbot",
--       "Custom integrations",
--       "Priority support",
--       "Training sessions"
--     ],
--     "features": [
--       "Unlimited conversations",
--       "Advanced analytics & reporting",
--       "Custom branding",
--       "API access",
--       "24/7 phone support"
--     ]
--   }
-- ]

-- Example data structure for success_criteria:
-- [
--   {
--     "title": "Performance Metrics",
--     "criteria": [
--       "Response time < 2 seconds",
--       "95% uptime",
--       "Handle 1000+ concurrent users"
--     ]
--   },
--   {
--     "title": "Business Impact",
--     "criteria": [
--       "70% query resolution without human intervention",
--       "Customer satisfaction > 4.5/5",
--       "25% reduction in support tickets"
--     ]
--   }
-- ]
