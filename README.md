# Finance Tracker

A full-stack personal finance tracker built as a learning project to move beyond client-side-only apps into real backend, auth, and async data patterns.

**Live demo:** [finance-tracker-tawny-zeta.vercel.app](https://finance-tracker-tawny-zeta.vercel.app)

## Why this project

My previous project (a Movie app) used React + Redux Toolkit + Axios against a read-only third-party API — great for learning frontend state, but it never touched a real backend. This project was chosen specifically to close those gaps: a real database, real authentication, server state management, and non-trivial async patterns like pagination, debounced search, and optimistic updates.

## Tech stack

- **React 18** + **TypeScript** + **Vite**
- **TanStack Query** — server state, caching, mutations (chosen over RTK Query for market relevance)
- **Supabase** — Postgres database, authentication, and Row Level Security
- **React Router v6** — routing and protected routes
- **Recharts** — dashboard visualizations
- **Tailwind CSS** — styling

## Features

- Email/password authentication with persistent sessions (Supabase Auth)
- Protected routes — unauthenticated users are redirected to `/login`
- Row Level Security — every user can only read/write their own transactions
- Add, view, and delete transactions
- Server-side pagination
- Debounced, server-side search across description and category
- Optimistic UI updates for add/delete, with automatic rollback on failure
- Dashboard with income/expense totals, balance, category breakdown, and monthly spending trend
- Loading, error, and empty states across all queries and mutations
- Deployed on Vercel

## Project status

All planned phases are complete and the app is deployed.

| Phase | Description                                                    | Status |
| ----- | -------------------------------------------------------------- | ------ |
| 0–1   | Project scaffold, Supabase schema, RLS policies                | ✅ Done |
| 2–3   | Auth context, protected routes, basic CRUD with TanStack Query | ✅ Done |
| 4     | Server-side pagination, debounced search                       | ✅ Done |
| 5     | Optimistic updates (add/delete)                                | ✅ Done |
| 6     | Dashboard + Recharts visualizations                            | ✅ Done |
| 7     | Loading/error states, empty states, deployment                 | ✅ Done |

### Known limitations

- Transactions can be added and deleted, but not edited yet.

## Getting started

### Prerequisites

- Node.js
- A free [Supabase](https://supabase.com) project

### Setup

1. Clone the repo

   ```bash
   git clone https://github.com/hala912/finance-tracker.git
   cd finance-tracker
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   Create a `.env` file in the project root:

   ```
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Set up the database

   In your Supabase project's SQL editor, run:

   ```sql
   create table transactions (
     id uuid primary key default gen_random_uuid(),
     user_id uuid references auth.users not null,
     amount numeric not null,
     type text not null, -- 'income' or 'expense'
     category text not null,
     description text,
     occurred_on date not null,
     created_at timestamptz default now()
   );

   alter table transactions enable row level security;

   create policy "Users can manage their own transactions"
     on transactions
     for all
     using (auth.uid() = user_id)
     with check (auth.uid() = user_id);
   ```

5. Run the dev server

   ```bash
   npm run dev
   ```

## Deployment

The app is deployed on [Vercel](https://vercel.com), connected directly to this repo's `main` branch. Environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are configured in the Vercel project settings, and Supabase's Auth redirect URLs are updated to include the production domain.

## Project structure

```
src/
├── components/
│   └── transactions/     # TransactionForm, TransactionsRow, etc.
├── hooks/                # useAddTransaction, useRemoveTransaction, useTransaction, etc.
├── context/              # AuthContext / AuthProvider
├── types/                # Shared TypeScript types (Transaction, NewTransaction)
├── lib/                  # Supabase client setup
└── pages/                # Route-level pages
```

## Contributing

Contributions are welcome — check open issues for tasks that are up for grabs.

## License

MIT