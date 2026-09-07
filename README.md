# Every Proverb

One traditional proverb each UTC day. Same proverb worldwide.

## Local

```bash
npm install
npm run dev
npm test
npm run test:e2e
```

The catalog and daily index live in `lib/`.

## Deploy

```bash
npx wrangler login
npm run deploy
```

Live target is https://every-proverb.carlos-0f0.workers.dev.

See `AGENTS.md` for how agents should work in this repo.
