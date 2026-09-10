import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  
  const metrics = await page.evaluate(() => {
    // Let's find ANY section with 200vh
    const elements = Array.from(document.querySelectorAll('*'));
    const heroWrapper = elements.find(el => {
      const style = window.getComputedStyle(el);
      return style.height.includes('vh') || el.className.includes('200vh') || el.className.includes('hero');
    });
    
    // Find the actual hero section from page.tsx (it's the first section)
    const sections = Array.from(document.querySelectorAll('section'));
    const heroSection = sections[0];
    const nextSection = sections[1];
    
    // Check for sticky children in the hero section
    const getStickyChild = (el) => {
      if (!el) return null;
      const children = Array.from(el.querySelectorAll('*'));
      return children.find(child => {
        const style = window.getComputedStyle(child);
        return style.position === 'sticky';
      });
    };
    
    const stickyChild = getStickyChild(heroSection);
    
    const heroWrapperHeight = heroSection ? window.getComputedStyle(heroSection).height : null;
    const stickyChildHeight = stickyChild ? window.getComputedStyle(stickyChild).height : null;
    const nextSectionTop = nextSection ? nextSection.getBoundingClientRect().top + window.scrollY : null;
    
    return {
      heroWrapperHeight,
      stickyChildHeight,
      nextSectionTop,
      viewportHeight: window.innerHeight,
      heroClasses: heroSection ? heroSection.className : '',
      allSections: sections.map(s => ({
        classes: s.className,
        height: window.getComputedStyle(s).height,
        top: s.getBoundingClientRect().top + window.scrollY
      }))
    };
  });
  
  console.log(JSON.stringify(metrics, null, 2));
  
  await context.close();
  await browser.close();
})();
