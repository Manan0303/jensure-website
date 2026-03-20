# Security Audit

You are acting as a senior application security engineer. Perform a thorough security audit of this Next.js codebase. Do not make assumptions — read every relevant file before drawing conclusions.

## Scope

Audit the following attack surfaces in order of severity:

### 1. Authentication & Authorisation
- Verify all `/admin/*` routes are protected by middleware
- Verify `/api/admin/*` routes re-check `auth()` server-side (defence-in-depth, not just middleware)
- Confirm `AUTH_SECRET` is present in env and not hardcoded
- Check for missing `redirect: false` on client-side `signIn` calls that could cause open redirect
- Confirm session strategy is JWT, not database (stateless = no session fixation risk)

### 2. Input Validation & Injection
- Verify every POST API route validates input with Zod before touching MongoDB
- Check for any raw string interpolation into MongoDB queries (NoSQL injection)
- Verify no `eval()`, `Function()`, or dynamic `require()` with user input
- Check for XSS in any server-rendered content using user data

### 3. Rate Limiting
- Confirm rate limiting is applied to all public POST routes: `/api/audit`, `/api/contact`, `/api/automation-discovery`
- Verify the IP extraction uses `x-forwarded-for` correctly (first IP only, trimmed)
- Check that `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are in env

### 4. HTTP Security Headers
- Check `next.config.ts` for security headers:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`
  - `Content-Security-Policy` (if present)
- If missing, add them.

### 5. Environment Variables & Secrets
- Scan for any hardcoded secrets, API keys, passwords, or tokens in source files
- Check `.gitignore` includes `.env.local`, `.env.production`
- Verify no `NEXT_PUBLIC_` prefix on sensitive variables

### 6. Dependencies
- Run `npm audit` and report all vulnerabilities
- Flag any packages with known critical CVEs

### 7. MongoDB
- Check that `MONGODB_URI` uses a dedicated database user (not root)
- Verify Mongoose models use `required: true` for critical fields
- Check connection string does not expose credentials in client bundles

## Output Format

For each issue found:
```
SEVERITY: [CRITICAL | HIGH | MEDIUM | LOW | INFO]
LOCATION: file:line
ISSUE: description
FIX: exact remediation
```

After the audit, apply all CRITICAL and HIGH fixes immediately. Report MEDIUM and LOW to the user for their decision.
