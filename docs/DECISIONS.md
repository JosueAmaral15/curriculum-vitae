# Decisions

## 2026-10-07 — Fiverr catalog and launch scope

**Decision:** preserve the complete 20-service inventory in documentation, but
publish no more than four coherent launch Gigs until the authenticated account's
actual allowance is known. Treat related services as bounded package scopes,
custom offers or later expansion rather than presenting one vague “full-stack”
Gig.

**Why:** Fiverr currently allows a New freelancer at most four Gigs and locks a
Gig's category after publication. Focused offers make scope, delivery,
revisions, price and buyer requirements understandable while reducing dispute
and schedule risk.

**Compliance boundary:** permitted automation and data work must respect the
target platform's terms and the buyer's authorization. The catalog excludes
private/personal-data harvesting, access-control bypass, fake engagement,
malware, deceptive AI, unsupported guarantees and off-platform payment.

**Publication control:** documentation and saved drafts are reversible. Pressing
**Publish Gig** is a separate external action and requires a final review and
explicit approval after the exact rendered listing is shown.

**Observed exception (2026-10-09):** Fiverr advanced the Python automation Gig
from its gallery workflow directly to `ACTIVE` without showing the separate
`Publish Gig` control seen for the first service. The event is recorded as an
unintended publication; later Gigs must stop at the earliest verified saved
draft state, and any pause, edit or further publication still requires an
explicit account-holder decision.

**Account-holder decision (2026-10-09):** keep the Python automation Gig active.
This accepts its current public state but does not authorize publishing the
three remaining drafts or changing their public visibility.

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

## 2026-08-16 — Licensed reusable 3D assembly experience

**Decision:** the 3D experience must use a licensed externally sourced model
with recognisable separate components. Procedural primitives and self-created
3D stand-ins are rejected for this portfolio.

**Why:** a real camera, processor or comparable mechanical object makes the
scroll interaction credible and more memorable to recruiters. It also gives
the work a traceable source, author and licence rather than implying that a
collection of primitive shapes is an engineered product.

**Constraints:** favour CC0/CC BY assets that permit public redistribution;
record attribution and optimisation; do not use franchise artwork or unverified
marketplace terms; preserve reduced-motion and no-WebGL fallbacks. See
`docs/3D-SCROLL-EXPERIENCE.md`.
