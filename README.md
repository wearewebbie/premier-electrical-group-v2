# Template Project

This project uses [Eleventy](https://www.11ty.dev/) as a static site generator, [Tailwind CSS](https://tailwindcss.com/) for styling, and is hosted on [Cloudflare Pages](https://pages.cloudflare.com/) with automatic deployment via GitHub.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [HandBrake](https://handbrake.fr/) for video optimisation (manual step — see below)

## Installation

```
npm install
```

## Build Scripts

### Local Development

```
npm start
```

Starts a local dev server with live reload. Watches for CSS changes and recompiles automatically. Outputs to `dist`.

### Production Build

```
npm run build
```

Builds the site for deployment. Minifies CSS and generates optimised images. Outputs to `dist`. This is the command Cloudflare Pages runs automatically on every push to `main`.

### Lint

```
npm run lint
```

Validates all HTML in the `dist` folder. Must be run after `npm run build`. Use `npm run build:check` to run both in sequence.

```
npm run build:check
```

Runs the full production build followed by HTML validation in one command.

---

## Images

Place source images in `src/assets/images/` as jpg, png, or webp. During build, `@11ty/eleventy-img` automatically generates multiple sizes (400w, 800w, 1200w) and formats (avif, webp, jpeg) — no manual resizing needed. Always supply the largest version of an image you have.

### Usage

Use the image shortcode instead of a standard `<img>` tag:

```
{% image "src/assets/images/your-image.jpg", "Alt text", "your-tailwind-classes" %}
```

Custom sizes can be passed as a fourth argument if needed:

```
{% image "src/assets/images/hero.jpg", "Hero", "w-full", { widths: [800, 1200, 1920] } %}
```

---

## Videos

Video optimisation is handled manually before adding videos to the project.

1. Receive raw video from client
2. Open in HandBrake
3. Tick **Web Optimised** in the output settings — this ensures the video plays in the browser before fully downloading
4. Export and add the optimised file directly to your project
5. Commit as normal

Raw video files should not be committed to the repository. Store originals in a shared folder (Google Drive, Dropbox etc.) for future reference.

---

## Getting Started Checklist

Before starting a new project, fill in the following placeholders:

### Business information

Inside `src/_data/site.js` fill in the business details. This feeds into SEO, contact pages, footers, and schema markup across the site:

```js
export default {
  title: "Client Name",
  description: "Website description",
  url: "https://clientdomain.com",   // production domain
  email: "info@clientdomain.com",
  phone: "+44 000 000 000",
  ...
}
```

Available as `{{ site.title }}`, `{{ site.email }}`, `{{ site.phone }}` etc. in all templates.

> The `image` key should be the relative path to the social preview image (1200 x 675 pixels). This appears when people share the website URL.

### Environment URLs

The site URL is set automatically based on the Cloudflare Pages environment — no manual changes needed per environment:

- Local development → `http://localhost:8080`
- Preview deployments (dev branch) → Cloudflare preview URL (set automatically via `CF_PAGES_URL`)
- Production (main branch) → your production domain from `site.js`

### Sitemap

A sitemap is automatically generated at `/sitemap.xml` on every build. No manual steps required. Make sure the production URL in `site.js` is correct before merging to `main`.

---

## Deployment

Deployment is handled automatically by Cloudflare Pages via GitHub. There is no manual deploy step.

### Branching strategy

| Branch | Purpose | URL |
|--------|---------|-----|
| `dev` | Day to day development | Cloudflare preview URL |
| `main` | Production | Live client domain |

### Workflow

1. Do all work on the `dev` branch and push freely
2. Cloudflare automatically builds and updates the preview URL on every push
3. When ready to go live, open a pull request on GitHub and merge `dev` into `main`
4. Cloudflare automatically deploys to the production domain

> Direct pushes to `main` are blocked via branch protection rules. All changes must go through a pull request.

### Connecting a new project to Cloudflare Pages

1. Create a new project in the Cloudflare Pages dashboard
2. Connect to GitHub and select the repository
3. Set the build command to `npm run build`
4. Set the build output directory to `dist`
5. Set the production branch to `main`
6. Add your custom domain in Cloudflare Pages settings
7. Update the `A` record or `CNAME` in your domain registrar's DNS settings to point to Cloudflare — leave `MX` records untouched to preserve email

---

##

> And as always, have a Webbie good time coding...