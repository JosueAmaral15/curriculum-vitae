# Execution Plan: Professional Curriculum Portfolio

## TL;DR

- Replace the legacy static page with a production-oriented Next.js, React and TypeScript portfolio.
- Keep the site intentionally static: a recruiter does not need a database, authentication, or analytics tracker to evaluate this profile.
- Validate locally with linting, unit tests, a production build and a browser smoke test; GitHub Actions repeats those checks.
- Roll back with `git revert <commit>`; deployment is immutable on Vercel.

## Context

The repository currently contains a 2022-style static HTML/CSS/JavaScript curriculum. It has no package manifest, documentation, tests, CI, security guidance, or deployment instructions. The authoritative professional source is the supplied three-page curriculum PDF.

## Decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Framework | Next.js App Router + React + TypeScript | The Simplicidade 3 web baseline recommends Next.js, React and TypeScript; the current official Next.js documentation recommends App Router. |
| Styling | CSS Modules + global design tokens | Keeps the visual system explicit, component-scoped and dependency-light. |
| Deployment | Vercel | Static portfolio hosting with preview deployments and no server maintenance. |
| Quality | ESLint, Vitest, Playwright, GitHub Actions | Covers source quality, content logic, production build and browser behavior. |
| Data | Typed local content modules | A personal portfolio has stable content and does not justify a database or user-data collection. |
| Legacy files | Preserve under `legacy/` | Keeps the original implementation available for reference without mixing it with the application. |

## Scope

### In scope

1. Modern, accessible bilingual-ready single-page portfolio focused on full-stack and DevOps work.
2. Typed content for professional summary, experience, capabilities, projects, education and links.
3. Responsive navigation, downloadable CV link, honest claims taken from the supplied PDF.
4. Professional repository structure, documentation, security/rollback records, tests and CI.

### Explicitly out of scope

- Backend, user accounts, contact-form collection, database, Docker/Kubernetes, or analytics tracking.
- Publishing or deploying to an external service without separate authorization.
- Inventing project metrics, client logos, testimonials, certificates or skills not in the curriculum.

## Implementation sequence

1. Create the Next.js foundation, configuration and professional repository documents.
2. Build reusable portfolio sections and a responsive visual system using the approved curriculum data.
3. Add unit/browser checks and GitHub Actions; complete security and rollback evidence.
4. Run local validation and inspect the actual rendered site before handoff.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Personal contact data in a public repository | Keep only the contact details deliberately present in the supplied public CV; no form or telemetry is added. |
| Content drift from the CV | All recruiter-facing claims are represented in one typed content source and tests check critical links and claims. |
| Framework update failure | Lock dependencies with `package-lock.json`; `npm run build` is a required check. |
| Regression after deployment | Vercel creates immutable deployments; revert the offending Git commit and redeploy. |

## Validation checkpoints

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:e2e`
- `git diff --check`
