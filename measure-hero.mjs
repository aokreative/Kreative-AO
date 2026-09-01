import { chromium } from '@playwright/test';

async function measure(page, width) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  return page.evaluate(() => {
    const main = document.getElementById('main') || document.querySelector('main');
    if (!main) return { error: 'No main' };
    const section = main.querySelector('section');
    if (!section) return { error: 'No section' };
    const sticky = section.querySelector('[class*="sticky"]');
    const container = sticky?.querySelector('[class*="grid-cols"]');
    if (!container) return { error: 'No container' };
    
    const children = Array.from(container.children);
    const copyCol = children.find(c => c.className?.includes?.('col-span-6'));
    const imageCol = children.find(c => c.className?.includes?.('col-start-6'));
    
    const containerRect = container.getBoundingClientRect();
    const copyRect = copyCol?.getBoundingClientRect();
    const imageRect = imageCol?.getBoundingClientRect();
    
    return {
      viewport: window.innerWidth,
      container: { left: Math.round(containerRect.left), width: Math.round(containerRect.width) },
      copyCol: copyRect ? { left: Math.round(copyRect.left), width: Math.round(copyRect.width), className: copyCol.className.slice(0, 100) } : 'not found',
      imageCol: imageRect ? { left: Math.round(imageRect.left), width: Math.round(imageRect.width), className: imageCol.className.slice(0, 100) } : 'not found',
    };
  });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.addInitScript(() => { sessionStorage.setItem('ao-splash', '1'); });

  console.log('=== 1440px ===');
  console.log(JSON.stringify(await measure(page, 1440), null, 2));
  
  console.log('\n=== 1920px ===');
  console.log(JSON.stringify(await measure(page, 1920), null, 2));

  await context.close();
  await browser.close();
})();
