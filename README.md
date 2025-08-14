# Python Learning Platform (Frontend)

🔗 Live App: https://python-learning-platform-sigma.vercel.app/

A modern React + TypeScript + Vite + Tailwind CSS web app for learning Python through interactive tutorials, practice problems, progress tracking, and an in-browser code editor.

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Monaco Editor (@monaco-editor/react)
- React Router DOM
- Lucide Icons

## Features
- Interactive tutorial pages with rich Markdown-style content
- Practice problems list & detail view
- In-browser Python code editor interface (frontend shell)
- Output panel with execution result placeholder
- User dashboard (progress, streak, stats)
- Global layout with navigation header
- Reusable UI components (Badge, ProgressBar, Layout, CodeEditor)

## Project Structure
```
src/
  App.tsx              # Routes
  index.css            # Tailwind + base styles
  main.tsx             # React entry
  components/          # Reusable UI + editor
  pages/               # Route pages (Home, Tutorials, Problems, etc.)
  data/                # Static seed data (tutorials, problems)
  services/api.ts      # Mock API service (in‑memory)
  types/               # TypeScript interfaces
  utils/               # Helpers (e.g., cn.ts)
```

## Local Development
```bash
# Install deps
npm install

# Run dev server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
App runs at: http://localhost:5173/

## Tailwind Setup
Utilities and custom colors (primary, success, warning, error) are defined in `tailwind.config.js`. Global component classes (e.g. `btn`, `card`, `badge`) are composed via `@layer components` in `src/index.css`.

## Types
Core domain models live in `src/types/index.ts` (User, Tutorial, Problem, TestCase, ExecutionResult, etc.). Static tutorial/problem data conforms to these interfaces.

## Mock API Service
`apiService` simulates basic operations (fetch tutorials/problems, user progress). Replace with real backend calls later (e.g., REST or GraphQL).

## Code Editor
`CodeEditor` + `OutputPanel` compose a minimal coding workspace using Monaco. Execution is not wired to a backend yet—extend `apiService` or add a serverless endpoint to run code securely (e.g., sandboxed container / third‑party API).

### Real Python Execution
The app now attempts real execution via the public Piston API (Python 3.10). If the remote call fails (network / rate limit), it falls back to a lightweight mock evaluator.

Override the Piston API base (optional) by creating a `.env` file:
```bash
VITE_PISTON_API=https://your-proxy.example.com/api/v2/piston
```
For production you should proxy requests through your own backend to enforce limits and hide third‑party endpoints.

## Deployment (Vercel)
Live Production: https://python-learning-platform-sigma.vercel.app/

Build settings:
- Build Command: `npm run build`
- Output Directory: `dist`

Quick deploy from local:
```bash
npx vercel
npx vercel --prod   # promote to production
```

## Extending / Next Steps
- Wire real code execution backend (Python sandbox)
- Persist user auth & progress (JWT + DB)
- Add search & filtering for problems
- Add submission history & leaderboard
- Dark mode toggle
- Unit tests (Vitest + React Testing Library)

## License
MIT (add a LICENSE file if you intend to open source)

---
Made with passion for learning. Contributions welcome.
