// @ts-check
const { test, expect } = require('@playwright/test');

test('homepage has title and screenshot matches golden', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Globe Clock/);

  await expect(page).toHaveScreenshot();
});
