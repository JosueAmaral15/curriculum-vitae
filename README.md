# Josué Amaral — Professional Portfolio

A recruiter-focused portfolio for a Python full-stack developer, DevOps engineer and algorithm researcher. It is built as a static, accessible Next.js application and supports Vercel and GitHub Pages deployment.

## Stack

- Next.js App Router, React and TypeScript
- CSS Modules and global design tokens
- ESLint, Vitest and Playwright
- GitHub Actions quality workflow

## Quick start

Requires Node.js 20.9 or later.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

## Project structure

```text
src/            Next.js routes, reusable components, typed content and unit tests
tests/e2e/      browser smoke tests
docs/           planning, decisions, security and rollback guidance
legacy/         preserved original static implementation
.github/        GitHub Actions quality workflow
```

## Deployment

Use Vercel as the primary site for branch previews, production deployment and custom domains. GitHub Pages is configured as a static mirror through GitHub Actions after it is enabled in repository settings. The build has no server-side credentials.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md), [docs/PLAN.md](docs/PLAN.md), [docs/security/OWASP-checklist.md](docs/security/OWASP-checklist.md) and [docs/rollback/ROLLBACK.md](docs/rollback/ROLLBACK.md) before extending or deploying the project.

## Contact

- [LinkedIn](https://www.linkedin.com/in/josueamaral25/)
- [GitHub](https://github.com/JosueAmaral15)
- [WhatsApp](https://wa.me/5521999526162)
- josueamaral15@gmail.com
