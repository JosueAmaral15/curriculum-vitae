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
