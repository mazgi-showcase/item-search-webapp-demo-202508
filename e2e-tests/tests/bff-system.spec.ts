import { test, expect } from '@playwright/test'

test('bff / (GET) is disabled', async ({ page }) => {
  const response = await page.goto(`${process.env.BFF_URL}`)
  expect(response?.status()).toEqual(404)
})

if (
  !process.env.E2E_TARGET_NODE_ENV ||
  process.env.E2E_TARGET_NODE_ENV === 'development'
) {
  test('/swagger is enabled in development', async ({ page }) => {
    const response = await page.goto(`${process.env.BFF_URL}/swagger`)
    expect(response?.ok()).toBeTruthy()
  })
} else {
  test('/swagger is disabled not in development', async ({ page }) => {
    const response = await page.goto(`${process.env.BFF_URL}/swagger`)
    expect(response?.status()).toEqual(404)
  })
}
