# ✅ Testing Checklist - Wedding Invitation

Use this checklist to ensure everything works before deploying.

---

## 🌐 Basic Functionality

### Homepage (http://localhost:3000)
- [ ] Page loads without errors
- [ ] "Thiệp Cưới Online" title displays
- [ ] "Khánh Hưng & Đinh Hà" text visible
- [ ] "Quản lý Admin" button is clickable
- [ ] Background gradient displays correctly

---

## 🔐 Admin Panel (http://localhost:3000/admin)

### Login
- [ ] Admin page loads
- [ ] Login form displays
- [ ] Can enter PIN: `0310`
- [ ] Can enter Phone: `0985722893`
- [ ] Click "Đăng nhập" button
- [ ] Successfully logs in
- [ ] Redirects to admin dashboard

### Dashboard
- [ ] Admin dashboard loads after login
- [ ] "Quản lý khách mời" title visible
- [ ] "Đăng xuất" button present
- [ ] Guest creation form displays

### Create Guest
- [ ] Can enter guest name
- [ ] Can select "Nhà trai" (groom)
- [ ] Can select "Nhà gái" (bride)
- [ ] Click "Tạo link" button
- [ ] Link generates successfully
- [ ] Link displays in green box
- [ ] "Copy" button works
- [ ] Guest appears in list below
- [ ] Can create multiple guests

### Guest List
- [ ] Guests display in grid
- [ ] Guest name shows correctly
- [ ] Guest type shows ("Nhà trai" or "Nhà gái")
- [ ] Link displays for each guest
- [ ] "Copy" button works for each link
- [ ] "Delete" button appears
- [ ] Can delete a guest
- [ ] Counter shows correct number

### Logout
- [ ] Click "Đăng xuất" button
- [ ] Returns to login page
- [ ] Cannot access dashboard without login

---

## 💌 Guest Invitation (Create a test link or use http://localhost:3000/invitation/test-groom)

### Banner (Initial View)
- [ ] Page loads with burgundy red background
- [ ] "Save the Date" text in gold
- [ ] Wax seal image displays in center
- [ ] "Tap to open" text animates (floats up/down)
- [ ] Background noise texture visible
- [ ] Gold vertical line visible
- [ ] Corner decorations visible

### Interaction
- [ ] Can click on wax seal
- [ ] Can click on "Tap to open" text
- [ ] Curtain effect triggers on click
- [ ] Left side slides left
- [ ] Right side slides right
- [ ] Gold line splits in middle
- [ ] Animation is smooth (not jumpy)
- [ ] Animation completes (~1.2 seconds)

### After Curtain Opens
- [ ] Content appears automatically
- [ ] Sections display in order:
  1. Tiệc Cưới
  2. Lễ Thành Hôn
  3. Album

---

## 🎊 Tiệc Cưới Section

### Header
- [ ] "Tiệc cưới" title displays
- [ ] Couple names show correctly
- [ ] "&" symbol between names
- [ ] Restaurant icon displays
- [ ] Gold decorative lines visible

### Date Display
- [ ] Date shows: 21 / 03 / 2026
- [ ] Date splits correctly (21 in red, 03, 2026)
- [ ] Vertical gold separators between numbers
- [ ] Time displays correctly
- [ ] Lunar date shows in italics
- [ ] Heart icon below date

### Location
- [ ] Location pin icon displays
- [ ] Address text readable
- [ ] Province name in bold
- [ ] "Xem bản đồ Google Maps" button present
- [ ] Button has hover effect
- [ ] Button is clickable (can link later)

### Different Addresses
- [ ] Groom guest sees: Hòa Bình address
- [ ] Bride guest sees: Ninh Bình address
- [ ] Test both by creating different guest types

---

## 💍 Lễ Thành Hôn Section

### Header
- [ ] "Lễ Thành Hôn" title displays
- [ ] Couple names show correctly
- [ ] Join/rings icon displays
- [ ] Gold decorative lines visible

### Date Display
- [ ] Date shows: 22 / 03 / 2026
- [ ] Time displays correctly
- [ ] Lunar date shows
- [ ] Heart icon present

### Location
- [ ] Location pin icon displays
- [ ] Address matches guest type
- [ ] Map button present and styled

---

## 📸 Album Section

### Header
- [ ] "Album ảnh cưới" title displays
- [ ] Photo library icon visible
- [ ] Gold decorative lines present

