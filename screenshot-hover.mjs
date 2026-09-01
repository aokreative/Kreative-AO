import { chromium } from '@playwright/test';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  const page = await context.newPage();
  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  
  // Give it a moment to load
  await page.waitForTimeout(1000);
  
  // Find the hero stat card
  // It has the class 'glass' inside the hero
  const statCard = await page.$('.glass.relative.z-20');
  
  if (statCard) {
    const box = await statCard.boundingBox();
    if (box) {
      // Move mouse to the center of the card
      console.log(`Moving mouse to ${box.x + box.width / 2}, ${box.y + box.height / 2}`);
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      
      // Give it time for the transition to finish
      await page.waitForTimeout(600);
      
      const outputDir = 'C:\\Users\\Ricky\\.gemini\\antigravity-ide\\brain\\77178dd3-9ec3-42de-8d1c-98bc2a45bb99\\scratch';
      const outputPath = path.join(outputDir, 'hero_stat_glass.png');
      
      await statCard.screenshot({ path: outputPath });
      console.log(`Saved screenshot to ${outputPath}`);
    } else {
      console.log('Stat card bounding box not found.');
    }
  } else {
    console.log('Stat card not found.');
  }

  await page.close();
  await browser.close();
})();
