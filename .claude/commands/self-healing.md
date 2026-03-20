# Self-Healing Diagnostic

You are acting as a senior site-reliability engineer. The site is broken or degraded. Diagnose and fix the issue without assumptions — read logs and files first.

## Step-by-Step Protocol

### Step 1 — Identify the symptom
Ask (or infer from context):
- Is this a build failure, runtime error, or wrong behaviour?
- Which route or page is affected?
- What is the exact error message or HTTP status code?

### Step 2 — Reproduce locally
```bash
rm -rf .next
npm run build 2>&1
```
If build fails, the error output contains the root cause. Fix it before proceeding.

If build succeeds, start dev server:
```bash
npm run dev > /tmp/jensure-dev.log 2>&1 &
sleep 8
curl -s http://localhost:3000/AFFECTED_ROUTE -o /dev/null -w "%{http_code}"
cat /tmp/jensure-dev.log | grep -E "error|Error|warn" | head -30
```

### Step 3 — Triage by error pattern

| Pattern | Likely Cause | Fix |
|---------|-------------|-----|
| `Cannot find module './XXX.js'` | Stale `.next` cache | `rm -rf .next && npm run build` |
| `ENOTFOUND _mongodb._tcp.XXX` | Malformed `MONGODB_URI` (truncated or `@` in password not URL-encoded) | URL-encode special chars: `@` → `%40`, `#` → `%23` |
| `querySrv ENOTFOUND` | Same as above | Same fix |
| `Module not found: Can't resolve '@/lib/XXX'` | File not committed to git | `git status`, commit the missing file, push |
| `__webpack_modules__[moduleId] is not a function` | Framer Motion: same CSS property controlled by both MotionValue (`style`) and `animate` prop on same element | Separate into wrapper (style) + inner div (animate) |
| `pathLength` animation on `motion.line` | Only `motion.path` supports `pathLength` | Replace `motion.line` with static `<line>` |
| `ERESOLVE` on npm install | Peer dependency conflict | Add `--legacy-peer-deps` or upgrade the conflicting package |
| `500` on `/api/*` after deploy | Env vars not applied | Redeploy after adding env vars in Vercel dashboard |
| `401` on `/api/admin/*` | Session not passed or `auth()` check failing | Verify `AUTH_SECRET` is same in local and Vercel env |
| `429` from rate limiter | Upstash Redis env vars missing or wrong | Check `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` |
| Build passes, `npm start` gives 500 | Missing env var at runtime | Check all required env vars are set |
| `Port 3000 is in use` | Zombie Next.js process | `pkill -f "next dev"; lsof -ti:3000 | xargs kill -9` |

### Step 4 — Fix and verify
1. Apply the fix
2. Run `npm run build` — must exit 0
3. Curl all critical routes and confirm 200:
```bash
for route in "/" "/blog" "/blog/ai-automation" "/services" "/ai-departments" "/admin/login"; do
  curl -s http://localhost:3000$route -o /dev/null -w "$route → %{http_code}\n"
done
```
4. Check dev server logs for any new errors

### Step 5 — Commit and deploy
```bash
git add -A
git commit -m "fix: <description of what broke and how it was fixed>"
git push
```
Then trigger a Vercel redeploy if the fix involved env var changes.

### Step 6 — Report
State:
- Root cause (exact file and line if applicable)
- What was broken and why
- What was changed to fix it
- Confirmation that build and routes pass
