const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateImage(htmlFile, outputFile) {
  console.log(`Generating image for ${htmlFile}...`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport to match the invitation size
  await page.setViewport({
    width: 900,
    height: 1100,
    deviceScaleFactor: 2, // Higher resolution for better quality
  });
  
  // Load the HTML file
  const htmlPath = path.resolve(__dirname, '../../', htmlFile);
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0', // Wait for all resources to load
  });
  
  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
  
  // Add extra delay to ensure everything is rendered
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Find the invitation element
  const element = await page.$('.w-\\[850px\\]');
  
  if (!element) {
    throw new Error('Invitation element not found');
  }
  
  // Take screenshot of the element
  await element.screenshot({
    path: outputFile,
    type: 'png',
    omitBackground: false,
  });
  
  console.log(`✓ Generated: ${outputFile}`);
  
  await browser.close();
}

async function main() {
  try {
    // Ensure public directory exists
    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Generate both images
    await generateImage(
      'nhatrai_img.html',
      path.resolve(__dirname, '../public/thiep-cuoi-hung-ha-nha-trai.png')
    );
    
    await generateImage(
      'nhagai_img.html',
      path.resolve(__dirname, '../public/thiep-cuoi-hung-ha-nha-gai.png')
    );
    
    console.log('\n✅ All images generated successfully!');
  } catch (error) {
    console.error('❌ Error generating images:', error);
    process.exit(1);
  }
}

main();
