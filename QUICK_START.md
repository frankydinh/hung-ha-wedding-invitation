# Quick Start Guide - Wedding Invitation Online

## 🎯 Quick Test Locally

Your application is now ready! Here's how to test it:

### 1. Start the Development Server

The server is already running at:
```
http://localhost:3000
```

### 2. Test Each Feature

#### Home Page
- Open: http://localhost:3000
- You should see the welcome page with a button to access Admin

#### Admin Panel
- Open: http://localhost:3000/admin
- Login credentials:
  - **PIN**: `0310`
  - **Phone**: `0985722893`
- Create test guests:
  1. Enter guest name (e.g., "Nguyen Van A")
  2. Select guest type (Groom or Bride family)
  3. Click "Tạo link"
  4. Copy the generated link

#### Guest Invitation
- Use the link generated from admin panel
- Or test with: http://localhost:3000/invitation/test-groom-guest
- Features to test:
  - ✅ Click the wax seal or "Tap to open" text
  - ✅ Watch the curtain animation
  - ✅ Scroll through the invitation sections
  - ✅ View the photo album (scroll down)
  - ✅ Click thumbnails to change photos
  - ✅ Click main photo for fullscreen
  - ✅ Toggle music button (bottom left)
  - ✅ Download invitation button (bottom right)

### 3. Add Your Content

#### Wedding Photos
Replace the images in:
```
wedding-app/public/slide_images/
```

#### Background Music
Add your music file:
```
wedding-app/public/wedding-music.mp3
```

#### Update Event Details
Edit: `wedding-app/app/invitation/[guestId]/page.tsx`
- Line 18-30: Groom's family event data
- Line 32-44: Bride's family event data

#### Change Admin Credentials
Edit: `wedding-app/app/api/admin/auth/route.ts`
- Line 4: `VALID_PIN`
- Line 5: `VALID_PHONE`

## 🚀 Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- ✅ Full Next.js support (API routes work)
- ✅ Free plan supports 200+ concurrent users
- ✅ Automatic HTTPS & global CDN
- ✅ Zero configuration
- ✅ Perfect for this use case

**Steps:**
1. Create account at [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Set root directory: `wedding-app`
5. Add environment variables:
   - `NEXT_PUBLIC_BASE_URL`: (Vercel will provide this)
   - `JWT_SECRET`: (generate a secure random string)
6. Click "Deploy"
7. Done! Your site is live

**Expected URL format:**
```
https://your-project-name.vercel.app
```

### Option 2: Netlify

**Steps:**
1. Create account at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Configure:
   - Base directory: `wedding-app`
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables
6. Deploy

### Option 3: GitHub Pages ⚠️

**Important:**
- ⚠️ Admin panel will NOT work (no API routes support)
- Only the invitation pages will work
- Guest links must be pre-generated before deployment

**If you still want to use GitHub Pages:**

1. Update `next.config.ts`:
```typescript
basePath: '/your-repo-name',
assetPrefix: '/your-repo-name/',
```

2. Build for static export:
```bash
cd wedding-app
npm run build
```

3. Push to GitHub and enable Pages in Settings

**Limitation:** You'll need to manually create invitation pages or use another hosting for the admin panel.

## 📊 Performance for 200 Concurrent Users

### Vercel Free Tier
- ✅ **Bandwidth:** 100 GB/month
- ✅ **Serverless Functions:** 100 GB-hours
- ✅ **Build time:** 6000 minutes
- ✅ **Concurrent Builds:** 1
- ✅ **Expected Performance:** Excellent

**Estimate:**
- 200 users × average 5MB per user = 1GB total
- Well within free tier limits
- Global CDN ensures fast loading worldwide

### Load Testing (Optional)

To be extra sure, you can load test:

```bash
# Install k6
brew install k6

# Create test script (test.js)
```

## 🎨 Customization Ideas

### 1. Change Color Theme
Edit colors in components:
- Primary: `#8B1D2F` (burgundy red)
- Gold: `#D4AF37`
- Background: `#FFFBF2`

### 2. Add More Sections
Create new components in `components/` folder and add to invitation page

### 3. Multiple Languages
Add translation support using `next-intl` package

### 4. RSVP Form
Add a form component with email notifications

### 5. Countdown Timer
Add a countdown to the wedding date

### 6. Guest Messages
Add a guestbook where visitors can leave messages

## 🔧 Troubleshooting

### Port 3000 already in use
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Images not displaying
- Check file names match exactly (case-sensitive)
- Verify files are in `public/slide_images/`
- Check browser console for errors

### Music not playing
- Ensure file is named `wedding-music.mp3`
- Some browsers block autoplay - user must click the button first
- Check browser console for errors

### Build fails
```bash
# Clear cache and reinstall
cd wedding-app
rm -rf .next node_modules
npm install
npm run build
```

## 📱 Mobile Testing

Test on mobile devices:
1. Find your local IP: `ifconfig | grep "inet "` 
2. Access from phone: `http://YOUR_IP:3000`
3. Make sure both devices are on same WiFi

## 🎉 Ready to Deploy?

Before deploying:
- [ ] Test all features locally
- [ ] Add your wedding photos
- [ ] Add your music file
- [ ] Update event details
- [ ] Change admin credentials
- [ ] Test on mobile devices
- [ ] Share test links with friends

## 📞 Support

If you encounter issues:
1. Check the main README.md
2. Check browser console for errors (F12)
3. Verify environment variables
4. Ensure all dependencies installed

---

**Your wedding invitation is ready! 🎊**

Next steps:
1. ✅ Application is running locally
2. ➡️ Customize with your content
3. ➡️ Deploy to Vercel
4. ➡️ Generate guest links
5. ➡️ Share with your guests!
