// Standalone copy of ../data/metrics.json so the dashboard renders by double-click
// (file:// blocks fetch). CI / the daily-briefing script regenerates this from the
// canonical data/metrics.json on every run. Do not hand-edit divergently.
window.PORTFOLIO_DATA = {
  "updated": "2026-08-01",
  "currency": "USD",
  "milestones": { "first_dollar": 1, "first_hundred": 100, "first_thousand": 1000 },
  "series": [
    { "date": "2026-08-01", "affiliate_clicks": 0, "affiliate_commission": 0, "product_sales": 0, "product_revenue": 0, "ad_revenue": 0, "tool_visits": 0, "site_visits": 0 }
  ],
  "sources": [
    { "name": "Amazon Associates", "kind": "affiliate", "status": "pending-signup", "manual": true },
    { "name": "Payhip", "kind": "product", "status": "live", "manual": true, "url": "https://payhip.com/b/NZ1Xb" },
    { "name": "Google AdSense", "kind": "ads", "status": "pending-signup", "manual": false },
    { "name": "Cloudflare Web Analytics", "kind": "analytics", "status": "pending-setup", "manual": false }
  ],
  "freeTierLimits": [
    { "resource": "Cloudflare Pages builds", "limit": "500 / month", "used": 0, "unit": "builds", "status": "ok" },
    { "resource": "GitHub Actions (public repo)", "limit": "unlimited (public)", "used": 0, "unit": "minutes", "status": "ok" },
    { "resource": "Cloudflare Pages bandwidth", "limit": "unlimited (fair use)", "used": 0, "unit": "GB", "status": "ok" },
    { "resource": "Supabase free tier (if used)", "limit": "500 MB DB", "used": 0, "unit": "MB", "status": "not-in-use" }
  ]
};
