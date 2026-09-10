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
| Deployment | Vercel primary + GitHub Pages mirror | Vercel provides previews and domain controls; Pages proves portable static hosting from the public repository. |
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

## Enhancement phase — Video, i18n and premium motion

### Scope

1. Add a muted, looping local programming-video backdrop to the hero, with an accessible still/gradient fallback.
2. Add client-side English and Portuguese translations. English is the default; the selected language persists only in the browser.
3. Elevate scroll behavior with progressive reveal, section transitions, parallax-like visual layers and a reading-progress indicator. All motion must honor `prefers-reduced-motion`.

### Asset decision

Use only a stock video whose page explicitly permits free reuse and has no visible third-party logo, proprietary code, or identifiable person requiring additional consent. The intended candidate is Pexels' "Focused Shot of Coding" (ID 5473798), described as a free Python-code clip. If its direct download cannot be retrieved or its visible content is unsuitable, keep the same local path and replace it with a user-recorded MP4.

### Validation

- Verify the video is local, muted, looped, `playsInline`, and has a fallback.
- Verify English is rendered initially and the selector changes all displayed portfolio content to Portuguese.
- Run unit tests, browser smoke tests, production build and a reduced-motion inspection.

## Enhancement phase — Professional profile and responsive motion

### Scope

1. Publish the user-supplied professional portrait, with descriptive alternative
   text in English and Portuguese and no generated or altered likeness.
2. Publish the public destinations present in the current curriculum PDF:
   portfolio, GitHub, LinkedIn, Lattes, published books, GeoGebra work, and
   artistic Instagram; add the supplied YouTube channel and English/Portuguese
   Google Drive curricula.
3. Add the MindSIM Artificial Intelligence Engineer experience from March to
   August 2026 in both languages, preserving its remote Brazil context and
   avoiding unverified commercial, patent, or performance claims.
4. Make mobile and tablet motion a release gate, following the detailed action
   plan in `docs/MOBILE-MOTION-PLAN.md`.

### Validation

- Confirm every public destination has the expected URL and opens safely.
- Confirm both curriculum links are available in the hero and resource section.
- Confirm the portrait has meaningful alternative text and remains visible at
  mobile, tablet, and desktop sizes.
- Confirm the MindSIM experience appears in both language modes.
- Execute the viewport and reduced-motion checks in
  `docs/MOBILE-MOTION-PLAN.md` before declaring mobile animation complete.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Personal contact data in a public repository | Keep only the contact details deliberately present in the supplied public CV; no form or telemetry is added. |
| Content drift from the CV | All recruiter-facing claims are represented in one typed content source and tests check critical links and claims. |
| Framework update failure | Lock dependencies with `package-lock.json`; `npm run build` is a required check. |
| Regression after deployment | Vercel creates immutable deployments; revert the offending Git commit and redeploy. |
| Heavy or inaccessible 3D interaction | Keep the 3D assembly optional, client-only, viewport-paused, and reduced-motion safe; retain the CAD/SVG fallback. |

## Validation checkpoints

### Camera audit and corrective phase — 2026-09-09

The audit found a 64% responsive CSS crop on the then-current production
deployment, plus local short-screen overlap and tablet framing defects. The
first corrective implementation used a separate sticky stage and fitted the
camera to every transformed source mesh. A later user-approved scope
correction restored the original overlay composition without restoring any
crop or lateral offset. The isolated production export passed the responsive
Firefox matrix and the cross-browser E2E suite. Follow the evidence in
[the camera audit](audits/2026-09-09-camera/README.md) and its
[corrective action plan](audits/2026-09-09-camera/PLANO-DE-ACAO.md).
Vercel deployed commit `2086499`, and the public-domain audit passed in five
representative Firefox viewports. The remaining checkpoint is the physical
Motorola/tablet test; a successful browser audit cannot establish hardware
performance.

### Camera composition scope correction — 2026-09-09

The user clarified that the original desktop overlay was intentional: the 3D
camera belongs behind the assembly copy and should not receive its own visual
column or increased emphasis. The published correction restores the full-section
background canvas, centres the assembly, keeps all 28 parts, and fixes camera
distance from the exploded state so the assembled object does not zoom toward
the visitor. Short-height typography is compacted only enough to keep the
pinned overlay inside the viewport. Commit `68d56c8` was deployed by Vercel;
the complete 11-case Firefox matrix then passed against the public URL.

### Release branches and dependency maintenance — 2026-09-09

Keep `develop` and `main` as long-lived branches. Integrate a validated work
branch into `develop`, push it, then merge `develop` into production branch
`main`. The September dependency release retained versions supported by the
Next.js toolchain, promoted Next.js 16.3.3 and the compatible GSAP, Three.js,
Vitest and transitive security updates, and produced a zero-vulnerability
local `npm audit` result. ESLint 10, TypeScript 7 and jsdom 30 were excluded
after peer/engine checks and an actual lint failure demonstrated that they were
not compatible with the current toolchain and Node 22 target.

### General checks

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:e2e`
- `git diff --check`
