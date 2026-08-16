# Rollback

## Application regression

1. Identify the deployment and its matching Git commit.
2. Revert without rewriting history: `git revert <commit-sha>`.
3. Run `npm ci && npm run lint && npm run test && npm run build`.
4. Push the revert branch and verify the deployment preview before merging.

## Emergency fallback

The legacy implementation is retained in `legacy/`. If a full restoration is required, restore it in a dedicated branch rather than deleting the Next.js history.

## Recovery target

For a static site, a tested Git revert and Vercel redeploy should be practical in under one minute once the commit is identified.
