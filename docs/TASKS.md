# Tasks

## In progress

- [ ] #11 Integrate every surviving non-main branch through `develop`, promote
  the validated result to `main`, and publish both long-lived branches.
  - [x] Fetch and prune remote refs; classify the active content branch, the
    already-contained legacy feature branch, and the three surviving
    Dependabot branches.
  - [x] Record the merge order, lockfile-conflict policy, validation gates and
    publication acceptance criteria in `docs/PLAN.md`.
  - [ ] Commit the reviewed work on `content/selected-projects`, excluding the
    untracked local curriculum PDF.
  - [ ] Merge the content and surviving dependency branches into `develop`,
    resolving the shared lockfile deliberately.
  - [ ] Validate the integrated `develop` tree and promote it to `main`.
  - [ ] Push the content branch, `develop`, and `main`; verify remote hashes and
    inspect publication workflow status without claiming success prematurely.
- [ ] #10 Correct the 3D camera scroll interaction across browser engines.
  - [x] Identify the regression introduced when the natural sticky camera track
    was replaced by full-section GSAP `pin: true`: reverse scrolling re-enters
    a fixed `pin-spacer` interval and can look like a downward jump in Firefox.
  - [x] Confirm the current coverage gap: the normal Playwright matrix checks
    the camera composition only in mobile Firefox and does not exercise
    mouse-wheel direction in desktop Firefox.
  - [x] Preserve the approved composition: all 28 licensed camera parts remain
    centred behind the readable text, with the existing assembly sequence and
    continuous subtle rotation.
  - [x] Replace full-section JavaScript pinning with a native CSS sticky stage
    and scroll-progress calculation that never writes to the document scroll
    position.
  - [x] Apply a browser-independent WebGL render budget: adaptive drawing-buffer
    resolution, bounded frame rate, viewport/document visibility pausing, and
    a static fallback when WebGL 2 cannot be created or its context is lost.
  - [x] Add desktop Firefox to the routine Playwright matrix and add a regression
    that scrolls upward across the complete camera interval, asserting that
    every observed `scrollY` delta remains negative. Retain Chromium, mobile
    Firefox, mobile Chromium and tablet coverage.
  - [x] Validate lint, unit tests, TypeScript, isolated static production build,
    the full browser suite and `git diff --check`.
  - [x] Exercise the installed Mozilla Firefox 155.0.1 on the Dell in an
    isolated graphical profile: 16 native WebDriver wheel steps crossed the
    whole camera interval upward with strictly decreasing `scrollY`, no
    increase, no stalled step and no `.pin-spacer`.
  - [ ] Track WebKit/Safari validation separately until the Playwright WebKit
    runtime is installed; do not describe Safari as verified before that gate.
- [ ] #7 Expand the public professional profile and make motion release-ready for mobile and tablet.
  - Add the professional portrait, the two Google Drive curriculum links, Lattes,
    YouTube, GitHub, LinkedIn, Uiclap, GeoGebra, Instagram, and the portfolio
    URL supplied by the current curriculum PDF.
  - Add the MindSIM Artificial Intelligence Engineer experience in English and
    Portuguese without inventing metrics, clients, patents, or private details.
  - [x] Implement and automate the browser-responsive portion of
    `docs/MOBILE-MOTION-PLAN.md`: capped 3D pixel ratio, shorter touch scroll
    range, touch-size checks, mobile menu language switching, and
    reduced-motion fallback checks.
  - [ ] Record a physical Android-phone and tablet performance check before
    marking this task done. Use `docs/PHYSICAL-DEVICE-RELEASE-CHECK.md` and
    record the result in `docs/TESTING-STATUS.md`.
  - [x] Resolve short Portuguese and tablet clipping with a centred background
    overlay, compact short-height copy and mesh-bound framing.
- [x] #6 Add a licensed, externally sourced scroll-controlled 3D assembly experience.
  - The camera is a CC BY 4.0 asset by ArtOfSylr, with public attribution,
    source and checksums recorded in `docs/assets.md`.
  - The release criteria and implementation evidence are in
    `docs/3D-SCROLL-EXPERIENCE.md`. The sequence moves only existing source
    meshes; no procedural or self-created 3D stand-in is published.
  - [x] Audit the deployed and local camera, including a Firefox reproduction,
    GLB integrity and viewport measurements. Evidence:
    `docs/audits/2026-09-09-camera/README.md`.
  - [x] Verify the corrective implementation on the actual Vercel deployment:
    `docs/audits/2026-09-09-camera/PLANO-DE-ACAO.md`.
    Vercel deployed commit `2086499`; the public Firefox audit passed desktop,
    phone, short Portuguese phone, 680px and tablet cases. Physical performance
    remains under task #7.
  - [x] Restore the intended overlay composition locally: centred camera behind
    readable copy, fixed exploded-state framing, all 28 parts preserved.
  - [x] Commit, publish and re-audit the restored overlay on Vercel. Commit
    `68d56c8` reached production and all 11 Firefox matrix cases passed against
    the public URL with all 28 meshes present.
- [x] #5 Prepare dual static publication for Vercel and GitHub Pages, including social metadata and responsive release checks.
  - Static export, Pages workflow, Vercel headers, social metadata and release checks are recorded in `docs/DEPLOYMENT.md` and `docs/TESTING-STATUS.md`.
- [x] #4 Add a licensed local programming video, English-default Portuguese i18n, and high-end scroll motion.
  - Verified by focused ESLint, `npm run test`, `npm run build`, `npm run test:e2e` and `git diff --check`; details are in `docs/TESTING-STATUS.md`.
- [x] #1 Establish the Next.js, React and TypeScript portfolio foundation.
- [x] #2 Implement the recruiter-focused portfolio UI using the supplied curriculum as the source of truth.
- [x] #3 Add automated validation, security records and deployment/rollback documentation.
  - `npm run lint`, `npm run test`, `npm run build` and `npm run test:e2e` pass locally; evidence is in `docs/TESTING-STATUS.md`.
- [x] #8 Integrate the compatible dependency updates through a work branch,
  `develop`, and `main`, retaining both long-lived branches. `npm audit`
  reports zero vulnerabilities locally; unsupported ESLint 10, TypeScript 7
  and jsdom 30 upgrades were not promoted.
- [x] #9 Add every selected project from the August 2026 English curriculum to
  the bilingual featured-projects section. Public repositories use verified
  destinations; private, conceptual and non-confidential work exposes only the
  description approved by the curriculum.

## Done

- [x] Read the supplied professional curriculum PDF.
- [x] Inspect the complete legacy source and Git history.
- [x] Define the architecture and execution plan in `docs/PLAN.md`.
- [x] Add email, LinkedIn and WhatsApp as primary contact paths, including an accessible floating WhatsApp action.
- [x] Extract the public links from the current three-page professional curriculum PDF and define the public destination set.
- [x] Integrate the licensed camera asset and reduced-motion fallback.
  The restored overlay is validated locally and on Vercel; only physical
  performance remains open under #7.

## Deferred

- [ ] Add case-study pages once project-specific evidence and screenshots are selected.
- [ ] Connect a custom domain after selecting and purchasing one.
