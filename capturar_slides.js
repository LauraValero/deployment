const { chromium } = require('playwright');
const path = require('path');

const CAPTURAS_DIR = path.join(__dirname, 'capturas_videos');
const URL = 'http://localhost:3000';

async function capturarSlides() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: CAPTURAS_DIR, size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();

  await page.goto(URL);
  await page.waitForSelector('.reveal.ready');
  await page.waitForTimeout(1000);

  const totalSlides = await page.evaluate(() => {
    return document.querySelectorAll('.slides > section').length;
  });

  console.log(`Total slides: ${totalSlides}`);

  for (let i = 0; i < totalSlides; i++) {
    await page.screenshot({
      path: path.join(CAPTURAS_DIR, `slide_${String(i + 1).padStart(2, '0')}.png`)
    });
    console.log(`Captura: slide_${String(i + 1).padStart(2, '0')}.png`);

    if (i < totalSlides - 1) {
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(800);
    }
  }

  await page.waitForTimeout(1000);
  await context.close();
  await browser.close();

  console.log('\nListo! Pantallazos y video en: capturas_videos/');
}

capturarSlides().catch(console.error);
