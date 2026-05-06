const { chromium } = require('playwright');
const path = require('path');
const { execSync } = require('child_process');

const VIDEOS_DIR = path.join(__dirname, 'capturas_videos');
const REPO_DIR = __dirname;

async function video_CICD() {
  console.log('\n=== VIDEO: CI/CD real (push → deploy automático → sitio actualizado) ===');
  const userDataDir = 'C:/Users/PC/AppData/Local/Google/Chrome/User Data';
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    channel: 'chrome',
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } },
    args: ['--profile-directory=Default']
  });
  const page = context.pages()[0] || await context.newPage();

  // 1. Mostrar el sitio ANTES
  await page.goto('https://exposicionfinal.vercel.app');
  await page.waitForTimeout(3000);

  // 2. Mostrar el repo en GitHub (último commit)
  await page.goto('https://github.com/LauraValero/deployment/commits/main');
  await page.waitForTimeout(3000);

  // 3. Hacer un cambio real y push (desde Node)
  console.log('  Haciendo cambio y push...');
  execSync('git add -A && git commit --allow-empty -m "demo: CI/CD en vivo - deploy automático" && git push origin main', { cwd: REPO_DIR, stdio: 'pipe' });
  console.log('  Push hecho!');

  // 4. Mostrar Vercel deployments (building)
  await page.goto('https://vercel.com/lauravalero-8774s-projects/exposicion_final/deployments');
  await page.waitForTimeout(5000);

  // 5. Refrescar para ver "Ready"
  await page.reload();
  await page.waitForTimeout(10000);

  // 6. Ir al sitio actualizado
  await page.goto('https://exposicionfinal.vercel.app');
  await page.waitForTimeout(3000);

  await context.close();
  console.log('Video CI/CD listo!');
}

async function video_Rollback() {
  console.log('\n=== VIDEO: Rollback real en Vercel ===');
  const userDataDir = 'C:/Users/PC/AppData/Local/Google/Chrome/User Data';
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    channel: 'chrome',
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } },
    args: ['--profile-directory=Default']
  });
  const page = context.pages()[0] || await context.newPage();

  // 1. Ir a deployments
  await page.goto('https://vercel.com/lauravalero-8774s-projects/exposicion_final/deployments');
  await page.waitForTimeout(5000);

  // 2. Click en los 3 puntos del deploy anterior (no current)
  const menuButtons = await page.locator('[data-testid="menu-trigger"], button:has(svg)').all();
  // Click en el menú del segundo deployment
  try {
    const threeDotsButtons = await page.locator('button[aria-label]').all();
    if (threeDotsButtons.length > 1) {
      await threeDotsButtons[1].click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(VIDEOS_DIR, 'rollback_menu.png') });
    }
  } catch(e) {
    console.log('  Menu click failed, trying alternative...');
  }

  // 3. Buscar opción de "Promote" o "Redeploy"
  try {
    const promoteBtn = await page.locator('text=Promote to Production').first();
    if (await promoteBtn.isVisible()) {
      await promoteBtn.click();
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(VIDEOS_DIR, 'rollback_confirm.png') });
    }
  } catch(e) {
    console.log('  Promote button not found');
  }

  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(VIDEOS_DIR, 'rollback_result.png') });

  await context.close();
  console.log('Video Rollback listo!');
}

async function video_Preview() {
  console.log('\n=== VIDEO: Preview deployment (crear PR) ===');
  const userDataDir = 'C:/Users/PC/AppData/Local/Google/Chrome/User Data';
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    channel: 'chrome',
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } },
    args: ['--profile-directory=Default']
  });
  const page = context.pages()[0] || await context.newPage();

  // 1. Crear branch y PR desde la terminal
  console.log('  Creando branch y PR...');
  try {
    execSync('git checkout -b feature/demo-preview', { cwd: REPO_DIR, stdio: 'pipe' });
  } catch(e) {}
  execSync('git commit --allow-empty -m "demo: preview deployment para exposición"', { cwd: REPO_DIR, stdio: 'pipe' });
  execSync('git push origin feature/demo-preview', { cwd: REPO_DIR, stdio: 'pipe' });

  // Crear PR con gh
  let prUrl = '';
  try {
    prUrl = execSync('gh pr create --title "Demo: Preview Deployment" --body "Este PR genera un preview deployment automático en Vercel" --head feature/demo-preview --base main', { cwd: REPO_DIR, stdio: 'pipe' }).toString().trim();
    console.log('  PR creado:', prUrl);
  } catch(e) {
    console.log('  PR ya existe o error:', e.message);
    prUrl = 'https://github.com/LauraValero/deployment/pulls';
  }

  // 2. Mostrar el PR en GitHub
  await page.goto(prUrl || 'https://github.com/LauraValero/deployment/pulls');
  await page.waitForTimeout(5000);

  // 3. Esperar a que Vercel genere el preview
  await page.waitForTimeout(10000);
  await page.reload();
  await page.waitForTimeout(5000);
  await page.screenshot({ path: path.join(VIDEOS_DIR, 'preview_pr.png') });

  // 4. Ir a Vercel para ver el preview deployment
  await page.goto('https://vercel.com/lauravalero-8774s-projects/exposicion_final/deployments');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: path.join(VIDEOS_DIR, 'preview_vercel.png') });

  await context.close();

  // Volver a main
  execSync('git checkout main', { cwd: REPO_DIR, stdio: 'pipe' });
  console.log('Video Preview listo!');
}

async function main() {
  console.log('Grabando videos de técnicas reales...\n');
  await video_CICD();
  await video_Rollback();
  await video_Preview();
  console.log('\n✓ Todos los videos de técnicas reales grabados!');
}

main().catch(console.error);
