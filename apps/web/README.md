# Udbhavi Web

Next.js App Router frontend for the Udbhavi resume workspace.

## Current Direction

The client now has a Phase 2 foundation focused on:

- A shadcn-compatible design system structure.
- Light and dark theming through `next-themes`.
- Tokenized Tailwind v4 color variables in `src/app/globals.css`.
- A SaaS-style landing page with clear product positioning.
- Functional `/signup`, `/login`, and `/workspace` route flow wired to the backend auth APIs.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Local Auth Note

The frontend expects the backend API at:

```text
http://127.0.0.1:8000
```

Override it if needed with:

```text
NEXT_PUBLIC_API_BASE_URL=...
```

## UI Stack

- Next.js App Router
- React 19
- Tailwind CSS v4
- `next-themes` for theme switching
- shadcn-compatible component structure with CVA, `clsx`, and `tailwind-merge`
- `sonner` for future notifications

## Next Phase Targets

- Progressive onboarding flow after auth
- Real upload/template entry actions inside the workspace
- Template selection and version-aware resume editing
- Job targeting, ATS guidance, and richer resume dashboard flows
