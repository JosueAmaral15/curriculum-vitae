# Josué Amaral — Professional Portfolio

A recruiter-focused portfolio for a Python full-stack developer, DevOps engineer and algorithm researcher. It is built as a static, accessible Next.js application and is designed for deployment on Vercel.

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

Import the GitHub repository in Vercel. The platform detects Next.js and runs the production build. Do not add secrets: the application has no server-side credentials or environment variables.

See [docs/PLAN.md](docs/PLAN.md), [docs/security/OWASP-checklist.md](docs/security/OWASP-checklist.md) and [docs/rollback/ROLLBACK.md](docs/rollback/ROLLBACK.md) before extending or deploying the project.

## Contact

- [LinkedIn](https://www.linkedin.com/in/josueamaral25/)
- [GitHub](https://github.com/JosueAmaral15)
- [WhatsApp](https://wa.me/5521999526162)
- josueamaral15@gmail.com
