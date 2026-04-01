# Mohamed Dahy Portfolio (Next.js + App Router)

Modern, multilingual portfolio for Mohamed Dahy (Front-End Developer and Software Engineer).

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- next-intl (EN/AR)
- Framer Motion
- shadcn-style reusable UI components
- Lucide React icons
- React Hook Form + Zod
- Sonner
- Nodemailer API integration

## Key Features

- Bilingual routing with `/en` and `/ar`
- Language persistence using `localStorage` and `NEXT_LOCALE` cookie
- RTL support for Arabic layout and typography
- Localized SEO metadata per locale
- Dark/light theme toggle with system detection
- Interactive portfolio sections with animation
- Typing effect in hero section
- Skill progress bars and animated counters
- Project filtering and dynamic project pages (`/[locale]/projects/[id]`)
- Contact form with backend email endpoint

## Project Structure

```bash
src/
  app/
    [locale]/
      layout.tsx
      loading.tsx
      page.tsx
      projects/[id]/page.tsx
    api/contact/route.ts
    globals.css
    layout.tsx
  components/
    portfolio/
    ui/
    providers.tsx
  data/portfolio.ts
  i18n/
    navigation.ts
    request.ts
    routing.ts
  messages/
    en.json
    ar.json
middleware.ts
```

## Setup

1. Install packages:

```bash
npm install
```

1. Configure environment:

```bash
cp .env.example .env.local
```

1. Fill SMTP values in `.env.local`.

1. Run development server:

```bash
npm run dev
```

1. Open:

- English: `http://localhost:3000/en`
- Arabic: `http://localhost:3000/ar`

## SMTP Environment Variables

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_RECEIVER_EMAIL`

When SMTP values are missing, contact API returns `503`.

## Useful Commands

```bash
npm run lint
npm run build
npm run start
```

## Docker

Build the image:

```bash
docker build -t mohamed-dahy-portfolio .
```

Run the container:

```bash
docker run --env-file .env.local -p 3000:3000 mohamed-dahy-portfolio
```

## Notes

- Replace `public/resume-mohamed-dahy.pdf` with final resume.
- Update social profile links in `src/data/portfolio.ts`.
