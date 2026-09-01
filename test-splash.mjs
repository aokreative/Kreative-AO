import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  
  console.log("=== Test 1: Fresh Incognito Context ===");
  const context1 = await browser.newContext();
  const page1 = await context1.newPage();
  
  await page1.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  const htmlSplash1 = await page1.evaluate(() => document.documentElement.getAttribute('data-splash'));
  console.log(`Incognito (Initial): splashAttr="${htmlSplash1}"`);
  
  // Wait for it to play (4s)
  await page1.waitForTimeout(4000);
  const htmlSplashAfter1 = await page1.evaluate(() => document.documentElement.getAttribute('data-splash'));
  console.log(`Incognito (After Play): splashAttr="${htmlSplashAfter1}"`);

  console.log("\n=== Test 2: Reloading after sessionStorage.clear() ===");
  await page1.evaluate(() => {
    sessionStorage.clear();
  });
  await page1.reload({ waitUntil: 'networkidle' });
  const htmlSplash2 = await page1.evaluate(() => document.documentElement.getAttribute('data-splash'));
  console.log(`Same tab, cleared session: splashAttr="${htmlSplash2}"`);

  // Wait for it to play
  await page1.waitForTimeout(4000);

  console.log("\n=== Test 3: Reloading without clearing session ===");
  await page1.reload({ waitUntil: 'networkidle' });
  const htmlSplash3 = await page1.evaluate(() => document.documentElement.getAttribute('data-splash'));
  console.log(`Same tab, existing session: splashAttr="${htmlSplash3}"`);

  await context1.close();
  await browser.close();
})();
