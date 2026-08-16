# Deployment Guide

The portfolio is a static Next.js export and supports both Vercel and GitHub Pages from the same codebase. Use Vercel as the primary public site and GitHub Pages as an independent static mirror.

## Required repository settings

1. Keep `main` as the reviewed production branch.
2. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the publishing source.
3. Merge a reviewed pull request into `main`. The `Deploy GitHub Pages` workflow publishes the static artifact.

The default Pages address is `https://josueamaral15.github.io/curriculum-vitae/`.

## Vercel (primary site)

1. Create a Vercel project by importing `JosueAmaral15/curriculum-vitae`.
2. Keep the framework preset as Next.js and leave the build command as `npm run build`.
3. Set `main` as the production branch. Feature branches then receive preview URLs.
4. In **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to the final `https://` public domain. Leave `NEXT_PUBLIC_BASE_PATH` empty.
5. Add the final custom domain in Vercel only after its DNS records are ready.

`vercel.json` restores the security response headers for Vercel. GitHub Pages is static hosting and cannot apply application-controlled HTTP headers.

## GitHub Pages (static mirror)

The workflow builds with these values automatically:

```text
NEXT_PUBLIC_BASE_PATH=/curriculum-vitae
NEXT_PUBLIC_SITE_URL=https://josueamaral15.github.io/curriculum-vitae
```

Do not set those values in a repository-tracked `.env` file. The workflow supplies them only for the GitHub Pages build.

## Publication checklist

- Confirm the latest GitHub Actions quality and Pages workflow runs are green.
- Open the Vercel preview URL on a desktop and a real mobile device.
- Test English and Portuguese, email, LinkedIn, WhatsApp, keyboard navigation and reduced-motion behavior.
- Share the preview URL in LinkedIn Post Inspector and WhatsApp after the social-preview image is deployed.
- Verify the custom-domain canonical URL and Open Graph preview after DNS propagation.
- Do not publish a downloadable CV PDF unless the exact file is approved for public distribution.

## Rollback

Revert the production commit, push the revert to `main`, then verify the Vercel and GitHub Pages deployments. See `docs/rollback/ROLLBACK.md`.
