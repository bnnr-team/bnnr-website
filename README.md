# BNNR Website

Official website for [BNNR (Bulletproof Neural Network Recipe)](https://github.com/bnnr-team/bnnr) — a PyTorch library for automated augmentation search with XAI explainability and a real-time dashboard.

**Live site:** [https://bnnr.dev](https://bnnr.dev)

## Tech Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS 3 + CSS custom properties (dual theme)
- **Content:** MDX for documentation pages
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Syntax highlighting:** Shiki via rehype-pretty-code

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

This produces a fully static export in the `out/` directory. The site uses `output: 'export'` in `next.config.mjs`, so no Node.js server is needed at runtime.

## Deployment

### Option A: Static hosting (Recommended for custom domain)

Since the site is a static export, you can host it on any static file server.

**1. Build the site:**

```bash
npm run build
```

**2. Upload `out/` to your hosting provider:**

| Provider | How |
|----------|-----|
| **Netlify** | Connect repo → Build command: `npm run build` → Publish directory: `out` |
| **Vercel** | Connect repo → Framework: Next.js → It detects static export automatically |
| **Cloudflare Pages** | Connect repo → Build command: `npm run build` → Output directory: `out` |
| **GitHub Pages** | Push `out/` contents to `gh-pages` branch, or use GitHub Actions (see below) |
| **Traditional VPS (Nginx)** | Copy `out/` to server, serve with Nginx (see config below) |

### Option B: Vercel (Zero-config)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com), import the repository
3. Vercel auto-detects Next.js and handles everything
4. Add custom domain `bnnr.dev` in Vercel dashboard → Domains

### Option C: Netlify

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com), import the repository
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
4. Add custom domain in Netlify → Domain settings

### Option D: Cloudflare Pages

1. Push this repo to GitHub
2. Go to Cloudflare Dashboard → Pages → Create a project
3. Connect to Git, select this repository
4. Build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
5. Add custom domain in Cloudflare Pages → Custom domains

### Option E: GitHub Pages with Actions

Add this workflow as `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then go to repo Settings → Pages → Source: GitHub Actions.

### Option F: VPS with Nginx

**1. Build locally and upload:**

```bash
npm run build
rsync -avz out/ user@your-server:/var/www/bnnr.dev/
```

**2. Nginx configuration:**

```nginx
server {
    listen 80;
    server_name bnnr.dev www.bnnr.dev;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bnnr.dev www.bnnr.dev;

    ssl_certificate /etc/letsencrypt/live/bnnr.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bnnr.dev/privkey.pem;

    root /var/www/bnnr.dev;
    index index.html;

    # Next.js static export uses trailing slashes
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    # Cache static assets
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache images
    location ~* \.(png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # Custom 404
    error_page 404 /404/index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 256;
}
```

**3. SSL with Let's Encrypt:**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d bnnr.dev -d www.bnnr.dev
```

## Custom Domain Setup

Regardless of hosting provider, you need to configure DNS for `bnnr.dev`:

1. **Buy the domain** from your registrar (e.g., Cloudflare, Namecheap, Google Domains)
2. **Point DNS** to your hosting provider:
   - **Vercel:** Add CNAME `bnnr.dev` → `cname.vercel-dns.com`
   - **Netlify:** Add CNAME `bnnr.dev` → `your-site.netlify.app`
   - **Cloudflare Pages:** Managed automatically when using Cloudflare DNS
   - **VPS:** Add A record pointing to your server IP
3. **Add `www` redirect:** CNAME `www.bnnr.dev` → `bnnr.dev`

## Project Structure

```
├── public/                  # Static assets
│   ├── logos/               # BNNR logos (dark/light variants)
│   ├── playground/          # Augmentation preview images
│   ├── samples/             # Sample augmentation outputs
│   └── xai/                 # XAI visualization images
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home page
│   │   ├── layout.tsx       # Root layout (metadata, navbar, footer)
│   │   ├── docs/            # Documentation (MDX pages)
│   │   ├── benchmark/       # Benchmark results page
│   │   ├── showcase/        # Case studies
│   │   ├── playground/      # Interactive augmentation gallery
│   │   ├── community/       # Community & contributing
│   │   └── team/            # Team page
│   ├── components/          # React components
│   └── styles/              # Global CSS
├── next.config.mjs          # Next.js config (static export + MDX)
├── tailwind.config.ts       # Tailwind theme (BNNR brand colors)
└── package.json             # Dependencies and scripts
```

## License

MIT — same as the [BNNR library](https://github.com/bnnr-team/bnnr).
