# Prathibha Vidyalayam — Website

Repository: https://github.com/admin-sredsol/pbv-website

This repository contains the public website for Prathibha Vidyalayam, built with Astro and Tailwind-style utilities. It includes pages for Academics, Admissions, Gallery, and other school information plus components and data used across the site.

Quick notes
- Astro version and a native image processor (sharp) are used in this project.
- The preferred package manager for this repo is pnpm (see package.json).
- If you see image-processing errors during build, ensure `sharp` is installed: `pnpm add sharp`.

Project structure (top-level)
```text
/
├── public/                # Static files served as-is (images, robots.txt, etc)
├── src/
│   ├── assets             # Images, SVGs and other static assets referenced by src
│   ├── components         # Reusable UI components (Header, Footer, sections)
│   ├── layouts            # Layout components (BaseLayout, etc)
│   ├── pages              # Site pages (index.astro, /academics/*, etc)
│   └── data               # Local JSON/TS data used by pages/components
├── package.json
└── README.md
```

Getting started (local development)
1. Install dependencies:
```sh
pnpm install
```

2. Start the dev server:
```sh
pnpm dev
# opens http://localhost:4321 by default
```

3. Build for production:
```sh
pnpm build
```

4. Preview the production build locally:
```sh
pnpm preview
```

Helpful scripts (from package.json)
- `pnpm dev` — run a local dev server
- `pnpm build` — build a production site into `./dist`
- `pnpm preview` — preview a built site
- `pnpm astro -- --help` — run Astro CLI commands

Repository metadata / package.json
- If you want the project metadata in `package.json` (useful for package tools or CI), add a `repository` entry and optional `homepage`. Example snippet to add to `package.json`:
```json
"repository": {
  "type": "git",
  "url": "https://github.com/admin-sredsol/pbv-website"
},
"homepage": "https://your-production-url.example.com"
```
(You can edit `package.json` manually or use `npm pkg set repository.url=https://github.com/admin-sredsol/pbv-website`.)

Notes & best practices
- Assets: Replace placeholder Unsplash images with optimized images stored in `src/assets/images/` and consider using `astro:assets` Image for responsive images (Sharp required for raster optimizations).
- Accessibility: Header/menu components attempt to support keyboard navigation; if you add deeper nested menus, ensure aria attributes and keyboard controls are handled.
- Data: Many pages consume local data from `src/data/*`. Keep canonical content there when multiple pages depend on the same links/text.

Contributing
- Fork the repo, create a feature branch, make your changes, run `pnpm dev` locally and open a PR.
- If you add new dependencies that require native builds (like `sharp`), document platform notes for contributors (macOS M1/arm, Linux build tools).

Where to next
If you want, I can:
- Add `repository` metadata to `package.json` for you,
- Replace placeholder images with optimized local assets and switch them to `astro:assets` Image,
- Add a short CONTRIBUTING.md or a CODE_OF_CONDUCT.md.

