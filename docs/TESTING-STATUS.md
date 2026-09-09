# Testing Status

## 2026-08-15 — Portfolio baseline

| Check | Result | Evidence |
| --- | --- | --- |
| Lint | Passed | `npm run lint` completed without findings. |
| Unit tests | Passed | `npm run test`: 1 file, 2 tests passed. |
| Production build | Passed | `npm run build` compiled successfully, type-checked and generated `.next/BUILD_ID`. |
| Browser smoke test | Passed | `npm run test:e2e`: 1 Chromium test passed. |
| Whitespace | Passed | `git diff --check` produced no errors. |

## 2026-08-16 — Video, i18n and motion enhancement

| Check | Result | Evidence |
| --- | --- | --- |
| Lint | Passed | Focused ESLint on the changed TypeScript and E2E files completed without findings. |
| Unit tests | Passed | `npm run test`: 2 files, 3 tests passed, including bilingual-content parity. |
| Production build | Passed | `npm run build` compiled, type-checked and statically generated the site. |
| Browser smoke test | Passed | `npm run test:e2e`: English-default, Portuguese switch and reduced-motion behavior passed in Chromium. |
| Whitespace | Passed | `git diff --check` produced no errors. |

Playwright now serves the current production build on port 3001 for E2E checks. This avoids reusing a developer's `next dev` instance on port 3000.

## 2026-08-16 — Dual static-hosting release preparation

| Check | Result | Evidence |
| --- | --- | --- |
| Focused lint | Passed | ESLint completed without findings for the changed Next.js, metadata and Playwright TypeScript files. |
| TypeScript | Passed | `npx tsc --noEmit` completed successfully. |
| Static export | Passed | `npm run build` created the static `out/` directory. |
| GitHub Pages build | Passed | Build with `NEXT_PUBLIC_BASE_PATH=/curriculum-vitae` completed and emitted the correct canonical social-image URL. |
| Unit and browser tests | Passed | `npm run test` passed 3 tests; `npm run test:e2e` passed the English/Portuguese and reduced-motion browser checks. |
| Whitespace | Passed | `git diff --check` produced no errors. |

The broad `npm run lint` command can intermittently stall on this workstation without emitting a code diagnostic. Focused ESLint and the full TypeScript, static-build and browser checks above provide the recorded release evidence.

## Local setup note

The Playwright Chromium browser was installed in the user cache with `npx playwright install chromium`. It is not committed to the repository; CI installs it independently.

The workstation has shown intermittent native-process failures. The checks above were rerun individually; the unit-test runner is intentionally configured with one thread to avoid unnecessary child-process forks for this small suite.

## 2026-08-16 — Licensed camera assembly integration

| Check | Result | Evidence |
| --- | --- | --- |
| Source and licence | Passed | The downloaded GLB embeds the ArtOfSylr source and CC BY 4.0 attribution; model inventory found 28 meshes and about 39,500 triangles. |
| Unit tests | Passed | `npm run test`: 2 files, 4 tests passed. |
| TypeScript | Passed | `node --max-old-space-size=4096 ./node_modules/typescript/bin/tsc --noEmit --pretty false` completed without diagnostics. |
| Vercel-style static build | Passed | Isolated `next build` compiled, type-checked and exported the portfolio. |
| GitHub Pages-path build | Passed | The same build with `NEXT_PUBLIC_BASE_PATH=/curriculum-vitae` emitted `out/models/axis-q6010-e-surveillance-camera.glb`. |
| Browser smoke check | Passed | A headless Chromium session loaded the static export, loaded the GLB and rendered the exploded/assembled states with no page or console errors. |
| Whitespace | Passed | `git diff --check` completed without errors. |

On this workstation the standalone TypeScript process and Next build require a
4 GiB Node old-space limit when the Three.js declarations are loaded. Isolated
build directories avoid interfering with the active `next dev` process. This is
a local validation constraint, not a published application setting.

## Remaining external validation

GitHub Actions has not yet reported on this branch. Review its checks after opening or updating the pull request.

## 2026-08-17 — Professional resources and MindSIM profile update

