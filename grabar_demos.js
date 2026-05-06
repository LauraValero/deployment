const { chromium } = require('playwright');
const path = require('path');
const { execSync } = require('child_process');

const VIDEOS_DIR = path.join(__dirname, 'capturas_videos');
const REPO_DIR = __dirname;
const SITE_URL = 'https://exposicionfinal.vercel.app';
const GITHUB_URL = 'https://github.com/LauraValero/deployment';

async function demo1_sitioEnVivo() {
  console.log('\n=== VIDEO 1: Sitio desplegado en vivo ===');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();

  await page.goto(SITE_URL);
  await page.waitForTimeout(2000);

  // Navegar varias slides
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1500);
  }

  await page.waitForTimeout(1000);
  await context.close();
  await browser.close();
  console.log('Video 1 guardado.');
}

async function demo2_githubRepo() {
  console.log('\n=== VIDEO 2: Repo en GitHub con Actions ===');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();

  // Mostrar el repo
  await page.goto(GITHUB_URL);
  await page.waitForTimeout(3000);

  // Mostrar la estructura de archivos
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(2000);

  // Ir a Actions
  await page.goto(GITHUB_URL + '/actions');
  await page.waitForTimeout(3000);

  // Ir al workflow file
  await page.goto(GITHUB_URL + '/blob/main/.github/workflows/deploy.yml');
  await page.waitForTimeout(3000);

  await context.close();
  await browser.close();
  console.log('Video 2 guardado.');
}

async function demo3_cambioYRedeploy() {
  console.log('\n=== VIDEO 3: Cambio → Push → Deploy (CI/CD) ===');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();

  // Mostrar sitio ANTES del cambio
  await page.goto(SITE_URL);
  await page.waitForTimeout(2000);

  // Pantalla de "haciendo cambio"
  await page.setContent(`
    <div style="background:#1a1a2e;color:#00d4aa;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:monospace;">
      <h1 style="font-size:2em;">Terminal: haciendo un cambio...</h1>
      <pre style="background:#000;padding:2rem;border-radius:10px;font-size:1.1em;color:#4ade80;max-width:80%;">
$ git diff index.html
  - &lt;p class="subtitle"&gt;Las 10 técnicas principales que la industria usa hoy&lt;/p&gt;
  + &lt;p class="subtitle"&gt;10 técnicas que la industria usa hoy — desplegado en vivo&lt;/p&gt;

$ git add index.html
$ git commit -m "update: subtítulo de presentación"
$ git push origin main
      </pre>
    </div>
  `);
  await page.waitForTimeout(4000);

  // Pantalla de "deploy en progreso"
  await page.setContent(`
    <div style="background:#1a1a2e;color:#facc15;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:monospace;">
      <h1 style="font-size:2em;">Vercel: deploy automático</h1>
      <pre style="background:#000;padding:2rem;border-radius:10px;font-size:1.1em;color:#7dd3fc;max-width:80%;">
$ vercel --prod
Uploading [====================] (3.9MB/3.9MB)
Building...
✓ Built in 564ms
Deploying outputs...

✓ Production: https://exposicionfinal.vercel.app [14s]
      </pre>
    </div>
  `);
  await page.waitForTimeout(4000);

  // Mostrar sitio DESPUÉS
  await page.goto(SITE_URL);
  await page.waitForTimeout(2000);

  // Pantalla de éxito
  await page.setContent(`
    <div style="background:#1a1a2e;color:#4ade80;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:monospace;">
      <h1 style="font-size:3em;">✓ Deploy exitoso</h1>
      <p style="font-size:1.5em;color:#ccc;">Push → Build → Deploy en 14 segundos</p>
      <p style="font-size:1.2em;color:#888;">Sin intervención manual</p>
    </div>
  `);
  await page.waitForTimeout(3000);

  await context.close();
  await browser.close();
  console.log('Video 3 guardado.');
}

