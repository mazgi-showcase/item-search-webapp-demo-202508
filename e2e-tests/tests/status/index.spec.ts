import { test, expect } from '@playwright/test'

const SemVerRegex =
  /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/

test('The frontend has the status page, and it has the title.', async ({
  page,
}) => {
  await page.goto(`${process.env.FRONTEND_URL}/status`)

  // <head>
  await expect(page).toHaveTitle(/Status/)
  // </head>

  // <body>
  await expect(page.locator('h1')).toHaveText(/Status/)
  // </body>
})

test('The status page has a card, and it shows the Frontend status.', async ({
  page,
}) => {
  await page.goto(`${process.env.FRONTEND_URL}/status`)

  // https://playwright.dev/docs/selectors#parent-selector
  const statusCard = page
    .locator('h2', { hasText: /^\s*Frontend\s*$/ })
    .locator('..')
  await expect(statusCard).not.toBeNull
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*name:\s*$/ })
      // https://playwright.dev/docs/selectors#xpath-selectors
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(/^\s*frontend\s*$/)
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*name:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).not.toContainText('undef')
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*env:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(new RegExp(`^\\s*${process.env.E2E_TARGET_NODE_ENV}\\s*$`))
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*state:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(/^\s*healthy\s*$/)
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*version:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(SemVerRegex)
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*version:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).not.toContainText('undef')
})

test('The status page has a card, and it shows the BFF status that was acquired via GraphQL.', async ({
  page,
}) => {
  await page.goto(`${process.env.FRONTEND_URL}/status`)

  // BFF (GraphQL) Status
  // https://playwright.dev/docs/selectors#intermediate-matches
  // https://github.com/microsoft/playwright/issues/11522#issuecomment-1029392073
  // const bffStatusCard = page.locator(
  //   'main >> div >> *div >> h2:has-text("BFF")'
  // )
  const statusCard = page
    .locator('h2', { hasText: /^\s*BFF \(GraphQL\)\s*$/ })
    .locator('..')
  await expect(statusCard).not.toBeNull
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*name:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(/^\s*bff\s*$/)
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*name:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).not.toContainText('undef')
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*env:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(new RegExp(`^\\s*${process.env.E2E_TARGET_NODE_ENV}\\s*$`))
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*state:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(/^\s*healthy\s*$/)
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*version:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(SemVerRegex)
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*version:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).not.toContainText('undef')
})

test('The status page has a card, and it shows the BFF status that was acquired via OpenAPI.', async ({
  page,
}) => {
  await page.goto(`${process.env.FRONTEND_URL}/status`)

  // BFF (OpenAPI) Status
  const statusCard = page
    .locator('h2', { hasText: /^\s*BFF \(OpenAPI\)\s*$/ })
    .locator('..')
  await expect(statusCard).not.toBeNull
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*name:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(/^\s*bff\s*$/)
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*name:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).not.toContainText('undef')
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*env:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(new RegExp(`^\\s*${process.env.E2E_TARGET_NODE_ENV}\\s*$`))
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*state:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(/^\s*healthy\s*$/)
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*version:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(SemVerRegex)
  await expect(
    statusCard
      .locator('dt', { hasText: /^\s*version:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).not.toContainText('undef')
})