### Main Image
- [ ] Large main photo displays
- [ ] Image has 3:4 aspect ratio
- [ ] Image has border and shadow
- [ ] Image is clear (not blurry)
- [ ] Cursor changes to pointer on hover

### Thumbnails
- [ ] 4 thumbnail images below main photo
- [ ] Thumbnails are square
- [ ] Thumbnails have slight opacity
- [ ] Active thumbnail has gold ring/border
- [ ] Active thumbnail is fully opaque

### Interaction
- [ ] Click thumbnail to change main image
- [ ] Main image updates smoothly
- [ ] Fade transition occurs
- [ ] Active thumbnail highlight moves
- [ ] Click different thumbnails works

### Fullscreen View
- [ ] Click main image
- [ ] Fullscreen view opens
- [ ] Background is dark/black
- [ ] Image is centered
- [ ] Image is larger/zoomed
- [ ] Close button appears (top right)
- [ ] Click close button
- [ ] Fullscreen closes
- [ ] Click outside image closes fullscreen

### Lazy Loading
- [ ] Album images DON'T load on initial page load
- [ ] Scroll down to album section
- [ ] Images start loading when album is visible
- [ ] All 12 images from slide_images folder load
- [ ] No broken image icons

---

## 🎵 Floating Buttons

### Music Button (Bottom Left)
- [ ] Button is visible and fixed position
- [ ] Button has white background
- [ ] Button has shadow
- [ ] Music icon displays (note or note_off)
- [ ] Icon is burgundy red color
- [ ] Button has hover effect (scales up)
- [ ] Button has click effect (scales down)
- [ ] Click toggles icon
- [ ] Icon changes between music_note and music_off

### Music Functionality
- [ ] Add `wedding-music.mp3` to public folder first!
- [ ] Click button
- [ ] Music starts playing
- [ ] Click again
- [ ] Music pauses
- [ ] Music loops continuously
- [ ] Volume is reasonable

### Download Button (Bottom Right)
- [ ] Button is visible and fixed position
- [ ] Button has white background
- [ ] Button has shadow
- [ ] Download icon displays
- [ ] Icon is burgundy red color
- [ ] Button has hover effect
- [ ] Button has click effect
- [ ] Click triggers download

### Download Functionality
- [ ] Click download button
- [ ] Browser download starts
- [ ] PNG file downloads
- [ ] Filename: `wedding-invitation-groom.png` or `wedding-invitation-bride.png`
- [ ] Open downloaded image
- [ ] Image shows invitation content
- [ ] Image quality is good

---

## 📱 Responsive Design

### Desktop (1920x1080)
- [ ] Layout looks good
- [ ] All sections visible
- [ ] Images not stretched
- [ ] Text readable
- [ ] Buttons accessible

### Tablet (768x1024)
- [ ] Layout adapts
- [ ] Content fits screen
- [ ] No horizontal scroll
- [ ] Touch interactions work

### Mobile (375x667 - iPhone SE)
- [ ] Layout is mobile-friendly
- [ ] Max-width container (450px) centers
- [ ] All text readable
- [ ] Images load and display
- [ ] Buttons are tap-able
- [ ] No elements cut off
- [ ] Vertical scroll works smoothly

### Mobile Landscape
- [ ] Content still accessible
- [ ] Can scroll to see all content

---

## 🎨 Visual Design

### Colors
- [ ] Primary burgundy red: #8B1D2F
- [ ] Gold accents: #D4AF37
- [ ] Cream background: #FFFBF2
- [ ] Colors consistent throughout

### Fonts
- [ ] Playfair Display for headings
- [ ] Dancing Script for decorative text
- [ ] Montserrat for body text
- [ ] Material Symbols for icons
- [ ] All fonts load correctly

### Animations
- [ ] Banner float animation smooth
- [ ] Curtain split smooth
- [ ] Image transitions smooth
- [ ] Button hover effects smooth
- [ ] No janky/stuttering animations

### Spacing & Layout
- [ ] Sections have proper spacing
- [ ] Text is not cramped
- [ ] Images have breathing room
- [ ] Footer has enough padding

---

## 🌐 Browser Testing

Test on multiple browsers:

### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] Images load
- [ ] Animations smooth

### Safari
- [ ] All features work
- [ ] No console errors
- [ ] Images load
- [ ] Animations smooth

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Images load
- [ ] Animations smooth

