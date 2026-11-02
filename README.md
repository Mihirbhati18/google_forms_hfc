# HFC Forms

A custom form builder made for **Happy Folks Club** to replace Google Forms, with the club's own branding and a smoother, animated filling experience.

**Live:** https://google-forms-hfc.vercel.app

## Why

Google Forms works, but every form looks the same and can't carry the club's look. HFC Forms gives the club its own forms site: admins build forms in a dashboard, members fill them at a clean link (`/forms/<slug>`), and responses land in one place.

## Features

- **Form builder** with 10 question types: short text, long text, multiple choice, checkboxes, dropdown, date, phone, file upload, rating and section headers
- **Conditional questions**: show a question only when an earlier answer matches
- **Form settings**: open and close dates, a response limit, and a custom thank-you message
- **Responses page** with CSV export
- **Admin login** with Supabase Auth, and row-level security on the database
- **Re-skinnable**: change the club name, colours, fonts and images in one file (`src/config/theme.ts`) and the whole site updates

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Zustand · Supabase (Postgres + Auth) · Vercel

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Create a `.env.local` with your Supabase project details:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

The database schema is in [`src/lib/supabase/schema.sql`](./src/lib/supabase/schema.sql). Run it in the Supabase SQL editor once.

## Project layout

```
src/app/admin/        dashboard, form builder, responses, settings
src/app/forms/[slug]  public form page + success page
src/components/form/  form renderer and all question inputs
src/stores/           Zustand stores for building and submitting forms
src/lib/supabase/     client, server helpers, schema
src/config/theme.ts   branding in one place
```
