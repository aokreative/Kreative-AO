import { chromium } from '@playwright/test';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  const pagesToScreenshot = [
    { url: 'http://localhost:3000/', name: 'hero.png' },
    { url: 'http://localhost:3000/services', name: 'services.png' },
    { url: 'http://localhost:3000/work', name: 'work.png' }
  ];

  const outputDir = 'C:\\Users\\Ricky\\.gemini\\antigravity-ide\\brain\\77178dd3-9ec3-42de-8d1c-98bc2a45bb99\\scratch';

  for (const p of pagesToScreenshot) {
    console.log(`Navigating to ${p.url}...`);
    const page = await context.newPage();
    await page.goto(p.url, { waitUntil: 'networkidle' });
    
    // Give it a moment for animations/fonts to settle
    await page.waitForTimeout(1000);
    
    const outputPath = path.join(outputDir, p.name);
    await page.screenshot({ path: outputPath, fullPage: false });
    console.log(`Saved screenshot to ${outputPath}`);
    await page.close();
  }

  await browser.close();
})();
