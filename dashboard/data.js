// AUTO-GENERATED from data/metrics.json by scripts/daily-briefing.mjs — do not hand-edit.
window.PORTFOLIO_DATA = {
  "updated": "2026-08-16",
  "note": "Canonical metrics store for the whole portfolio. Site, calculator, and product listing went live and are verified reachable as of 2026-08-16; revenue is still 0 and traffic is UNMEASURED (no analytics token yet), so no visit rows are recorded rather than guessed. Never fake a number here - where a platform has no free API, mark it manual.",
  "currency": "USD",
  "milestones": {
    "first_dollar": 1,
    "first_hundred": 100,
    "first_thousand": 1000
  },
  "series": [
    {
      "date": "2026-08-01",
      "affiliate_clicks": 0,
      "affiliate_commission": 0,
      "product_sales": 0,
      "product_revenue": 0,
      "ad_revenue": 0,
      "tool_visits": 0,
      "site_visits": 0
    }
  ],
  "sources": [
    {
      "name": "Amazon Associates",
      "kind": "affiliate",
      "api": "Product Advertising API (locked until 3 qualifying sales); commissions via manual report export until then",
      "status": "pending-signup",
      "manual": true
    },
    {
      "name": "Payhip",
      "kind": "product",
      "api": "No public sales API on the free plan — manual CSV export",
      "status": "live",
      "manual": true,
      "url": "https://payhip.com/b/NZ1Xb"
    },
    {
      "name": "Google AdSense",
      "kind": "ads",
      "api": "AdSense Management API (free, after approval)",
      "status": "pending-signup",
      "manual": false
    },
    {
      "name": "Cloudflare Web Analytics",
      "kind": "analytics",
      "api": "GraphQL Analytics API (free)",
      "status": "pending-setup",
      "manual": false,
      "note": "Blocking: until the token is added, tool_visits/site_visits cannot be recorded at all. Zeros in the series mean unmeasured, not zero traffic."
    }
  ],
  "freeTierLimits": [
    {
      "resource": "Cloudflare Pages builds",
      "limit": "500 / month",
      "used": 0,
      "unit": "builds",
      "status": "ok"
    },
    {
      "resource": "GitHub Actions (public repo)",
      "limit": "unlimited (public)",
      "used": 0,
      "unit": "minutes",
      "status": "ok"
    },
    {
      "resource": "Cloudflare Pages bandwidth",
      "limit": "unlimited (fair use)",
      "used": 0,
      "unit": "GB",
      "status": "ok"
    },
    {
      "resource": "Supabase free tier (if used by tool)",
      "limit": "500 MB DB / 2 projects",
      "used": 0,
      "unit": "MB",
      "status": "not-in-use"
    }
  ],
  "live": {
    "site": "https://riglerkarve.github.io/profitprint/",
    "tool": "https://riglerkarve.github.io/profitprint/tool/",
    "product": "https://payhip.com/b/NZ1Xb",
    "verified": "2026-08-16"
  }
};
