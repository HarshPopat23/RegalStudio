# Regal Studio

A production-ready React + Vite catalog for Regal Studio, with Appwrite database,
storage and admin authentication integration.

## Stack

- React 19
- Vite
- Tailwind CSS 4
- React Router
- Appwrite Account, Databases and Storage
- Vercel-compatible SPA routing

## Local development

1. Install Node.js 20 or newer.
2. Configure Appwrite by following `APPWRITE_SETUP.md`.
3. Copy `.env.example` to `.env` and add the Appwrite IDs.
4. Install and run:

```powershell
npm install
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

## Production build

```powershell
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Vercel deployment

1. Push the project to a GitHub repository.
2. Import it into Vercel.
3. Framework preset: `Vite`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add every variable from `.env.example` in Vercel Project Settings.
7. Deploy.

The included `vercel.json` makes direct links such as `/products/example`
resolve to the React application.

Never commit `.env`, Appwrite API keys or admin passwords.
