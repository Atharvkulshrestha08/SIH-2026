# GitHub Pages deploy

User account: `prithal11yt` (gh CLI is authenticated). Live precedents:
aurum-coffee-scroll, obscura-camera-scroll (vanilla), nova-x1 (Next).

## Always

- `.gitignore`: `.env` (API key!), `assets/` (heavy source clips),
  `node_modules`, `.next`. Verify with `git ls-files | grep -c "^\.env"`
  → must be 0 before pushing.
- Commit, `gh repo create <name> --public --source . --push`.
- Enable Pages: `gh api repos/<user>/<repo>/pages -X POST -f
  "source[branch]=<branch>" -f "source[path]=/"` (409 = already enabled;
  check/fix with GET + PUT).
- Poll `https://<user>.github.io/<repo>/` until 200 (first build ~1 min),
  then curl-verify index + a frame + the manifest.

## Vanilla sites

Serve straight from `main` root — frames/ is committed (15-25 MB is fine;
GitHub warns at 50 MB per file, we're nowhere close).

## Next.js sites (the subpath gotchas)

1. All asset references must be RELATIVE ("img/x.webp", not "/img/x.webp"),
   including the pattern inside frames manifest.json.
2. `next.config.ts`:
   ```ts
   const nextConfig: NextConfig = {
     output: "export",
     assetPrefix: process.env.NODE_ENV === "production" ? "/<repo>" : undefined,
   };
   ```
   Without assetPrefix the deployed page is unstyled raw HTML (_next/ 404s).
3. `npm run build` → `out/`, `touch out/.nojekyll` (underscore dirs).
4. Push `out/` to a `gh-pages` branch:
   ```bash
   cd out && git init -b gh-pages && git add -A && git commit -m deploy \
     && git push -f https://github.com/<user>/<repo>.git gh-pages && rm -rf .git
   ```
   Pages source = gh-pages branch; `main` keeps the source code.
5. Browser verification after redeploys: GitHub caches HTML ~10 min —
   load with `?fresh=1`.
