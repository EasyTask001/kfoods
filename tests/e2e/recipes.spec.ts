import { test, expect } from '@playwright/test'

test('recipe categories use shareable links and server-rendered results', async ({
  page,
}) => {
  await page.goto('/recipes')
  await page.getByRole('link', { name: 'Rice recipes', exact: true }).click()
  await expect(page).toHaveURL(/category=rice/)
  await expect(page.locator('.recipe-preview')).toHaveCount(3)
  await expect(
    page.getByText('Creamy Moong Dal Soup', { exact: true }),
  ).toHaveCount(0)
  await page.locator('.recipe-preview').first().click()
  await expect(
    page.getByRole('heading', { name: 'Ingredients', exact: true }),
  ).toBeVisible()
})

test('an invalid recipe returns a genuine 404', async ({ request }) => {
  const response = await request.get('/recipes/not-a-recipe')
  expect(response.status()).toBe(404)
})
