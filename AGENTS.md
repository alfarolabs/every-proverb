# Every Proverb

One proverb each UTC day. Domain `every-proverb.carlos-0f0.workers.dev` until a custom domain exists.

## How to work in this repo

Start every non-trivial task with `/poteto-mode`.

Proof is the real app. Playwright and the browser, not "it compiles."

If the vinext overlay says `Cannot read properties of null (reading 'useContext')` in `GlobalErrorBoundary`, the browser mixed two Vite React prebundles. Stop `npm run dev`, delete `node_modules/.vite`, start it again, then hard-reload the tab.

Content lives in typed modules under `lib/`. The page calls `utcDay` then `proverbForDay`. Do not add a CMS.

## Stack

vinext (Next API on Vite) + Tailwind v4 + shadcn/ui (Nova / Radix) + Cloudflare Workers.

```
npm run dev      # vinext, default port 3000
npm test
npm run test:e2e
npm run build
npm run deploy
```

## Do not

- Add D1, KV, auth, a PWA, an archive, a copy button, or dark mode.
- Copy Dial's latte palette or SolAir's black-and-white solar look.
- Put modulo or epoch math in the page.
- Ingest dariusk/corpora, joke lists, or Oxford Dictionary wording.
