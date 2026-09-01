import { chromium } from '@playwright/test';
import path from 'path';

const PAGES = ['/', '/services', '/work', '/products', '/blog'];
const OUT = 'C:\\Users\\Ricky\\.gemini\\antigravity-ide\\brain\\77178dd3-9ec3-42de-8d1c-98bc2a45bb99\\scratch';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  await page.addInitScript(() => { sessionStorage.setItem('ao-splash', '1'); });

  for (const route of PAGES) {
    const name = route === '/' ? 'home' : route.slice(1);
    console.log(`Navigating to ${route}...`);
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    
    // Full page screenshot
    const fp = path.join(OUT, `walk_${name}.png`);
    await page.screenshot({ path: fp, fullPage: true });
    console.log(`  Saved ${fp}`);
    
    // Check for obvious issues: elements with 0 height that shouldn't be
    const issues = await page.evaluate(() => {
      const problems = [];
      // Check sections
      document.querySelectorAll('section').forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.height < 10) problems.push(`section[${i}] height=${Math.round(r.height)}`);
      });
      // Check cards
      document.querySelectorAll('[class*="card"], [class*="rounded"]').forEach((c, i) => {
        const r = c.getBoundingClientRect();
        if (r.height < 5 && r.width > 50) problems.push(`card-like[${i}] height=${Math.round(r.height)} class="${c.className.slice(0,60)}"`);
      });
      // Check overflow
      const body = document.body;
      const bodyW = body.scrollWidth;
      const vpW = window.innerWidth;
      if (bodyW > vpW + 5) problems.push(`horizontal overflow: body=${bodyW} viewport=${vpW}`);
      
      return problems;
    });
    
    if (issues.length > 0) {
      console.log(`  ISSUES: ${JSON.stringify(issues)}`);
    } else {
      console.log(`  No layout issues detected.`);
    }
  }

  await context.close();
  await browser.close();
})();
