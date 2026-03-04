# Vercel Deployment Guide

## Quick Deploy Steps

### 1. Prepare Environment Variables

Create a `.env.local` file (for local testing) or configure in Vercel Dashboard:

```bash
# Required
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app
JWT_SECRET=your-secure-jwt-secret-here
```

To generate a secure JWT secret:
```bash
openssl rand -base64 32
```

### 2. Deploy via Vercel Dashboard

1. **Visit** [vercel.com/new](https://vercel.com/new)
2. **Import** your GitHub repository: `frankydinh/hung-ha-wedding-invitation`
3. **Configure**:
   - Framework Preset: Next.js
   - Root Directory: `wedding-app`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
4. **Add Environment Variables**:
   - `NEXT_PUBLIC_BASE_URL`: Your Vercel URL (update after first deploy)
   - `JWT_SECRET`: Your generated secret
5. **Deploy** 🚀

### 3. Update Base URL

After first deployment:
1. Copy your Vercel URL (e.g., `https://hung-ha-wedding-invitation.vercel.app`)
2. Go to **Project Settings** → **Environment Variables**
3. Update `NEXT_PUBLIC_BASE_URL` to your Vercel URL
4. **Redeploy** (Settings → Deployments → Latest → ... → Redeploy)

### 4. Access Admin Panel

Visit: `https://your-project.vercel.app/admin/MDk4NTcyMjg5MzAzMTA`

Default admin PIN (base64 encoded): `MDk4NTcyMjg5MzAzMTA`
- Decodes to: `09857228930310`

---

## Alternative: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd wedding-app
vercel

# Follow prompts
# Set root directory: ./
# Override settings? N

# Production deploy
vercel --prod
```

---

## Important: Data Persistence

### Current Limitation

The app uses **file-based storage** (`data/guests.json`). On Vercel:

✅ **What works:**
- Data persists during runtime
- Multiple requests share the same data
- Creating and viewing guests works normally

⚠️ **What doesn't persist:**
- Data resets when:
  - You redeploy the app
  - Vercel's serverless function cold-starts (rare)
  - After periods of inactivity

### Recommended Solutions

For production use with persistent data, choose one:

#### Option 1: Vercel KV (Redis) - **Recommended for small projects**

**Pros:** Simple, free tier available, fast
**Free tier:** 256 MB storage, 30k requests/month

```bash
# Add Vercel KV to your project
npm i @vercel/kv
```

Update `lib/guestStorage.ts` to use KV instead of file system.

#### Option 2: Vercel Postgres

**Pros:** Reliable, SQL, good for larger projects
**Free tier:** 256 MB storage, 60 compute hours/month

```bash
npm i @vercel/postgres
```

#### Option 3: External Database

Use MongoDB Atlas, PlanetScale, or Supabase:
- **MongoDB Atlas:** Free 512 MB, easy to use
- **PlanetScale:** Free MySQL database
- **Supabase:** Free PostgreSQL + Auth

#### Option 4: Accept the limitation

For a wedding invitation that:
- Is used for 1-2 months
- Only has ~200 guests
- Admin manages guests carefully

**You can work with the current setup:**
- Add all guests before the wedding
- Export guest list regularly (add export function)
- Rarely redeploy during the event period

---

## Build Configuration

The following settings are already configured:

### `next.config.ts`
```typescript
const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Required for static export compatibility
  },
  // No basePath - app runs at root domain
};
```

### `.vercelignore`
```
data/guests.json    # Don't deploy local test data
.env.local
*.md                # Documentation files
```

---

## Monitoring & Testing

### After Deployment

✅ **Test Checklist:**
- [ ] Visit homepage
- [ ] Access admin panel: `/admin/MDk4NTcyMjg5MzAzMTA`
- [ ] Create a test guest
- [ ] Visit test guest invitation link
- [ ] Test on mobile device
- [ ] Test music playback
- [ ] Test download button
- [ ] Test all navigation buttons

### Performance

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Edge caching
- ✅ Fast builds (~1 minute)

Monitor via: [vercel.com/dashboard](https://vercel.com/dashboard)

---

## Custom Domain (Optional)

### Add Custom Domain

1. **Buy domain** (e.g., from Namecheap, GoDaddy)
2. **Vercel Dashboard** → Your Project → **Settings** → **Domains**
3. **Add** your domain: `yourdomain.com`
4. **Configure DNS** (Vercel provides instructions)
   - Usually: Add CNAME record pointing to `cname.vercel-dns.com`
5. **Wait** for DNS propagation (5-10 minutes)

### Update Environment Variables

After adding domain:
1. Update `NEXT_PUBLIC_BASE_URL` to `https://yourdomain.com`
2. Redeploy

---

## Troubleshooting

### Build Fails

**Error:** "Module not found"
- **Fix:** Run `npm install` locally, commit `package-lock.json`

**Error:** "Build exceeded time limit"
- **Fix:** Vercel free tier has 1-minute limit, but this project builds in ~30s

### API Routes Return 404

**Cause:** Wrong Next.js output mode
- **Fix:** Ensure `next.config.ts` doesn't have `output: 'export'`

### Guest Links Don't Work

**Cause:** `NEXT_PUBLIC_BASE_URL` not set correctly
- **Fix:** 
  1. Check environment variable in Vercel
  2. Must start with `https://`
  3. No trailing slash
  4. Redeploy after changing

### Images Not Loading

**Cause:** Path issues
- **Fix:** All images in `public/` folder, paths start with `/`

### Data Keeps Resetting

**Expected behavior** - See "Data Persistence" section above
- **Solution:** Migrate to Vercel KV or accept limitation

---

## Automatic Deployments

By default, Vercel automatically deploys:
- ✅ Every push to `main` branch → **Production**
- ✅ Every pull request → **Preview**

To disable:
- **Settings** → **Git** → Configure deployment branches

---

## Cost Estimation

### Free Tier Limits (Sufficient for Wedding)

| Resource | Limit | Your Usage |
|----------|-------|------------|
| Bandwidth | 100 GB/month | ~3 GB estimated |
| Serverless Execution | 100 GB-Hours | ~1 GB-Hour estimated |
| Edge Requests | Unlimited | ✅ |
| Build Minutes | 6,000/month | ~30 builds × 1 min = 30 min |

**Verdict:** Free tier is more than enough! 🎉

---

## Security Checklist

- [x] Environment variables set in Vercel (not in code)
- [x] `.env.local` in `.gitignore`
- [x] Admin URL contains encoded token
- [x] JWT secret is secure random string
- [ ] Consider changing admin PIN from default
- [ ] Consider adding rate limiting to API routes (optional)

---

## Support & Resources

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Your Project:** [GitHub repo](https://github.com/frankydinh/hung-ha-wedding-invitation)

---

## Summary

1. ✅ Push code to GitHub (Done)
2. 🚀 Deploy on Vercel (5 minutes)
3. 🔧 Set environment variables
4. 🔗 Update `NEXT_PUBLIC_BASE_URL`
5. 🎉 Share admin link and start creating invitations!

**Next step:** Visit [vercel.com/new](https://vercel.com/new) and import your repository.

