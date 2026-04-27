# dariotino.com

Single-page portfolio. Plain HTML + Tailwind CSS (CLI), deployed via GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

This watches `src/input.css` and writes `dist/output.css`. Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Production build

```bash
npm run build
```

Writes a minified `dist/output.css`. Commit it — GitHub Pages serves it as-is.

## Deploy

Push to `main`. GitHub Pages serves the static files at `dariotino.com` (CNAME).

## Structure

```
index.html              single-page site
src/input.css           Tailwind directives + glass / aurora utilities
dist/output.css         Tailwind build output (committed)
public/logo-dt.png      DT glassmorphism logo (drop in here)
public/projects/        project thumbnails
tailwind.config.js      design tokens (palette, fonts)
```

## Design tokens

| token       | hex       |
| ----------- | --------- |
| `ice`       | `#e8f4ff` |
| `sky`       | `#b8dcff` |
| `cyan`      | `#7fdfff` |
| `cobalt`    | `#2a7cd8` |
| `navy`      | `#0a3d8f` |
| `midnight`  | `#0a2a5f` |

Custom utility classes: `.glass`, `.glossy-edge`, `.aurora-bg`, `.aurora-blob` (see `src/input.css`).