| Check | Result | Evidence |
| --- | --- | --- |
| Unit tests | Passed | `npm run test`: 2 files, 4 tests passed, including bilingual MindSIM and curriculum-label assertions. |
| TypeScript | Passed | `node --max-old-space-size=4096 ./node_modules/typescript/bin/tsc --noEmit --pretty false` completed without diagnostics. |
| Static export | Passed after one retry | An isolated Webpack export compiled, type-checked and statically generated the updated portfolio. The first attempt ended in the workstation's intermittent native `Segmentation fault`; the immediate isolated retry passed. |
| Browser test | Passed | `PLAYWRIGHT_OUTPUT_DIR=.next-validation-profile-retry npm run test:e2e` passed both Chromium tests against the current isolated export. |
| Responsive content smoke | Passed | Headless Chromium at 390×844 and 768×1024 found the portrait, both resume actions and the professional-resources section with no page or console errors. |
| Whitespace | Passed | `git diff --check` completed without errors. |

The mobile and tablet **motion** work remains open: the acceptance criteria and
performance checks are in `docs/MOBILE-MOTION-PLAN.md`. The viewport smoke
check above confirms only the newly added content layout, not a complete
physical-device animation release.

## 2026-09-08 — Responsive motion browser baseline

| Check | Result | Evidence |
| --- | --- | --- |
| Unit tests | Passed | `npm run test`: 2 files and 4 tests passed. |
| TypeScript | Passed | `node --max-old-space-size=4096 ./node_modules/typescript/bin/tsc --noEmit --pretty false` completed without diagnostics. |
| Static export | Passed | Isolated Webpack static export completed with `NEXT_DIST_DIR=.next-validation-responsive`. |
| Desktop, phone and tablet E2E | Passed | `PLAYWRIGHT_OUTPUT_DIR=.next-validation-responsive npm run test:e2e`: 11 Chromium checks passed and 1 desktop-only touch test was intentionally skipped. |
| Responsive behavior | Passed in browser emulation | iPhone 13 and iPad Pro 11 Chromium profiles verified the collapsed language menu, 44-pixel public-link actions, portrait, MindSIM content, and reduced-motion camera fallback. |
| Phone visual review | Passed | A 390×844 Chromium screenshot of the hero, assembly section, and professional resources confirmed that the camera canvas stays below readable assembly copy. |
| Whitespace | Passed | `git diff --check` completed without errors. |

The remaining physical-device check is tracked as task #7. Browser emulation
does not establish battery, GPU, thermal, or frame-rate behavior on actual
Android and tablet hardware.

## 2026-09-09 — Camera audit (not a corrected release)

- Production was fetched in fresh Firefox sessions at the Vercel default
  domain. The narrow layout applies `clip-path: inset(64% 0 0)` at 390px and
  680px; actual mesh vertices also leave the right side of the view. The same
  CSS crop was absent at 1440px in this run.
- Local and production GLBs have the same recorded SHA-256 and 28 meshes.
- A snapshot of the dirty local source was exported with Webpack in an isolated
  temporary directory; the build exited successfully without reusing the active
  development build. The application files were not modified for the audit.
- Firefox 153.0 (Playwright/Linux) completed desktop, phone, short Portuguese
  phone, 680px and tablet captures at four scroll positions. At 390×844 all
  vertices were inside the local canvas in the sampled frames; at 834×1194
  some parts still left the frame. The short Portuguese layout overlaps copy.
- Chromium completed the local phone, short-phone and 680px series. Desktop
  and tablet screenshot timeouts in the initial run are recorded as incomplete,
  not passed. These are diagnostic samples, not a full rotation sweep.
  The desktop retry completed four captures and found vertices of
  `housing003_9` outside the canvas at two sampled angles; tablet Chromium
  remains incomplete in this audit.
- Physical Firefox Android on the user's Motorola G17 was not controlled by
  this session. The user's production observations on Motorola and Dell are
  recorded separately from automated evidence.
- Earlier browser checks (11 passed, 1 skipped in a 12-case suite) tested
  headings, links and reduced motion. They did not assert all pieces in frame;
  earlier completion claims for the camera were too broad.

