# Image Generation for Wedding Invitations

## Overview
Pre-generated invitation images are used for downloads to ensure consistent layout and high-quality output.

## Files
- `scripts/generate-images.js` - Node script that uses Puppeteer to generate images from HTML templates
- `public/thiep-cuoi-hung-ha-nha-trai.png` - Pre-generated image for groom's guests (850x1000px @ 2x scale = 1672x2000px)
- `public/thiep-cuoi-hung-ha-nha-gai.png` - Pre-generated image for bride's guests (850x1000px @ 2x scale = 1672x2000px)

## Regenerating Images

If you need to update the invitation design and regenerate the images:

1. Update the HTML templates:
   - `/nhatrai_img.html` (for groom's guests)
   - `/nhagai_img.html` (for bride's guests)

2. Run the generation script:
   ```bash
   npm run generate-images
   ```

3. The script will:
   - Launch a headless browser using Puppeteer
   - Load each HTML template
   - Wait for fonts and resources to load
   - Take a screenshot of the invitation element
   - Save high-resolution PNG files to `public/`

## Technical Details

- **Resolution**: 2x device scale factor for crisp display on high-DPI screens
- **Size**: 850x1000px logical size (1672x2000px actual)
- **Format**: PNG with full color depth
- **Load time**: ~2 seconds per image to ensure fonts are fully loaded

## Download Functionality

Both Banner.tsx and FloatingButtons.tsx download the pre-generated images directly:
- Filename: `thiep-cuoi-hung-ha.png` (same for both guest types)
- Method: Fetch pre-generated image from `/public` and trigger browser download
- No runtime HTML-to-canvas conversion needed
