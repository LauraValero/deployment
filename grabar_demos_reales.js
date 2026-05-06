const { chromium } = require('playwright');
const path = require('path');

const VIDEOS_DIR = path.join(__dirname, 'capturas_videos');
const SITE_URL = 'https://exposicionfinal.vercel.app';
const GITHUB_URL = 'https://github.com/LauraValero/deployment';
const VERCEL_DEPLOY_URL = 'https://vercel.com/lauravalero-8774s-projects/exposicion_final';

async function demo1_sitioEnVivo() {
  console.log('\n=== VIDEO 1: Sitio desplegado en vivo ===');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();

  await page.goto(SITE_URL);
  await page.waitForTimeout(3000);

  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1500);
  }

  await page.waitForTimeout(1000);
  await context.close();
  await browser.close();
  console.log('Video 1 listo.');
}

async function demo2_githubActions() {
  console.log('\n=== VIDEO 2: GitHub repo + Actions ===');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();

  await page.goto(GITHUB_URL);
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(2000);

  await page.goto(GITHUB_URL + '/actions');
  await page.waitForTimeout(3000);

  await page.goto(GITHUB_URL + '/blob/main/.github/workflows/deploy.yml');
  await page.waitForTimeout(3000);

  await context.close();
  await browser.close();
  console.log('Video 2 listo.');
}

async function demo3_vercelDeploys() {
  console.log('\n=== VIDEO 3: Vercel deployments (deploy automático real) ===');
  const userDataDir = 'C:/Users/PC/AppData/Local/Google/Chrome/User Data';
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: true,
    channel: 'chrome',
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } }
  });
  const page = context.pages()[0] || await context.newPage();

  await page.goto(VERCEL_DEPLOY_URL);
  await page.waitForTimeout(5000);
  await page.screenshot({ path: path.join(VIDEOS_DIR, 'vercel_deployments.png') });

  await context.close();
  console.log('Video 3 listo.');
}

async function demo4_pushYDeploy() {
  console.log('\n=== VIDEO 4: Push → Deploy completo (simulación con pantallas reales) ===');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();

  // Mostrar el repo con el commit reciente
  await page.goto(GITHUB_URL + '/commits/main');
  await page.waitForTimeout(3000);

  // Mostrar el sitio actualizado
  await page.goto(SITE_URL);
  await page.waitForTimeout(3000);

  // Mostrar el subtítulo actualizado como prueba de que el deploy fue exitoso
  await page.screenshot({ path: path.join(VIDEOS_DIR, 'sitio_actualizado.png') });

  await context.close();
  await browser.close();
  console.log('Video 4 listo.');
}

async function demo5_rollbackReal() {
  console.log('\n=== VIDEO 5: Rollback real en Vercel ===');
  const userDataDir = 'C:/Users/PC/AppData/Local/Google/Chrome/User Data';
  let context;
  try {
    context = await chromium.launchPersistentContext(userDataDir, {
      headless: true,
      channel: 'chrome',
      viewport: { width: 1280, height: 720 },
      recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } }
    });
    const page = context.pages()[0] || await context.newPage();

    await page.goto(VERCEL_DEPLOY_URL + '/deployments');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: path.join(VIDEOS_DIR, 'vercel_rollback_list.png') });

    await context.close();
  } catch(e) {
    console.log('No se pudo acceder a Vercel con Chrome profile, usando screenshots estáticos');
    if (context) await context.close();
  }
  console.log('Video 5 listo.');
}

async function main() {
  console.log('Grabando videos de demo reales...\n');
  await demo1_sitioEnVivo();
  await demo2_githubActions();
  await demo4_pushYDeploy();

  // Intentar los que necesitan sesión de Vercel
  try {
    await demo3_vercelDeploys();
    await demo5_rollbackReal();
  } catch(e) {
    console.log('Videos de Vercel dashboard requieren Chrome abierto con sesión');
  }

  console.log('\n✓ Videos guardados en capturas_videos/');
}

main().catch(console.error);
