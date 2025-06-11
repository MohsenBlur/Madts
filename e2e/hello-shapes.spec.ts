import { test, expect } from '@playwright/test'

// drag square to (300,300) and check perimeter

test('square drag updates perimeter', async ({ page }) => {
  await page.goto('/demo/hello-shapes')

  const square = page.locator('.cursor-move').first()
  const box = await square.boundingBox()
  if (!box) throw new Error('square not found')

  await page.mouse.move(box.x + 10, box.y + 10)
  await page.mouse.down()
  await page.mouse.move(310, 310)
  await page.mouse.up()

  await expect(square).toHaveCSS('left', '300px')
  await expect(square).toHaveCSS('top', '300px')
  await expect(page.getByText('Perim: 400 px')).toBeVisible()
})