Evidence, screenshots, reproduction commands and the action plan:
[Camera audit — 2026-09-09](audits/2026-09-09-camera/README.md).

## 2026-09-09 — Corrective implementation validation

- The responsive `clip-path` was removed. Copy and camera now occupy separate
  layout areas, with a sticky camera stage that remains inside the viewport.
- Camera distance is calculated from a pivot-centred sphere containing every
  transformed mesh bound. The frame expands immediately while pieces separate
  and approaches the smaller assembled frame smoothly.
- The actual GLB integrity test confirmed its recorded SHA-256, 28 meshes and
  projected more than one million vertices across six aspect ratios and 16
  rotation angles. Unit result: 3 files and 5 tests passed.
- An isolated Next.js production export completed successfully with Webpack.
- Firefox 153 completed 11 viewport cases, four assembly phases per case and a
  16-angle sweep per phase. All cases passed with 28 meshes, no projected
  vertex outside the camera, `clip-path: none`, no copy/canvas overlap and no
  canvas edge outside the viewport.
- Playwright ran desktop Chromium, mobile Chromium, mobile Firefox and tablet
  Chromium against that export: 16 passed and 4 project-specific checks were
  skipped. The dedicated narrow-Firefox crop/overlap regression passed.
- `npm run lint`, `npx tsc --noEmit` and `git diff --check` passed. ESLint now
  ignores interrupted dependency/build directories so generated vendor code is
  not treated as application source.
- These results validate the source and exported artifact. The corrected Vercel
  deployment and physical Motorola G17/tablet remain separate release checks.

## 2026-09-09 — Public Vercel verification

- Commit `2086499f296c67e2db7296c033d292e4a00b4303` was pushed to `main`; Vercel
  reported the production deployment successful at
  <https://curriculum-vitae-virid.vercel.app/>.
- The Firefox vertex audit was then executed against that public URL in five
  representative cases: 1440×900 desktop, 390×844 phone, 390×650 Portuguese,
  680×900 breakpoint and 834×1194 tablet.
- All 20 sampled phases passed: 28 meshes, no projected vertex outside the
  view, no CSS clip, no copy/canvas overlap, canvas fully inside the viewport,
  no WebGL context loss and no runtime error. Each phase also passed its
  16-angle rotation sweep.
- Visual review of the public 390×844 assembled capture confirmed the complete
  camera centred in its dedicated stage.
- GitHub's Quality, Pages and CodeQL jobs did not execute any steps. Their API
  annotations state: `The job was not started because your account is locked
  due to a billing issue.` This is an account-level publication blocker, not a
  failure produced by the repository build or tests. GitHub Pages therefore
  remains unavailable until the account restriction is resolved and the runs
  are retried.
- The real Motorola G17 Android and tablet performance check remains open under
  task #7 and `docs/PHYSICAL-DEVICE-RELEASE-CHECK.md`.

## 2026-09-09 — Overlay composition scope correction (local)

- The user clarified that the original desktop composition was correct: the
  camera should remain a restrained background behind the copy. Moving it into
  a separate visual area and dynamically zooming the assembled state were
  outside the requested scope.
- The local revision restores a full-section absolute canvas with the copy on
  the higher layer, centres the assembly without removing any mesh, and keeps
  one camera distance calculated from the largest exploded state.
- The audit now distinguishes an intentional overlay from an accidental
  collision. It requires the copy layer above the canvas and checks projected
  vertices against both the WebGL frame and the visible browser viewport.
- An isolated Next.js Webpack export passed. The full Firefox matrix passed 11
  viewports, four scroll phases and 16 rotation angles per phase with all 28
  meshes present and no projected vertex outside the visible screen.
- The responsive E2E suite passed 16 checks with 4 intentional project skips.
  The dedicated Firefox test confirmed the camera behind the copy, no CSS crop
  and the copy's stacking order above the canvas.
- Visual checks covered desktop, 390×844 phone, 390×650 Portuguese, 320×650 and
  844×390 Portuguese landscape. Short-height spacing prevents the pinned
  section from growing beyond the viewport.
- This follow-up is not yet committed or deployed. The Vercel result documented
  above belongs to the preceding composition.