### Edge
- [ ] All features work
- [ ] No console errors

---

## 🔍 Console Checks

Open browser console (F12) and check:

### Errors
- [ ] No red error messages
- [ ] No 404 (file not found) errors
- [ ] No CORS errors
- [ ] No JavaScript errors

### Warnings
- [ ] Check for any warnings
- [ ] Image format warnings OK
- [ ] Console clean overall

### Network Tab
- [ ] All resources load (200 status)
- [ ] No failed requests
- [ ] Images load when scrolled to album

---

## ⚡ Performance

### Page Load
- [ ] Initial load < 3 seconds
- [ ] Content appears quickly
- [ ] No long white screen

### Image Loading
- [ ] Banner loads immediately
- [ ] Album images lazy load
- [ ] Thumbnails load efficiently
- [ ] No excessive image sizes

### Animations
- [ ] Curtain animation 60fps
- [ ] Image transitions smooth
- [ ] Button effects smooth
- [ ] No lag during interactions

---

## 🔐 Security & Privacy

### Admin Access
- [ ] Cannot access /admin without login
- [ ] Cannot access API without token
- [ ] Token expires after 24 hours
- [ ] Wrong credentials rejected

### Environment Variables
- [ ] JWT_SECRET is set
- [ ] BASE_URL is set
- [ ] No secrets in client code

---

## 📊 Different Guest Types

Test both guest types to ensure different data displays:

### Groom Guest
- [ ] Create guest with "Nhà trai"
- [ ] Open invitation link
- [ ] Tiệc Cưới shows Hòa Bình address
- [ ] Lễ Thành Hôn shows Hòa Bình address
- [ ] Names in order: Khánh Hưng & Đinh Hà
- [ ] Time: 16:00 Thứ bảy / 10:00 Chủ Nhật

### Bride Guest
- [ ] Create guest with "Nhà gái"
- [ ] Open invitation link
- [ ] Tiệc Cưới shows Ninh Bình address
- [ ] Lễ Thành Hôn shows Ninh Bình address
- [ ] Names in order: Đinh Hà & Khánh Hưng
- [ ] Time: 17:00 Thứ bảy / 08:30 Chủ Nhật

---

## 📝 Content Customization

Before deploying, customize:

### Images
- [ ] Replace slide_images with your photos
- [ ] All 12 images replaced
- [ ] Images are optimized (< 500KB each)
- [ ] Images are correct orientation

### Music
- [ ] Add wedding-music.mp3
- [ ] Test audio plays
- [ ] Volume is appropriate
- [ ] Music loops correctly

### Event Details
- [ ] Update dates
- [ ] Update times
- [ ] Update addresses
- [ ] Update names
- [ ] Update lunar calendar dates

### Admin Credentials
- [ ] Change PIN from 0310
- [ ] Change phone number
- [ ] Test new credentials work

---

## 🚀 Pre-Deployment

Before deploying to production:

### Final Checks
- [ ] All features tested locally
- [ ] All content customized
- [ ] All images optimized
- [ ] Music file added
- [ ] Admin credentials changed
- [ ] Tested on mobile devices
- [ ] Tested on multiple browsers
- [ ] No console errors
- [ ] Performance is good

### Vercel Preparation
- [ ] Code pushed to GitHub
- [ ] Repository is public or Vercel has access
- [ ] Environment variables documented
- [ ] README is updated with your info

---

## ✅ Final Sign-Off

Check all sections above before deploying:

- [ ] ✅ Homepage working
- [ ] ✅ Admin panel working
- [ ] ✅ Guest invitations working
- [ ] ✅ Curtain effect working
- [ ] ✅ Album slider working
- [ ] ✅ Music toggle working
- [ ] ✅ Download working
- [ ] ✅ Mobile responsive
- [ ] ✅ All browsers tested
- [ ] ✅ Content customized
- [ ] ✅ Performance good

---

## 🎉 Ready to Deploy!

Once all items are checked:

1. Commit and push to GitHub
2. Deploy to Vercel
3. Test on production URL
4. Generate guest links
5. Share with guests!

---

**Checklist completed on:** _____________

**Tested by:** _____________

**Ready for production:** [ ] YES  [ ] NO

**Notes:**
_________________________________________________
_________________________________________________
_________________________________________________