async function demo4_rollback() {
  console.log('\n=== VIDEO 4: Rollback ===');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();

  // Simular dashboard con versiones
  await page.setContent(`
    <div style="background:#000;color:#fff;height:100vh;padding:2rem;font-family:system-ui;">
      <h2 style="color:#00d4aa;">Vercel Dashboard — Deployments</h2>
      <div style="margin-top:1rem;">
        <div style="background:#111;padding:1rem;border-radius:8px;margin:0.5rem 0;border-left:4px solid #4ade80;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong style="color:#4ade80;">● Production</strong> — v3 (actual)<br>
            <span style="color:#888;font-size:0.9em;">main · 68f6fdb · hace 2 min</span>
          </div>
          <span style="color:#888;font-size:0.8em;">exposicionfinal.vercel.app</span>
        </div>
        <div style="background:#111;padding:1rem;border-radius:8px;margin:0.5rem 0;border-left:4px solid #888;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <span style="color:#888;">○ Preview</span> — v2<br>
            <span style="color:#888;font-size:0.9em;">main · a3b2c1d · hace 15 min</span>
          </div>
          <button style="background:#333;color:#fff;border:1px solid #555;padding:0.3rem 0.8rem;border-radius:4px;cursor:pointer;">Promote to Production</button>
        </div>
        <div style="background:#111;padding:1rem;border-radius:8px;margin:0.5rem 0;border-left:4px solid #888;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <span style="color:#888;">○ Preview</span> — v1<br>
            <span style="color:#888;font-size:0.9em;">main · 1f2e3d4 · hace 1 hora</span>
          </div>
          <button style="background:#333;color:#fff;border:1px solid #555;padding:0.3rem 0.8rem;border-radius:4px;cursor:pointer;">Promote to Production</button>
        </div>
      </div>
    </div>
  `);
  await page.waitForTimeout(3000);

  // Click en "Promote" de v2
  await page.setContent(`
    <div style="background:#000;color:#fff;height:100vh;padding:2rem;font-family:system-ui;">
      <h2 style="color:#00d4aa;">Vercel Dashboard — Deployments</h2>
      <div style="margin-top:1rem;">
        <div style="background:#111;padding:1rem;border-radius:8px;margin:0.5rem 0;border-left:4px solid #facc15;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong style="color:#facc15;">⟳ Rolling back...</strong> — v2<br>
            <span style="color:#888;font-size:0.9em;">Promoviendo v2 a producción...</span>
          </div>
        </div>
      </div>
    </div>
  `);
  await page.waitForTimeout(2500);

  // Rollback exitoso
  await page.setContent(`
    <div style="background:#000;color:#fff;height:100vh;padding:2rem;font-family:system-ui;">
      <h2 style="color:#00d4aa;">Vercel Dashboard — Deployments</h2>
      <div style="margin-top:1rem;">
        <div style="background:#111;padding:1rem;border-radius:8px;margin:0.5rem 0;border-left:4px solid #4ade80;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong style="color:#4ade80;">● Production</strong> — v2 (rollback exitoso)<br>
            <span style="color:#888;font-size:0.9em;">main · a3b2c1d · rollback hace 3 seg</span>
          </div>
          <span style="color:#4ade80;font-size:0.8em;">✓ Restaurado en 2 segundos</span>
        </div>
      </div>
      <div style="margin-top:2rem;text-align:center;">
        <p style="color:#4ade80;font-size:1.5em;">✓ Rollback completado</p>
        <p style="color:#888;">Versión anterior restaurada sin downtime</p>
      </div>
    </div>
  `);
  await page.waitForTimeout(3000);

  await context.close();
  await browser.close();
  console.log('Video 4 guardado.');
}

async function demo5_previewDeploy() {
  console.log('\n=== VIDEO 5: Preview Deployment (Canary) ===');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();

  // Crear branch y PR
  await page.setContent(`
    <div style="background:#1a1a2e;color:#00d4aa;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:monospace;">
      <h1 style="font-size:2em;">Creando Preview Deployment</h1>
      <pre style="background:#000;padding:2rem;border-radius:10px;font-size:1.1em;color:#4ade80;max-width:80%;">
$ git checkout -b feature/nueva-slide
$ # ... hacer cambios ...
$ git push origin feature/nueva-slide
$ gh pr create --title "Agrega slide de demo"

Creating pull request...
✓ Pull Request #1 created
      </pre>
    </div>
  `);
  await page.waitForTimeout(4000);

  // Vercel genera preview
  await page.setContent(`
    <div style="background:#000;color:#fff;height:100vh;padding:2rem;font-family:system-ui;">
      <h2 style="color:#00d4aa;">GitHub Pull Request #1</h2>
      <div style="background:#111;padding:1.5rem;border-radius:8px;margin-top:1rem;">
        <h3 style="color:#fff;">Agrega slide de demo</h3>
        <p style="color:#888;">feature/nueva-slide → main</p>
        <div style="margin-top:1rem;padding:1rem;background:#0d1117;border-radius:6px;border:1px solid #333;">
          <p style="color:#4ade80;margin:0.3rem 0;">✓ Build passed</p>
          <p style="color:#4ade80;margin:0.3rem 0;">✓ Deploy Preview ready</p>
          <p style="color:#7dd3fc;margin:0.5rem 0;font-size:0.9em;">
            🔗 Preview: https://exposicionfinal-git-feature-nueva-slide.vercel.app
          </p>
          <p style="color:#888;font-size:0.8em;margin-top:0.5rem;">
            ↑ Esta URL muestra la versión nueva SIN afectar producción
          </p>
        </div>
      </div>
    </div>
  `);
  await page.waitForTimeout(4000);

  // Comparación
  await page.setContent(`
    <div style="background:#1a1a2e;height:100vh;display:flex;font-family:system-ui;">
      <div style="flex:1;border-right:2px solid #333;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;">
        <h3 style="color:#4ade80;">Producción (usuarios)</h3>
        <p style="color:#888;">exposicionfinal.vercel.app</p>
        <p style="color:#ccc;font-size:0.9em;">Versión estable, sin cambios</p>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;">
        <h3 style="color:#facc15;">Preview (solo equipo)</h3>
        <p style="color:#888;">...-git-feature-nueva-slide.vercel.app</p>
        <p style="color:#ccc;font-size:0.9em;">Versión nueva, para revisar</p>
      </div>
    </div>
  `);
  await page.waitForTimeout(4000);

  await context.close();
  await browser.close();
  console.log('Video 5 guardado.');
}

async function main() {
  console.log('Grabando videos de demo...\n');
  await demo1_sitioEnVivo();
  await demo2_githubRepo();
  await demo3_cambioYRedeploy();
  await demo4_rollback();
  await demo5_previewDeploy();
  console.log('\n✓ Todos los videos guardados en capturas_videos/');
}

main().catch(console.error);
