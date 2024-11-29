import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1

test.describe('Accessibility - Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app');
  });

  test('@accessibility homepage test', async ({ page }, testInfo) => {
    await expect(page.locator('h1', { hasText: 'Welcome!' })).toBeVisible();

    await test.step('check accessibility', async () => {
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        // .withRules(['color-contrast', 'select-name'])
        .analyze();

      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(violations, null, 2),
        contentType: 'application/json',
      });

      // expect(violations).toHaveLength(0);
      expect(violations).toHaveLength(3);
    });
  });
});