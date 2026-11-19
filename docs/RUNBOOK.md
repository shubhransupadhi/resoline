# Production Runbook & Operations Manual

**Project**: Resoline.in (Resoline Techbis Private Limited)  
**Branch**: `main` (Production) / `prod-hardening` (Hardened Staging)  

---

## 1. Production Deployment Procedure

### Automatic Deployment (CI/CD)
1. Ensure all changes are thoroughly reviewed and verified on `prod-hardening`.
2. Run the native test suite locally:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\test-runner.ps1
   ```
3. Open a Pull Request from `prod-hardening` to `main`.
4. GitHub Actions automatically executes the linting, asset checks, and automated verification tests.
5. Upon merging into `main`, GitHub Actions automatically deploys the latest version to Vercel production.

### Manual / CLI Deployment (Emergency)
```bash
# 1. Install Vercel CLI (if not installed)
npm install -g vercel

# 2. Deploy directly to production
vercel --prod
```

---

## 2. Fast Rollback Procedure

If a critical regression occurs in production:
1. **Instant Vercel Instant Rollback (Recommended - 5 Seconds)**:
   - Go to [Vercel Dashboard](https://vercel.com/) -> Select `resoline` -> Navigate to **Deployments**.
   - Locate the previous known-good deployment -> Click `...` -> Click **Rollback**.
   - This instantly repoints the global Anycast CDN to the previous immutable deployment with 0 downtime.
2. **Git Rollback**:
   ```bash
   git checkout main
   git revert HEAD
   git push origin main
   ```

---

## 3. Environment Secrets Checklist

Configure these variables in **Vercel Project Settings -> Environment Variables**:

| Variable Name | Environment | Purpose | Required |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Production, Preview | Canonical URL (`https://resoline.in`) | Yes |
| `LEAD_WEBHOOK_URL` | Production | Webhook URL for forwarding RFQ inquiries | Optional |
| `SENTRY_DSN` | Production | Sentry Project DSN for error telemetry | Optional |
| `VERCEL_TOKEN` | GitHub Secrets | CI/CD automatic deployment token | Yes (for GitHub Actions) |
| `VERCEL_ORG_ID` | GitHub Secrets | Vercel Organization ID | Yes (for GitHub Actions) |
| `VERCEL_PROJECT_ID` | GitHub Secrets | Vercel Project ID | Yes (for GitHub Actions) |

---

## 4. Incident Response & Triage Steps

### Incident 1: Website Shows Blank Screen
- **Root Cause**: Unhandled script error blocking preloader dismissal.
- **Verification**: Open DevTools (`F12`) -> Check Console.
- **Fix**: The preloader now has a 2.2-second hard timeout failsafe built in. If an external asset is unreachable, verify that all script tags in `index.html` resolve cleanly.

### Incident 2: Rate Limit False Positives
- **Root Cause**: Enterprise plant user submitted 5 quotes within 1 minute.
- **Fix**: The rate limiter releases automatically after 60 seconds. To clear client-side lock immediately, run `localStorage.removeItem('resoline_quote_timestamps')` in DevTools Console.

### Incident 3: 404 on Internal Subpages
- **Fix**: Verify that `vercel.json` contains `"cleanUrls": true`.
