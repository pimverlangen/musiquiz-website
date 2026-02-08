# MusiQuiz Marketing Website

## Context

MusiQuiz is a Flutter-based music guessing/timeline game for iOS and Android. It needs a marketing/landing page website with app store links, feature overview, screenshots, and a privacy policy. The site is fully static — no backend or dynamic features needed.

## Recommendation: Astro + GitHub Pages (or Cloudflare Pages)

### Why Astro over TanStack Start?

**TanStack Start is not a good fit** for this use case:
- Still in **alpha** — APIs will change, documentation has gaps
- Designed for **full-stack apps** with server functions, data fetching, etc. — none of which is needed here
- Ships React runtime to the client for hydration — unnecessary overhead for static content

**Astro is purpose-built for exactly this**:
- **Zero JavaScript** shipped by default — fastest possible page loads, perfect Lighthouse scores
- Stable (v4+), large community, extensive documentation
- Built-in Markdown support (great for privacy policy page)
- Built-in sitemap generation and SEO helpers
- File-based routing
- If you ever want to add an interactive component (e.g., screenshot carousel), you can add a React/Vue/Svelte "island" without framework migration

### Hosting: GitHub Pages vs Cloudflare Pages

| | GitHub Pages | Cloudflare Pages |
|---|---|---|
| **Cost** | Free | Free |
| **Setup** | Simplest (Astro has official GH Action) | Easy (connect repo) |
| **CDN** | Basic (Fastly) | Excellent (275+ PoPs) |
| **Bandwidth** | 100 GB/mo | **Unlimited** |
| **PR previews** | No | Yes |
| **Analytics** | No | Free, privacy-friendly |
| **Custom headers** | No | Yes |

**Recommendation**: Start with **GitHub Pages** for simplicity. If you later want better global performance or analytics, migrating to Cloudflare Pages is trivial — just connect the same repo.

## Decisions (locked in)

- **Brand name**: Use **MusiQuiz** for all copy/meta. `musiquiz-website` is repo-only.
- **Hosting target**: GitHub Pages at `https://pimverlangen.github.io/musiquiz-website` with Astro `site` set to that URL and `base: "/musiquiz-website"` for correct asset paths.
- **Store CTAs**: Show official Apple/Google badges styled as **"Coming soon"** with no outbound links until live store URLs exist; swap links later without layout changes.
- **Privacy policy scope**: Website-only policy (static site, no backend). State **no cookies**, **no analytics**, **no personal data collection** on the website. Contact email: `support@musiquiz.app`. Add "Last updated" on publish date.
- **Assets**: Copy logos/screenshots into this repo; do **not** reference `../hitstarr/assets/` at runtime.
- **Lighthouse**: Target **>=95** for Performance, Accessibility, Best Practices, SEO (not hard 100s).

## Project Structure

```
musiquiz-website/
  src/
    layouts/
      BaseLayout.astro          # Shared HTML head, nav, footer
    pages/
      index.astro               # Landing page (hero, features, store links)
      privacy.md                # Privacy policy (rendered via layout)
    components/
      Hero.astro                # Hero section with logo + tagline
      Features.astro            # Feature grid (Classic mode, Timeline mode)
      AppStoreLinks.astro       # iOS/Android store badges
      Footer.astro              # Footer with links
    assets/
      branding/                 # Logos + wordmark (copied in)
      screenshots/              # App screenshots (copied in)
  public/
    favicon.ico
    apple-touch-icon.png        # 180x180
    og-image.png                # 1200x630 for social sharing
  astro.config.mjs              # Site URL, integrations (sitemap, etc.)
  .github/
    workflows/
      deploy.yml                # GitHub Pages auto-deploy
```

## Implementation Steps

1. **Scaffold Astro project** — `npm create astro@latest` in `musiquiz-website/`
2. **Configure** — Set `site` to `https://pimverlangen.github.io/musiquiz-website` and `base` to `/musiquiz-website`; add sitemap integration in `astro.config.mjs`
3. **Create base layout** — HTML head with SEO meta/Open Graph tags, nav, footer
4. **Build landing page** — Hero with logo (copied into `src/assets/branding`), feature sections for both game modes, "Coming soon" store badges without links
5. **Add privacy policy** — Markdown page with base layout
6. **Style with Tailwind CSS** — Match MusiQuiz' dark theme (`#1a1a2e` background, `#8B5CF6` purple accent)
7. **Set up GitHub Pages deployment** — GitHub Actions workflow using `withastro/action@v5`
8. **Initialize git repo and push**

## Branding (from hitstarr app)

- Primary color: `#8B5CF6` (purple)
- Background: `#1a1a2e` (dark navy)
- Theme: Material 3 dark mode
- Logos available (copy in): `../hitstarr/assets/logo.png`, `logo_v2.png`, `logo_foreground.png`

## Verification

- Run `npm run dev` and verify all pages render correctly
- Run `npm run build` and check the `dist/` output is pure static HTML
- Verify privacy policy renders from Markdown
- Check meta tags and Open Graph tags in page source
- Run Lighthouse audit on built site (target: >=95 on all categories)
- Deploy to GitHub Pages and verify live site
