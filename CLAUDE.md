# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MusiQuiz marketing website — a static landing page for the MusiQuiz mobile app (Flutter music guessing game). Built with Astro and deployed to GitHub Pages.

**Live site**: https://pimverlangen.github.io/musiquiz-website/

## Commands

```bash
npm run dev      # Start dev server (http://localhost:4321)
npm run build    # Build to dist/
npm run preview  # Preview production build locally
```

## Architecture

- **Astro 5** static site with zero client-side JavaScript
- **Tailwind CSS 4** via Vite plugin (configured in `astro.config.mjs`)
- Auto-deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`

### Key Files

- `src/config.ts` — Site-wide configuration (name, tagline, contact email, store URLs)
- `src/layouts/BaseLayout.astro` — Shared HTML head with SEO/Open Graph meta, nav, footer
- `src/styles/global.css` — Tailwind config with MusiQuiz brand colors

### Brand Colors (defined in `global.css`)

- `--color-navy: #1a1a2e` (background)
- `--color-purple: #8B5CF6` (primary accent)
- `--color-purple-light: #A78BFA`
- `--color-purple-dark: #7C3AED`

## Important Configuration

The site is configured for GitHub Pages subpath deployment:
- `site`: `https://pimverlangen.github.io`
- `base`: `/musiquiz-website/`

All internal links and assets must use `import.meta.env.BASE_URL` prefix.

## Store Links

App store URLs in `src/config.ts` are empty strings until the app launches. Components show "Coming soon" badges when URLs are empty.
