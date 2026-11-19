// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

test.describe('Resoline Techbis — Production End-to-End Hardening Suite', () => {

  test('01: Homepage loads with correct SEO metadata and title', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Resoline Techbis/i);
    
    // Check canonical link
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://resoline.in/');

    // Check OpenGraph description
    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDesc).toContain('Resoline Techbis');
  });

  test('02: Header navigation and Catalogue download button operate cleanly', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Verify brand logo
    const brandImg = page.locator('.brand-logo-img');
    await expect(brandImg).toBeVisible();

    // Verify Catalogue download link exists with single icon
    const catBtn = page.locator('.header__cat-btn');
    await expect(catBtn).toHaveAttribute('href', /RESOLINE CATALOGUE\.pdf/i);
  });

  test('03: "Trusted by Giants" client strip opens Case Study Modal with official quote', async ({ page }) => {
    await page.goto(BASE_URL);

    // Click TATA in client ticker
    const tataBtn = page.locator('[data-review-client="tata"]').first();
    await expect(tataBtn).toBeVisible();
    await tataBtn.click();

    // Verify Case Study Modal opens
    const modal = page.locator('#clientReviewModal');
    await expect(modal).toHaveClass(/open/);

    // Verify official details
    const officialName = page.locator('#crmOfficialName');
    await expect(officialName).toContainText('Er. S. K. Mohapatra');

    // Close modal via Escape
    await page.keyboard.press('Escape');
    await expect(modal).not.toHaveClass(/open/);
  });

  test('04: Automated Reviews River renders and pauses on hover', async ({ page }) => {
    await page.goto(BASE_URL);

    const river = page.locator('#reviewsRiver');
    await expect(river).toBeVisible();

    // Verify river contains multiple cards
    const cards = page.locator('.review-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(4);

    // Hover over river
    await river.hover();
    // River container track should have paused animation
    const track = page.locator('#reviewsRiverTrack');
    await expect(track).toBeVisible();
  });

  test('05: RFQ Modal enforces honeypot, rate limiting, and input validation', async ({ page }) => {
    await page.goto(BASE_URL);

    // Open quote modal
    const quoteBtn = page.locator('[data-open-modal]').first();
    await quoteBtn.click();

    const quoteModal = page.locator('#modal');
    await expect(quoteModal).toHaveClass(/open/);

    // Submit empty form — HTML5 validation blocks
    const submitBtn = page.locator('#modalSubmitBtn');
    await submitBtn.click();
    await expect(page.locator('#modalSuccess')).toBeHidden();

    // Enter invalid short name
    await page.locator('#quoteName').fill('A');
    await page.locator('#quoteEmail').fill('valid@company.com');
    await page.locator('#quotePhone').fill('9876543210');
    await submitBtn.click();

    const errorBox = page.locator('#quoteError');
    await expect(errorBox).toBeVisible();
    await expect(errorBox).toContainText('minimum 2 characters');

    // Enter valid details and submit
    await page.locator('#quoteName').fill('Rohan Verma');
    await submitBtn.click();

    // Verify success modal
    const successBox = page.locator('#modalSuccess');
    await expect(successBox).toBeVisible();
  });

  test('06: Health endpoint returns 200 OK with uptime and security headers', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/health`);
    expect(res.status()).toBe(200);

    const headers = res.headers();
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('SAMEORIGIN');

    const json = await res.json();
    expect(json.status).toBe('ok');
    expect(json.service).toBe('resoline-web');
  });

  test('07: Responsive layout retains stability on mobile viewports', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone viewport
    await page.goto(BASE_URL);

    // Burger button visible on mobile
    const burger = page.locator('#burgerBtn');
    await expect(burger).toBeVisible();

    // Hero title wraps without overflowing
    const heroTitle = page.locator('#heroTitle');
    await expect(heroTitle).toBeVisible();
    const box = await heroTitle.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(375);
  });
});
