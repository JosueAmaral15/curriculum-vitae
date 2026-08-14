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
