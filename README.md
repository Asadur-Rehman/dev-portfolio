# Full-Stack Developer Portfolio

A modern, dark-theme portfolio built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed for Full-Stack/MERN developers targeting remote USD-paying jobs.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Space Mono (display), Work Sans (body), JetBrains Mono (code)
- **Contact form:** Web3Forms (free)
- **Deployment:** Vercel

## Quick Start

```bash
npm install
cp .env.example .env.local
# Add your Web3Forms key to .env.local (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Setup

### 1. Web3Forms (contact form)

1. Go to [web3forms.com](https://web3forms.com) and create a free account.
2. Get your **Access Key**.
3. In `.env.local` add:
   ```env
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
4. The contact form will send submissions to the email you used for Web3Forms.

### 2. Optional: Site URL (SEO & sitemap)

For production, set your live URL so sitemap and JSON-LD use it:

```env
NEXT_PUBLIC_SITE_URL=https://yourportfolio.vercel.app
```

### 3. Optional: Google Analytics

1. Create a GA4 property and get your Measurement ID (e.g. `G-XXXXXXXXXX`).
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. Add the GA script in `src/app/layout.tsx` (see [Next.js Analytics docs](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)).

## Customizing Content

All editable content is in **`src/data/`**. No need to hunt through components.

| File | What to edit |
|------|----------------|
| **`personal.ts`** | Name, title, headline, bio, email, availability text, resume URL, location, timezone |
| **`projects.ts`** | Project list: title, description, image URL, tags, category, live/github/case study links, `featured` |
| **`experience.ts`** | Jobs: company, role, duration, achievements, tech stack |
| **`skills.ts`** | Skills list and categories (Frontend, Backend, Database, Tools) |
| **`socials.ts`** | GitHub, LinkedIn, Twitter, email URLs |

### Colors and fonts

- **Colors:** `src/app/globals.css` — change `--accent`, `--background`, etc.
- **Tailwind theme:** `tailwind.config.ts` — colors, shadows, keyframes.
- **Fonts:** `src/app/layout.tsx` — swap Google Fonts if you want (e.g. Clash Display, Epilogue).

### Adding a new project

1. Open `src/data/projects.ts`.
2. Add an object to the `projects` array (see existing shape: `id`, `title`, `description`, `image`, `tags`, `category`, `liveUrl`, `githubUrl`, `caseStudyUrl`, `featured`).
3. Use a real image URL or an [Unsplash](https://unsplash.com) URL; Next.js is configured for `images.unsplash.com`.

### Adding resume PDF

1. Put your PDF in `public/resume.pdf`.
2. In `src/data/personal.ts`, set `resumeUrl: "/resume.pdf"`.

## Deployment (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. Click **Add New** → **Project**.
3. Import your GitHub repo. Leave framework preset as **Next.js**.
4. **Environment Variables:**  
   Add:
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` = your Web3Forms key  
   - `NEXT_PUBLIC_SITE_URL` = `https://your-project.vercel.app` (or your custom domain later)
5. Click **Deploy**. Your site will be live at `https://your-project.vercel.app`.

### 3. Custom domain (optional)

1. In the Vercel project: **Settings** → **Domains**.
2. Add your domain and follow the DNS instructions (e.g. CNAME or A record).
3. Set `NEXT_PUBLIC_SITE_URL` to your custom domain and redeploy.

### 4. Updating content after deploy

- Edit files in `src/data/` (and optionally `globals.css` / `tailwind.config.ts`).
- Commit and push to `main`. Vercel will auto-deploy.

## Project structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout, fonts, metadata
│   ├── page.tsx        # Home page (all sections)
│   ├── globals.css     # CSS variables, grain, base styles
│   ├── sitemap.ts      # SEO sitemap
│   └── robots.ts       # robots.txt
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── TechStack.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Badge.tsx
├── data/
│   ├── personal.ts
│   ├── projects.ts
│   ├── experience.ts
│   ├── skills.ts
│   └── socials.ts
└── lib/
    └── utils.ts
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build locally
- `npm run lint` — ESLint

## Performance and accessibility

- **Images:** Next.js `Image` with Unsplash allowed in `next.config.mjs`.
- **SEO:** Metadata and Open Graph in `layout.tsx`, JSON-LD on the page, sitemap and robots.
- **A11y:** Semantic HTML, focus styles, ARIA where needed, keyboard-friendly nav and form.

## License

MIT. Use and modify freely for your own portfolio.
