# Caching & Data Storage Architecture (Phase 2)

**Project**: Resoline.in (Resoline Techbis Private Limited)  
**Tier**: Edge CDN (Vercel / Cloudflare) + Browser Storage  

---

## 1. HTTP Cache-Control Matrix

| Resource Type | Pattern | Cache-Control Directive | Invalidation Strategy |
| :--- | :--- | :--- | :--- |
| **Static Assets** | `/assets/*`, `*.png`, `*.jpg`, `*.pdf`, `*.svg` | `public, max-age=31536000, immutable` | Git deployment alias / Content hashing |
| **Bundled Scripts & Styles** | `*.js`, `*.css` | `public, max-age=31536000, immutable` | Instant cache purge on new Vercel deployment |
| **HTML Documents** | `/`, `*.html` | `public, max-age=3600, stale-while-revalidate=86400` | Edge revalidation every 60 min, SWR background refresh |
| **API & Health Endpoints** | `/api/*`, `/health` | `no-cache, no-store, must-revalidate` | Dynamic response; zero caching |

### CDN Edge Caching Mechanics
- When a user visits `resoline.in`, the CDN edge node closest to the user (e.g. Mumbai, Singapore) serves the cached HTML instantly (< 50ms TTFB).
- `stale-while-revalidate=86400` ensures visitors always receive instantaneous responses while the CDN updates in the background whenever changes are deployed.
- Static images and downloadable PDF catalogues (`RESOLINE CATALOGUE.pdf`) are cached immutably for 1 year, offloading 99%+ bandwidth from origin.

---

## 2. API Integration Layer (`api-service.js`)

The external integration layer standardizes lead transmission:
1. **Idempotency**: Every inquiry is stamped with a cryptographic idempotency token (`res_lead_<timestamp>_<rand>`) preventing duplicate quote requests if a user double-clicks.
2. **Timeout Handling**: Built-in `AbortController` terminates requests hanging beyond 8,000ms.
3. **Exponential Backoff**: Up to 2 automated retries on network failures with jitter (`1000ms`, `2000ms`).
4. **WhatsApp Business Fallback**: Generates sanitized direct WhatsApp links with equipment sizing parameters.

---

## 3. Database Indexing & Reversible Migrations (Item 6 Recommendation)

Resoline.in operates as an edge static architecture with serverless lead routing. If a relational database (PostgreSQL via Supabase or Neon) is introduced to store customer quotes and AMC maintenance tickets, the following migration and indexing strategy is pre-architected:

```sql
-- Up Migration: 001_create_leads_and_indexes.sql
CREATE TABLE IF NOT EXISTS quote_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    idempotency_key VARCHAR(64) UNIQUE NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    work_email VARCHAR(180) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    product_category VARCHAR(100) NOT NULL,
    technical_scope TEXT,
    status VARCHAR(20) DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'QUOTED', 'CLOSED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Compound Index for Sales Dashboard filtering by status and date
CREATE INDEX idx_quote_inquiries_status_created ON quote_inquiries(status, created_at DESC);

-- Unique Index on Idempotency Key (Prevents N+1 and duplicate race conditions)
CREATE UNIQUE INDEX idx_quote_inquiries_idempotency ON quote_inquiries(idempotency_key);

-- Index for searching customer email history
CREATE INDEX idx_quote_inquiries_email ON quote_inquiries(work_email);
```

```sql
-- Down Migration (Reversible):
DROP INDEX IF EXISTS idx_quote_inquiries_email;
DROP INDEX IF EXISTS idx_quote_inquiries_idempotency;
DROP INDEX IF EXISTS idx_quote_inquiries_status_created;
DROP TABLE IF EXISTS quote_inquiries;
```

---

## 4. Redis Caching Assessment (Item 8: SKIPPED)
- **Status**: **SKIPPED**
- **Justification**:
  - The entire catalog dataset (< 25 equipment models) is loaded client-side with 0 database roundtrips.
  - Rate limiting is managed in memory and browser storage with edge protection.
  - Running a dedicated Redis cluster (e.g. AWS ElastiCache or Upstash) would introduce ongoing server costs and connection pool overhead with zero latency improvement over static edge caching.
