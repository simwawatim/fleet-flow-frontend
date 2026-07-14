# Car Management System (FleetFlow)

A fleet cash flow management web app for tracking vehicles, drivers, cash collection schedules, and transaction history. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Auth** — sign in, sign up, forgot password, and reset password flows
- **Vehicles** — list, search, and add vehicles with status tracking (Active / Maintenance / Inactive)
- **Drivers** — list, search, and add drivers with license and vehicle assignment tracking
- **Transactions** — record trip revenue, fuel, maintenance, and other cash flow events per vehicle
- **Cashing Schedule** — set weekly/monthly/yearly cash collection targets and due days per driver/vehicle
- **Vehicle Details** — a combined view per vehicle showing vehicle info, assigned driver, cash settings, and transaction history
- **Profile** — view and edit account details

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- React + TypeScript
- Tailwind CSS
- [lucide-react](https://lucide.dev) for icons

## Project Structure

```
app/
├── login/
│   └── page.tsx
├── register/
│   └── page.tsx
├── forgot-password/
│   └── page.tsx
├── reset-password/
│   └── page.tsx
├── dashboard/
│   └── page.tsx
├── vehicles/
│   └── page.tsx
├── drivers/
│   └── page.tsx
├── transactions/
│   └── page.tsx
├── cashing-schedule/
│   └── page.tsx
├── details/
│   └── [id]/
│       └── page.tsx
├── profile/
│   └── page.tsx
├── components/
│   ├── auth/
│   ├── vehicles/
│   ├── drivers/
│   ├── transactions/
│   ├── cashing-schedule/
│   ├── profile/
│   ├── home/
│   └── contexts/       # Sidebar, Header, Detailspage
└── data/
    └── static/          # shared mock data (nav items, sample records)
```

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

Most pages currently run on local component state with mock data as placeholders. Each page has a `// Hook up to your ... API call here` comment marking where to wire up real backend requests.

## Environment Variables

Create a `.env.local` file in the project root for any API base URLs or keys your backend requires, e.g.:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

The easiest way to deploy this app is via [Vercel](https://vercel.com/new), the creators of Next.js. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for other options.
