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

## Cross-browser camera-scroll correction session — 2026-09-10

### Problem statement

The full-section camera overlay currently uses GSAP `pin: true` for a
1,100–1,600-pixel scroll interval. Re-entering that interval while scrolling
upward makes GSAP switch the section back into a fixed pin state while the
one-second scrub reverses the assembly. Firefox's asynchronous compositor can
make that transition look like the page moved in the opposite direction. The
same revision also enlarged the continuously rendered WebGL canvas from a
contained stage to the whole viewport, increasing the cost of the transition
on older GPUs.

### Constraints

1. Keep the camera centred behind the text; do not restore a separate camera
   column or give the asset more visual emphasis.
2. Preserve all 28 source meshes, attribution, exploded/assembled states and
   the subtle idle rotation.
3. Do not intercept wheel/touch input, call `preventDefault()`, or programmatically
   correct `scrollY`. Browser-native scrolling remains the source of truth.
4. Preserve reduced-motion and no-WebGL fallbacks.
5. Do not mix or discard the existing selected-project, translation or PDF
   work already present in the working tree.

### Execution sequence

1. **Stabilize layout:** make the section provide the scroll distance and keep
   one full-viewport child in place with native CSS `position: sticky`.
2. **Decouple animation:** calculate a normalized assembly target from the
   section's native geometry. Interpolate only the Three.js state; never pin or
   move the document from JavaScript.
3. **Bound rendering cost:** choose drawing-buffer scale from a pixel budget,
   cap rendering frequency, and pause outside the viewport or while the page is
   hidden. Preserve the static gradient fallback on failure/context loss.
4. **Extend regression coverage:** add desktop Firefox and verify upward wheel
   monotonicity across the section in both desktop engines. Keep the existing
   narrow-Firefox composition assertion.
5. **Validate and review:** run focused checks first, then the complete build
   and browser matrix. Record results in `docs/TESTING-STATUS.md`; keep the
   physical mobile/tablet and WebKit/Safari gates explicit.

### Acceptance criteria

- Upward wheel input produces only decreasing `scrollY` samples before,
  during and after the camera section in desktop Chromium and Firefox.
- The sticky stage occupies one viewport without a GSAP `.pin-spacer`.
- The camera remains behind the copy and every source mesh remains available at
  desktop, mobile, short-height and tablet representative viewports.
- Reduced-motion and WebGL failure modes expose readable static content without
  adding an artificial scroll interval.
- Automated success is reported separately from physical-device and Safari
  validation; neither is inferred from Playwright emulation.

### Implementation result

The implementation now uses a full-viewport sticky child inside the natural
scroll-height section. A passive scroll listener reads geometry once per
animation frame and updates only the Three.js target; it never intercepts wheel
input or writes the document position. GSAP was removed because it no longer
has another consumer in the application.

The WebGL path exposes the scene only after one deterministic warm-up frame.
Chromium-class hardware rendering is bounded to 30 frames per second and 1.2
million drawing-buffer pixels; Firefox uses a lighter material path, a
450,000-pixel budget and a 12-frame-per-second baseline. Software rendering
uses a deliberately low-cost cadence and 150,000-pixel budget. Firefox and
software intervals also adapt to measured draw cost. Rendering pauses outside
the viewport or while the document is hidden, and context loss returns the
section to its static fallback.

The isolated Webpack export and the five-project Playwright matrix passed. The
new desktop Chromium/Firefox regression crossed the entire section upward with
12 strictly negative scroll deltas and confirmed that no `.pin-spacer` exists.
The installed graphical Firefox 155.0.1 then crossed the complete interval in
16 upward wheel steps from `scrollY=4094` to `1214`; all steps decreased by 180
pixels, none stalled or reversed, and the final position was above the camera
section. Physical mobile/tablet and WebKit/Safari remain distinct release
gates.

## Branch-integration and publication plan — 2026-09-10

### Objective

Preserve `develop` and `main` as the long-lived integration and production
branches, incorporate every surviving non-main branch into `develop`, validate
the resulting tree, and then promote that exact validated tree to `main` and
the remote repository.

### Audited branch set

- `content/selected-projects`: active local work containing the selected-project
  catalogue follow-up, layout alignment and cross-browser camera correction.
- `origin/feature/curriculum-react-340fe9d9-74e5-47b5-9d84-99ffcb7c79c3`:
  already an ancestor of `develop`; no new merge commit is required.
- `origin/dependabot/npm_and_yarn/eslint-10.8.1`,
  `origin/dependabot/npm_and_yarn/jsdom-30.0.1`, and
  `origin/dependabot/npm_and_yarn/typescript-7.0.2`: surviving dependency
  branches that share an older release base and modify the same lockfile.
- Eight obsolete Dependabot refs were already deleted upstream and disappeared
  through `git fetch --prune`; deleted remote refs are not merge targets.

### Execution and conflict policy

1. Commit the reviewed site, test and documentation changes on
   `content/selected-projects`. Keep the untracked local curriculum PDF out of
   Git because reading a source document did not authorize publishing that
   binary.
2. Merge the active content branch into `develop`, then merge each surviving
   remote dependency branch with explicit merge commits. The already-contained
   feature branch is recorded as satisfied by ancestry.
3. Resolve package-manifest and lockfile conflicts by combining the requested
   dependency updates, regenerating the lockfile with the repository's npm
   version, and validating the actual resolved dependency tree. If a proposed
   major version is incompatible, retain the merge ancestry but add a reviewed
   compatibility correction rather than leaving `develop` broken.
4. Run clean dependency installation, lint, unit tests, TypeScript/build,
   static-export E2E coverage, dependency audit and whitespace checks on the
   integrated `develop` tree.
5. Merge validated `develop` into `main`, verify the production commit and push
   the active content branch, `develop`, and `main`. Never force-push.
6. Confirm remote hashes and inspect the publication workflows when GitHub CLI
   access is available. Production is not claimed until the remote workflow or
   deployment reports success.

### Acceptance criteria

- Every surviving non-main branch is either an ancestor of `develop` or has an
  explicit merge commit in `develop`.
- `develop` and `main` resolve to the same tested content after promotion.
- `npm ci`, lint, unit tests, production build, the browser matrix, dependency
  audit and `git diff --check` pass on the integrated dependency set.
- The local-only PDF remains untracked, and no force-push or branch deletion is
  performed.

### Develop integration result

The content branch entered `develop` through merge `47e6239`. The surviving
ESLint, jsdom and TypeScript Dependabot heads entered through `ff3a39d`,
`ac60b40` and `709b1ca`; the legacy feature branch was already an ancestor.
This makes every surviving non-main ref an ancestor of `develop`.

The merged update proposals exposed three upstream compatibility constraints:
ESLint 10 is outside the peer ranges used by `eslint-config-next@16.3.3`, jsdom
30 requires a newer Node 22 patch than the current environment, and the
TypeScript ESLint stack requires TypeScript below 6.1. Commit `18b59b7` retains
the branch ancestry while restoring the validated ESLint 9.39.5, jsdom 29.0.1
and TypeScript 6.0.3 toolchain and regenerating the npm 11 lockfile.

The integrated `develop` tree passed `npm ci`, lint, 5 unit tests, the isolated
Webpack static export including TypeScript, the complete five-project browser
matrix (22 passed and 13 intentional skips), the dependency audit with zero
vulnerabilities, and `git diff --check`. It is eligible for promotion to
`main`; remote publication remains the final step.
