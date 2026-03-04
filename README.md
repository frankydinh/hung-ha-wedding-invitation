# Wedding Invitation Online

A beautiful, interactive online wedding invitation built with Next.js.

## Features

- ✨ **Beautiful Banner with Curtain Effect**: A dramatic wax seal that reveals the invitation
- 📅 **Dual Event Display**: Shows different event details for groom's and bride's families
- 🖼️ **Album Slider**: Lazy-loaded image gallery with fullscreen view
- 🎵 **Background Music**: Toggle-able wedding music
- 📥 **Download as Image**: Export invitation as image
- 👥 **Guest Management**: Admin panel to generate personalized invitation links
- 🔐 **Secure Admin**: JWT-based authentication with PIN and phone number

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Authentication**: JWT (jsonwebtoken)
- **Image Export**: html2canvas
- **Icons & Fonts**: Google Fonts & Material Symbols

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Navigate to the project:
```bash
cd wedding-app
npm install
```

2. Create environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your settings:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
JWT_SECRET=your-secret-key-here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Admin Panel

1. Navigate to `/admin`
2. Enter the PIN: `0310` and phone number: `0985722893`
3. Generate guest links by entering:
   - Guest name
   - Guest type (Groom's family or Bride's family)
4. Copy and share the generated links

### Guest Experience

1. Guests receive their personalized invitation link
2. Click on the wax seal or "Tap to open" to reveal the invitation
3. View event details (different for groom's/bride's families)
4. Browse the photo album
5. Toggle background music
6. Download the invitation as an image

## Deployment

### ⚠️ GitHub Pages Limitation

**GitHub Pages only supports static sites.** The admin functionality (API routes) will NOT work on GitHub Pages because it requires a server.

**Recommended Solution**: Deploy to **Vercel** or **Netlify** for full functionality including admin panel.

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set the root directory to `wedding-app`
4. Add environment variables:
   - `NEXT_PUBLIC_BASE_URL`: Your deployment URL
   - `JWT_SECRET`: A secure secret key
5. Deploy!

Vercel offers:
- ✅ Full Next.js support including API routes
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Free tier sufficient for 200+ concurrent users
- ✅ Zero configuration

### Netlify

1. Push your code to GitHub
2. Create a new site in [Netlify](https://netlify.com)
3. Set base directory to `wedding-app`
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables
7. Deploy!

### Railway / Render (Alternative)

Both support Next.js with API routes and have free tiers.

## Configuration

### Event Data

Update wedding event information in `app/invitation/[guestId]/page.tsx`:

```typescript
const groomEventData: WeddingEventData = {
  groomName: 'Khánh Hưng',
  brideName: 'Đinh Hà',
  // ... other fields
};
```

### Admin Credentials

Update credentials in `app/api/admin/auth/route.ts`:

```typescript
const VALID_PIN = '0310';
const VALID_PHONE = '0985722893';
```

### Wedding Photos

Place your wedding photos in `public/slide_images/` and they will be automatically loaded.

### Background Music

Add your wedding music file as `public/wedding-music.mp3`

## Performance for 200 Concurrent Users

The application is optimized for high traffic:

1. **Lazy Loading**: Images load only when needed
2. **Server-Side Rendering**: Fast initial page loads
3. **CDN Distribution**: When deployed to Vercel/Netlify
4. **Optimized Assets**: Compressed images and code splitting

**Testing**: Vercel and Netlify's free tiers can easily handle 200 concurrent users. Both provide:
- Global CDN
- Auto-scaling
- DDoS protection
- 100GB+ bandwidth (free tier)

## Project Structure

```
wedding-app/
├── app/
│   ├── admin/              # Admin panel
│   ├── api/                # API routes for authentication
│   ├── invitation/[guestId]/  # Dynamic invitation pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── Album.tsx           # Photo album slider
│   ├── Banner.tsx          # Landing page banner
│   ├── CurtainEffect.tsx   # Opening animation
│   ├── FloatingButtons.tsx # Music & download buttons
│   ├── ThanhHon.tsx        # Wedding ceremony section
│   └── TiecCuoi.tsx        # Wedding reception section
├── lib/                    # Utilities
│   └── auth.ts             # JWT verification
├── public/                 # Static assets
│   ├── slide_images/       # Wedding photos
│   ├── wax.png            # Wax seal image
│   └── wedding-music.mp3  # Background music
└── types/                  # TypeScript types
    └── index.ts
```

## Troubleshooting

### Images not loading
- Check image paths in `public/slide_images/`
- Verify image formats (PNG, JPG supported)

### Admin login not working
- Check PIN and phone number in API route
- Verify JWT_SECRET is set in environment variables

### Music not playing
- Add `wedding-music.mp3` to `public/` folder
- Some browsers require user interaction before playing audio

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires v20+)

## License

This project is for personal use. Feel free to customize for your own wedding!

---

🎉 **Congratulations on your wedding!** 🎊
