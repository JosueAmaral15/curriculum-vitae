# Tasks

## In progress

- [ ] #13 Prepare and publish a truthful, fixed-scope Fiverr service catalog.
  - [x] Record all 20 proposed software services, pricing ranges and delivery
    targets in `docs/FIVERR-SERVICES.md`.
  - [x] Review current official Fiverr Gig limits, required fields, earnings,
    media rules and prohibited-service boundaries.
  - [x] Consolidate the launch into four coherent Gigs for a possible New
    freelancer limit, while preserving the remaining offers as packages,
    custom offers or future expansion Gigs.
  - [x] Inspect the authenticated Fiverr account and record that it is a New
    seller profile with a four-Gig launch plan and one active public service as
    of 2026-10-09.
  - [x] Complete the Fiverr human-verification challenges encountered while
    creating the four launch services; every challenge was completed by the
    account holder.
  - [x] Confirm live category paths and category-specific pricing fields before
    copying any draft into Fiverr.
  - [x] Create and review one original 1280 × 769 gallery image for each launch
    Gig, without contact data, unlicensed logos or misleading badges.
  - [x] Enter the approved text and packages in Fiverr, then compare the
    rendered drafts with the Markdown source.
    - [x] Create the Python backend repair service with its three packages,
      description, three FAQs, five required buyer questions and original
      gallery image. On 2026-10-09 Fiverr displayed the final `Publish Gig`
      action; it has not been pressed.
    - [x] Create the Python automation service with the documented packages,
      description, FAQs, buyer questions and gallery image. Fiverr unexpectedly
      changed it to `ACTIVE` when the gallery workflow advanced; it is public at
      `https://www.fiverr.com/s/NeeEjrV`. The account holder explicitly chose
      to keep this Gig active on 2026-10-09.
    - [x] Create the API, webhook and AI integration service with its three
      packages, description, two FAQs, five buyer questions and original gallery
      image. It is saved as a draft at the final `Publish Gig` step; that action
      has not been pressed.
    - [x] Create the Docker, Git and deployment repair service with three
      packages, live DevOps metadata, description, two FAQs, five buyer
      questions and original gallery image. It is saved as a draft at the final
      `Publish Gig` step; that action has not been pressed.
  - [ ] Obtain explicit approval immediately before each public Gig submission;
    record submitted, review and public states separately.
  - [x] Validate the documentation diff, commit through `develop`, promote it
    to `main`, push both long-lived branches and verify the remote hashes.
- [x] #12 Present Vita Ethos as a responsible long-term entrepreneurial
  direction in the public portfolio.
  - [x] Add a dedicated English/Portuguese section after selected projects,
    without changing the external CNPq Lattes curriculum.
  - [x] Describe the initiative as being in concept development and validation;
    do not present forecasts, customers, funding, medical diagnoses, or future
    impact as achieved results.
  - [x] Preserve health professionals at the centre of care and require a
    focused MVP plus real-world evidence before public impact claims.
  - [x] Validate the content with lint, unit tests, a static production build,
    cross-browser smoke coverage, mobile Firefox rerun, and visual inspection.
- [x] #11 Integrate every surviving non-main branch through `develop`, promote
  the validated result to `main`, and publish both long-lived branches.
  - [x] Fetch and prune remote refs; classify the active content branch, the
    already-contained legacy feature branch, and the three surviving
    Dependabot branches.
  - [x] Record the merge order, lockfile-conflict policy, validation gates and
    publication acceptance criteria in `docs/PLAN.md`.
  - [x] Commit the reviewed work on `content/selected-projects`, excluding the
    untracked local curriculum PDF.
  - [x] Merge the content and surviving dependency branches into `develop`,
    resolving the shared lockfile deliberately.
  - [x] Validate the integrated `develop` tree with clean install, lint, unit,
    production build, complete browser matrix, audit and whitespace checks.
  - [x] Promote the validated `develop` tree to `main`.
  - [x] Push the content branch, `develop`, and `main`; verify remote hashes and
    inspect publication workflow status without claiming success prematurely.
    Vercel deployed the `main` commit successfully. GitHub Actions did not
    start Quality, CodeQL or Pages because GitHub reports an account billing
    lock; this external Pages blocker is documented in `docs/TESTING-STATUS.md`.
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

- [x] Add the bilingual Vita Ethos entrepreneurial-vision section without
  exposing financial projections or presenting the concept as a validated
  operating company.
- [x] Read the supplied professional curriculum PDF.
- [x] Inspect the complete legacy source and Git history.
- [x] Define the architecture and execution plan in `docs/PLAN.md`.
- [x] Add email, LinkedIn and WhatsApp as primary contact paths, including an accessible floating WhatsApp action.
- [x] Extract the public links from the current three-page professional curriculum PDF and define the public destination set.
- [x] Integrate the licensed camera asset and reduced-motion fallback.
  The restored overlay is validated locally and on Vercel; only physical
  performance remains open under #7.

## Deferred

- [ ] Add expansion Fiverr Gigs for React/Next.js repair, compliant public-data
  extraction, code review, small dashboards and MVP discovery when the account
  allowance and completed-order evidence justify them.
- [ ] Add case-study pages once project-specific evidence and screenshots are selected.
- [ ] Connect a custom domain after selecting and purchasing one.
