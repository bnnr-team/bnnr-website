# BNNR Website

Official website for [BNNR (Bulletproof Neural Network Recipe)](https://github.com/bnnr-team/bnnr) — a PyTorch library for automated augmentation search with XAI explainability and a real-time dashboard.

## Tech Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS 3 + CSS custom properties (dual theme)
- **Content:** MDX for documentation pages
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Syntax highlighting:** Shiki via rehype-pretty-code

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Produces a fully static export in `out/`. The site uses `output: 'export'` in `next.config.mjs` — no Node.js server needed at runtime.

## Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com), import the repository
3. Vercel auto-detects Next.js and handles everything
4. Click Deploy
5. Add custom domain in Vercel Dashboard → Settings → Domains

### Custom Domain DNS

Point your domain to Vercel:

| Record | Name | Value |
|--------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Vercel automatically provisions SSL certificates.

## Project Structure

```
├── public/
│   ├── logos/               # BNNR logos (dark/light variants)
│   ├── playground/          # Augmentation preview images (generated with BNNR); see ATTRIBUTION.md
│   └── team/                # Team profile photos
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home page
│   │   ├── layout.tsx       # Root layout (metadata, navbar, footer)
│   │   ├── docs/            # Documentation (MDX pages)
│   │   ├── playground/      # Interactive augmentation gallery
│   │   ├── community/       # Community & contributing
│   │   └── team/            # Team page
│   ├── components/          # React components
│   └── styles/              # Global CSS
├── next.config.mjs          # Next.js config (static export + MDX)
├── tailwind.config.ts       # Tailwind theme (BNNR brand colors)
└── package.json
```

## Keeping docs in sync with the library repo

Canonical user docs live in the sibling clone [bnnr-team/bnnr](https://github.com/bnnr-team/bnnr) under `docs/` (code-verified; see `DOCUMENTATION_AUDIT_REPORT.md` there).

From this repo (expects `../bnnr/docs` on disk):

```bash
python3 scripts/sync_docs_from_bnnr.py
npm run build
```

The script copies audited pages into `src/app/docs/*/page.mdx`, rewrites internal links to `/docs/.../`, strips PyPI badges, and patches the extended **Augmentations** and **Model Analysis** pages where the site has extra content.

After a release, also check manually:

1. **Homepage** — `src/components/Hero.tsx`, `TerminalAnimation.tsx` vs `bnnr/README.md`
2. **Assets** — copy new files from `bnnr/docs/assets/` into `public/` when needed
3. **Community** — Discussions: `https://github.com/bnnr-team/bnnr/discussions` (repo-level, not org-level)

## License

MIT — same as the [BNNR library](https://github.com/bnnr-team/bnnr).
