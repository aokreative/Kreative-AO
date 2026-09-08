import { test, expect } from '@playwright/test';

const ROUTES = ['/', '/services', '/work', '/contact'];

for (const route of ROUTES) {
  test(`Route ${route} should return 200 and have no broken images`, async ({ page }) => {
    // Collect all image responses
    const imageResponses: Array<{ url: string; status: number }> = [];
    
    page.on('response', (response) => {
      if (response.request().resourceType() === 'image') {
        imageResponses.push({
          url: response.url(),
          status: response.status()
        });
      }
    });

    const response = await page.goto(route);
    expect(response?.status()).toBe(200);

    // Wait for network idle to ensure images are loaded
    await page.waitForLoadState('networkidle');

    // Check for any 404 image responses
    const brokenImages = imageResponses.filter(res => res.status === 404);
    expect(brokenImages).toEqual([]);
  });
}
