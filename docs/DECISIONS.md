# Decisions

## 2026-08-14 — Academic information

**Decision:** describe the master's degree only as "Mestrado em Computação, foco em IA aplicada à Saúde · não concluído".

**Why:** the degree was not completed. The portfolio must not create an impression of a completed master's degree or attribute it to an institution without verified information.

## 2026-08-14 — Static Next.js portfolio

**Decision:** use Next.js App Router, React and TypeScript for a static personal portfolio.

**Why:** it directly supports the protocol baseline, offers an industry-recognized project structure, static generation, accessible metadata and a low-maintenance Vercel deployment path.

**Rejected alternatives:**

- Keep the legacy HTML/CSS/JavaScript page: it does not demonstrate the current stack or professional engineering practices.
- Add a backend or database: there is no user data or dynamic domain requirement, so it would create unnecessary attack surface and maintenance work.

**Rollback:** `git revert <migration-commit>` restores the previous implementation; see `docs/rollback/ROLLBACK.md`.

## 2026-08-16 — Client-side bilingual content

**Decision:** render English and Brazilian Portuguese from a typed local content module. English is the initial language and an explicit visitor choice is saved in browser local storage.

**Why:** the portfolio remains static, fast and dependency-light while a recruiter can read it immediately in English and a Brazilian visitor can switch context without an external translation service or duplicated pages.

## 2026-08-16 — Hero video and motion

**Decision:** use a local, muted looping Pexels programming clip as a visual hero layer and retain CSS-only visual fallback and reduced-motion support.

**Why:** the moving code adds a relevant professional atmosphere without blocking content, requesting media permissions, or introducing a runtime third-party dependency. Motion remains decorative; `prefers-reduced-motion` hides the video layer and disables nonessential transitions.

## 2026-08-16 — Dual static hosting

**Decision:** export the Next.js application as static files and support both Vercel and GitHub Pages from a single build configuration.

**Why:** Vercel provides the primary experience—preview deployments, custom-domain management and response headers—while GitHub Pages gives a durable public mirror associated with the source repository. A build-time public base path makes the same assets work at a GitHub project-site URL.

**Trade-off:** static export cannot apply Next.js `headers()` or any server-side features. Vercel headers are therefore expressed in `vercel.json`; GitHub Pages serves the static artifact without project-controlled response headers.
