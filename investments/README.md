# Portfolio (static)

A read-only investment portfolio page. All content is driven by two JSON files; visitors see whatever you commit. No backend, no login, no build step.

## Updating growth

Edit `data/growth.json`. Change `value` to the new percentage (number — can be negative). Change `updatedAt` to the current ISO timestamp.

To get a fresh ISO timestamp:

```bash
date -u +"%Y-%m-%dT%H:%M:%SZ"
```

Save, commit, push. Live within ~1 minute.

```json
{
  "value": 12.4,
  "updatedAt": "2026-05-15T19:38:10Z"
}
```

## Adding a new investment

Edit `data/investments.json`. Add an object at the top of the array with `amount`, `name`, optional `note`, and `date` (ISO timestamp). Save, commit, push. (Order in the file doesn't actually matter — the page sorts by `date` descending.)

```json
{
  "amount": 2500,
  "name": "Q2 contribution",
  "note": "Initial seed round",
  "date": "2026-05-10T14:30:00Z"
}
```

## Removing an investment

Delete the object from `data/investments.json`. Save, commit, push.

## Deploying (GitHub Pages)

1. Commit everything in this `investments/` subfolder to your repo.
2. Push to GitHub.
3. In the repo settings → **Pages → Source: "Deploy from a branch"**, Branch: `main`, Folder: `/ (root)`. Wait ~1 minute.
4. The page is at `https://yourusername.github.io/yourreponame/investments/`.

### Custom subdomain (e.g. `portfolio.dariotino.com`)

1. In your DNS provider (Cyon), add a **CNAME** record from `portfolio` → `yourusername.github.io`.
2. In the repo, add (or already have) a `CNAME` file at the repo root containing `portfolio.dariotino.com`.
   - If you already have a `CNAME` for the main domain, the subdomain works automatically once the DNS record propagates — you just need the DNS step.
3. Wait for DNS propagation (typically a few minutes; up to an hour).

## Local testing

```bash
cd ~/Desktop/dariotino.com-2026/investments
python3 -m http.server 8000
```

Open <http://localhost:8000>. Refresh after edits to see changes.

## Files

- `index.html` — single page
- `styles.css` — theme
- `app.js` — fetches the two JSON files and renders
- `data/growth.json` — current portfolio growth %
- `data/investments.json` — array of entries (newest first by convention; sorted by JS anyway)
