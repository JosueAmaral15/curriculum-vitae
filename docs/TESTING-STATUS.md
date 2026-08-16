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

## Local setup note

The Playwright Chromium browser was installed in the user cache with `npx playwright install chromium`. It is not committed to the repository; CI installs it independently.

The workstation has shown intermittent native-process failures. The checks above were rerun individually; the unit-test runner is intentionally configured with one thread to avoid unnecessary child-process forks for this small suite.

## Remaining external validation

GitHub Actions has not yet reported on this branch. Review its checks after opening or updating the pull request.
