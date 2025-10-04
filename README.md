# DeepCurrent Site

A modern Next.js website for DeepCurrent with an integrated customer proposals portal powered by Supabase.

## Features

- **Landing Page**: Clean, modern design with hero section, feature cards, and company information
- **Proposals Portal**: Complete CRUD system for managing customer project proposals
  - Create new proposals with detailed project information
  - View and manage proposal status (draft, sent, accepted, rejected)
  - Interactive proposal detail pages for client presentations

## Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account and project

### Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Schema

Run this SQL in your Supabase SQL editor to create the proposals table:

```sql
-- Create proposals table
CREATE TABLE proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  project_overview TEXT NOT NULL,
  objectives TEXT,
  deliverables TEXT,
  timeline TEXT,
  budget_range TEXT,
  technical_requirements TEXT,
  success_metrics TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations on proposals" ON proposals
  FOR ALL USING (true);
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Proposals Portal

Access the proposals portal at [http://localhost:3000/proposals](http://localhost:3000/proposals) to:
- View all proposals
- Create new proposals
- Manage proposal status
- View detailed proposal information

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
