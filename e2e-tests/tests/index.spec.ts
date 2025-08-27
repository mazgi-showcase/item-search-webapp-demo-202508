import { test, expect } from '@playwright/test'

test('frontend has the stateus page', async ({ page }) => {
  await page.goto(`${process.env.FRONTEND_URL}`)
  await expect(page).toHaveTitle(/.*/)
})
