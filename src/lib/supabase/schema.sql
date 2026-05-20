-- forms table
CREATE TABLE forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  success_message TEXT DEFAULT 'Thank you for your submission!',
  is_active BOOLEAN DEFAULT true,
  max_responses INTEGER,
  opens_at TIMESTAMPTZ,
  closes_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- questions table
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- short_text, long_text, multiple_choice, checkboxes, dropdown, date, phone, file_upload, rating, section_header
  label TEXT NOT NULL,
  help_text TEXT,
  required BOOLEAN DEFAULT false,
  order_index INTEGER NOT NULL,
  options JSONB, -- for MCQ/checkbox/dropdown: ["Option 1", "Option 2"]
  conditions JSONB, -- { questionId: "...", operator: "equals", value: "..." }
  created_at TIMESTAMPTZ DEFAULT now()
);

-- responses table
CREATE TABLE responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  metadata JSONB -- user agent, IP hash, etc.
);

-- answers table
CREATE TABLE answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  response_id UUID REFERENCES responses(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  value JSONB -- text value, array of selections, file URL, etc.
);

-- RLS policies
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Public: can read active forms and their questions
-- Public: can INSERT responses and answers (but not read others')
-- Admin: full CRUD on everything
