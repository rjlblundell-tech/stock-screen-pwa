# Stock Screen PWA

A full-screen iPad dashboard for the daily stock screening pipeline.
Reads from Supabase and installs to the iPad home screen via Safari.

## Files

```
pwa/
├── index.html      main app (edit CONFIG block before deploying)
├── manifest.json   PWA identity (name, colours, icons)
├── sw.js           service worker (offline shell cache)
├── icon-192.png    home screen icon
├── icon-512.png    splash icon
└── .github/
    └── workflows/
        └── deploy.yml   auto-deploy to GitHub Pages on push
```

## Setup — 3 steps

### 1. Edit index.html

Open index.html and find the CONFIG block near the top of the `<script>` tag:

```js
const CONFIG = {
  SUPABASE_URL: 'https://YOUR_REF.supabase.co',   // ← your project URL
  SUPABASE_KEY: 'YOUR_PUBLISHABLE_KEY',            // ← sb_publishable_... or anon key
  TABLE:        'screen_results',
  ROWS:         20,
};
```

Replace the two placeholder values. The publishable key is safe to commit —
security is enforced by Row Level Security in Supabase.

### 2. Push to GitHub Pages

Create a new GitHub repo (e.g. `stock-screen-pwa`), then from this folder:

```bash
git init
git add .
git commit -m "initial pwa"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stock-screen-pwa.git
git push -u origin main
```

Then in the repo on GitHub:
- Settings → Pages → Source → **GitHub Actions**

The deploy workflow runs automatically. After ~30 seconds the dashboard is live at:
`https://YOUR_USERNAME.github.io/stock-screen-pwa/`

### 3. Install to iPad home screen

On your iPad:
1. Open Safari and go to the URL above.
2. Tap the **Share** button (box with arrow, bottom of screen).
3. Tap **Add to Home Screen**.
4. Name it "Screen" → **Add**.

It opens full-screen with no browser chrome, like a native app.

## Usage

- Tap any ticker row to expand signal detail and key drivers.
- Tap **↻ refresh** to re-fetch the latest run without reloading.
- If the pipeline hasn't run yet today, it shows the most recent date's results.

## Notes

- The publishable key is intentionally visible in the client — that is how
  Supabase is designed. RLS restricts it to SELECT on screen_results only.
- The service_role / secret key must never appear in this codebase.
- If you rename the Supabase table, update CONFIG.TABLE to match.
- Not investment advice. Personal use only.
