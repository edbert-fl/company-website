-- Add problems_faced and our_solution fields to the proposals table
-- This SQL script adds the new fields needed for the Problems & Solutions section

ALTER TABLE proposals 
ADD COLUMN problems_faced TEXT,
ADD COLUMN our_solution TEXT;

-- Optional: Add comments to document the new fields
COMMENT ON COLUMN proposals.problems_faced IS 'Description of current problems and challenges the client is facing';
COMMENT ON COLUMN proposals.our_solution IS 'Explanation of how our solution addresses the problems and provides value';

-- Optional: Update existing proposals with default values if needed
-- UPDATE proposals 
-- SET problems_faced = 'No specific problems documented', 
--     our_solution = 'Solution details to be added'
-- WHERE problems_faced IS NULL OR our_solution IS NULL;
