# OWASP Checklist — Static Curriculum Portfolio

Scope: this site is static and contains no authentication, API routes, form submissions, cookies, secrets or databases.

- [x] A01 Broken Access Control — no protected resources or authorization paths exist.
- [x] A02 Cryptographic Failures — no sensitive data is stored or transmitted by application code; HTTPS is supplied by the deployment platform.
- [x] A03 Injection — no user input, database query, shell execution or HTML injection surface is implemented.
- [x] A04 Insecure Design — architecture deliberately excludes unnecessary backend features.
- [x] A05 Security Misconfiguration — environment files and build artifacts are ignored; headers are configured in `next.config.ts`.
- [x] A06 Vulnerable Components — lockfile and automated dependency review are part of the repository workflow.
- [x] A07 Authentication Failures — no authentication is implemented.
- [x] A08 Software and Data Integrity — GitHub Actions validates the project; npm lockfile is committed.
- [x] A09 Security Logging Failures — no security-relevant events are produced; no visitor data is collected.
- [x] A10 SSRF — no server-side URL fetching is implemented.

Before any future contact form, API route, analytics integration or external content is added, reassess this checklist.
