const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, 'public', 'videos');
const TEMP_DIR = path.join(__dirname, '.video-temp');
const SIZE = { width: 960, height: 540 };

const BASE_STYLES = `
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: #0d1117; color: #e6edf3;
  font-family: 'Segoe UI', 'Consolas', monospace;
  display: flex; justify-content: center; align-items: center;
  height: 100vh; overflow: hidden;
}
.container { width: 90%; max-width: 880px; }
h2 { color: #58a6ff; font-size: 1.35rem; margin-bottom: 0.8rem; text-align: center; }
.terminal {
  background: #161b22; border: 1px solid #30363d; border-radius: 8px;
  padding: 0.8rem 1rem; font-size: 0.8rem; line-height: 1.7;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}
.terminal-bar {
  display: flex; gap: 6px; align-items: center;
  margin-bottom: 0.6rem; padding-bottom: 0.5rem; border-bottom: 1px solid #30363d;
}
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot-r { background: #ff5f56; } .dot-y { background: #ffbd2e; } .dot-g { background: #27c93f; }
.terminal-title { color: #8b949e; font-size: 0.7rem; margin-left: 8px; }
.prompt { color: #7ee787; } .cmd { color: #e6edf3; } .out { color: #8b949e; }
.ok { color: #3fb950; } .info { color: #58a6ff; } .hl { color: #ffa657; }
.warn { color: #d29922; }
.line { opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; transform: translateY(4px); }
.line.show { opacity: 1; transform: translateY(0); }
.summary {
  margin-top: 0.8rem; padding: 0.6rem 0.8rem;
  background: rgba(56,139,253,0.1); border: 1px solid #1f6feb;
  border-radius: 6px; text-align: center; font-size: 0.85rem; color: #58a6ff;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.pulse { animation: pulse 1.5s ease infinite; }
@keyframes glow { 0%,100%{text-shadow:0 0 8px #3fb950} 50%{text-shadow:0 0 20px #3fb950, 0 0 40px #3fb950} }
.glow { animation: glow 2s ease infinite; }
.bar-bg { background:#21262d; border-radius:4px; height:18px; overflow:hidden; margin:0.3rem 0; }
.bar-fill { background:linear-gradient(90deg,#238636,#3fb950); height:100%; width:0; transition:width 1.5s ease; border-radius:4px; }
.split { display:flex; gap:0.8rem; }
.split > div { flex:1; }
.metrics { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.5rem; margin-top:0.6rem; }
.metric { background:#161b22; border:1px solid #30363d; border-radius:6px; padding:0.5rem; text-align:center; }
.metric-val { font-size:1.3rem; font-weight:bold; }
.metric-label { font-size:0.65rem; color:#8b949e; margin-top:0.2rem; }
.steps { list-style:none; }
.steps li { padding:0.5rem 0.6rem; margin-bottom:0.4rem; background:#161b22; border-left:3px solid #30363d; border-radius:0 6px 6px 0; font-size:0.82rem; }
.steps li.show { border-left-color: #3fb950; }
.steps .step-num { color:#3fb950; font-weight:bold; margin-right:0.5rem; }
.meta-final { text-align:center; font-size:1.1rem; margin-top:1rem; color:#3fb950; font-weight:bold; }
`;

const ANIM_SCRIPT = `
<script>
async function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
async function run(){
  await sleep(400);
  const els=document.querySelectorAll('.line');
  for(const el of els){
    const d=parseInt(el.dataset.d||'400');
    await sleep(d);
    el.classList.add('show');
    if(el.dataset.bar){
      const bar=el.querySelector('.bar-fill');
      if(bar) requestAnimationFrame(()=>bar.style.width=el.dataset.bar);
    }
  }
}
run();
<\/script>`;

function page(title, body, extra = '') {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>${BASE_STYLES}${extra}</style></head><body>
<div class="container"><h2>${title}</h2>${body}</div>${ANIM_SCRIPT}</body></html>`;
}

function termBar(title = 'Terminal') {
  return `<div class="terminal-bar"><span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span><span class="terminal-title">${title}</span></div>`;
}

// ─── VIDEO 1: CI/CD ───
function cicd() {
  return page('CI/CD con validación IA', `
<div class="terminal">${termBar()}
  <div class="line" data-d="400"><span class="prompt">$ </span><span class="cmd">git push origin main</span></div>
  <div class="line" data-d="350"><span class="out">Enumerating objects: 12, done.</span></div>
  <div class="line" data-d="300"><span class="out">remote: Resolving deltas: 100% (8/8)</span></div>
  <div class="line" data-d="300"><span class="out">To github.com:LauraValero/deployment.git</span></div>
  <div class="line" data-d="700">&nbsp;</div>
  <div class="line" data-d="200"><span class="info">━━━ GitHub Actions — Workflow Runs ━━━</span></div>
  <div class="line" data-d="550"><span class="ok">✓</span> feat: add quiz interactivo <span class="out">— 7s</span></div>
  <div class="line" data-d="550"><span class="ok">✓</span> fix: ajustar estilos responsive <span class="out">— 7s</span></div>
  <div class="line" data-d="550"><span class="ok">✓</span> feat: agregar videos demo <span class="out">— 7s</span></div>
  <div class="line" data-d="550"><span class="ok">✓</span> chore: actualizar referencias <span class="out">— 7s</span></div>
  <div class="line" data-d="550"><span class="ok">✓</span> feat: observabilidad con IA <span class="out">— 7s</span></div>
</div>
<div class="line summary" data-d="900"><span class="ok">✓</span> 5 pushes → 5 deploys automáticos → todos exitosos</div>
`);
}

// ─── VIDEO 2: GitOps ───
function gitops() {
  return page('GitOps — El repo es la verdad', `
<div class="line" data-d="500" style="text-align:center;margin-bottom:0.8rem;font-size:0.95rem;">
  <span class="info">Lo que está en Git</span> <span class="hl">=</span> <span class="info">lo que está en producción</span>
</div>
<div class="terminal">${termBar('Commits reales')}
  <div class="line" data-d="500"><span class="hl">3a65ddd</span> <span class="cmd">feat: presentación inicial</span></div>
  <div class="line" data-d="500"><span class="hl">0661c19</span> <span class="cmd">feat: agregar quiz interactivo</span></div>
  <div class="line" data-d="500"><span class="hl">9f43aef</span> <span class="cmd">fix: estilos mobile</span></div>
  <div class="line" data-d="500"><span class="hl">fe6f868</span> <span class="cmd">feat: videos demo + observabilidad</span></div>
</div>
<div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;margin-top:0.8rem;font-size:0.82rem;flex-wrap:wrap;">
  <div class="line" data-d="600" style="padding:0.3rem 0.6rem;background:#161b22;border-radius:4px;border:1px solid #30363d;"><span class="info">git push</span></div>
  <div class="line" data-d="500" style="color:#8b949e;">→</div>
  <div class="line" data-d="500" style="padding:0.3rem 0.6rem;background:#161b22;border-radius:4px;border:1px solid #30363d;"><span class="info">CI detecta</span></div>
  <div class="line" data-d="500" style="color:#8b949e;">→</div>
  <div class="line" data-d="500" style="padding:0.3rem 0.6rem;background:#161b22;border-radius:4px;border:1px solid #30363d;"><span class="info">Build</span></div>
  <div class="line" data-d="500" style="color:#8b949e;">→</div>
  <div class="line" data-d="500" style="padding:0.3rem 0.6rem;background:#161b22;border-radius:4px;border:1px solid #30363d;"><span class="info">Deploy</span></div>
  <div class="line" data-d="500" style="color:#8b949e;">→</div>
  <div class="line" data-d="500" style="padding:0.3rem 0.6rem;background:#238636;border-radius:4px;"><span class="ok glow" style="font-weight:bold;">LIVE</span></div>
</div>
<div class="line summary" data-d="800">Cada commit en main se refleja automáticamente en producción</div>
`);
}

// ─── VIDEO 3: IaC ───
function iac() {
  return page('Infrastructure as Code', `
<div class="split">
  <div>
    <div class="terminal" style="min-height:220px;">${termBar('vercel.json')}
      <div class="line" data-d="400"><span class="out">{</span></div>
      <div class="line" data-d="350"><span class="out">  "buildCommand":</span> <span class="ok">"npm run build"</span>,</div>
      <div class="line" data-d="350"><span class="out">  "outputDirectory":</span> <span class="ok">"dist"</span>,</div>
      <div class="line" data-d="350"><span class="out">  "framework":</span> <span class="ok">"vite"</span>,</div>
      <div class="line" data-d="350"><span class="out">  "installCommand":</span> <span class="ok">"npm ci"</span></div>
      <div class="line" data-d="300"><span class="out">}</span></div>
    </div>
  </div>
  <div>
    <div class="terminal" style="min-height:220px;">${termBar('deploy.yml')}
      <div class="line" data-d="500"><span class="info">on:</span> <span class="cmd">push → main</span></div>
      <div class="line" data-d="400"><span class="info">steps:</span></div>
      <div class="line" data-d="350">  <span class="ok">✓</span> checkout</div>
      <div class="line" data-d="350">  <span class="ok">✓</span> setup-node 20</div>
      <div class="line" data-d="350">  <span class="ok">✓</span> npm ci</div>
      <div class="line" data-d="350">  <span class="ok">✓</span> npm run build</div>
    </div>
  </div>
</div>
<div class="line summary" data-d="800">2 archivos definen TODA la infraestructura — sin clicks manuales</div>
`);
}

// ─── VIDEO 4: Preview/Canary ───
function preview() {
  return page('Preview Deployment (Canary)', `
<div class="terminal">${termBar('Vercel')}
  <div class="line" data-d="400"><span class="info">Paso 1:</span> Crear PR</div>
  <div class="line" data-d="400"><span class="cmd">  feature/demo-preview</span> <span class="out">→</span> <span class="cmd">main</span></div>
  <div class="line" data-d="600">&nbsp;</div>
  <div class="line" data-d="300"><span class="info">Paso 2:</span> Vercel building...</div>
  <div class="line" data-d="200" data-bar="100%"><div class="bar-bg"><div class="bar-fill"></div></div></div>
  <div class="line" data-d="1600"><span class="ok">✓</span> Build completado en <span class="hl">6 segundos</span></div>
  <div class="line" data-d="600">&nbsp;</div>
  <div class="line" data-d="300"><span class="info">Paso 3:</span> Preview URL generada</div>
  <div class="line" data-d="500"><span class="ok">→</span> <span class="hl">exposicionfinal-lg5qox2ws-lauravalero.vercel.app</span></div>
</div>
<div style="display:flex;gap:0.5rem;margin-top:0.8rem;font-size:0.78rem;text-align:center;">
  <div class="line" data-d="600" style="flex:1;padding:0.5rem;background:rgba(35,134,54,0.15);border:1px solid #238636;border-radius:6px;">
    <span class="ok">Producción</span><br><span class="out">intacta ✓</span>
  </div>
  <div class="line" data-d="400" style="flex:1;padding:0.5rem;background:rgba(56,139,253,0.1);border:1px solid #1f6feb;border-radius:6px;">
    <span class="info">Preview</span><br><span class="out">nueva versión</span>
  </div>
  <div class="line" data-d="400" style="flex:1;padding:0.5rem;background:rgba(210,153,34,0.1);border:1px solid #d29922;border-radius:6px;">
    <span class="warn">Riesgo</span><br><span class="out">cero</span>
  </div>
</div>
`);
}

// ─── VIDEO 5: Observabilidad (NUEVO) ───
function observability() {
  return page('Observabilidad con IA (AIOps)', `
<div class="terminal">${termBar('Claude Code')}
  <div class="line" data-d="400"><span class="prompt">$ </span><span class="cmd">claude "revisa si el sitio está funcionando bien"</span></div>
  <div class="line" data-d="700">&nbsp;</div>
  <div class="line" data-d="300"><span class="info">Analizando</span> <span class="hl">exposicionfinal.vercel.app</span><span class="info">...</span></div>
  <div class="line" data-d="600"><span class="ok">✓</span> HTTP 200 — sitio respondiendo</div>
  <div class="line" data-d="500"><span class="ok">✓</span> Tiempo de respuesta: <span class="hl">127ms</span></div>
  <div class="line" data-d="500"><span class="ok">✓</span> Build exitoso — <span class="ok">0 errores</span></div>
  <div class="line" data-d="500"><span class="ok">✓</span> 48 tests pasando</div>
  <div class="line" data-d="500"><span class="ok">✓</span> Último deploy: hace 3 minutos</div>
</div>
<div class="line metrics" data-d="700">
  <div class="metric"><div class="metric-val ok">200</div><div class="metric-label">HTTP Status</div></div>
  <div class="metric"><div class="metric-val hl">127ms</div><div class="metric-label">Latencia</div></div>
  <div class="metric"><div class="metric-val ok">99.9%</div><div class="metric-label">Uptime</div></div>
</div>
<div class="line summary" data-d="800">Claude monitorea logs, detecta anomalías y reporta salud del sitio</div>
`, `
.metrics.show .metric { animation: fadeUp 0.4s ease forwards; }
@keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
`);
}

// ─── VIDEO 6: Meta-Demo ───
function meta() {
  return page('Meta-Demo: técnicas aplicadas', `
<ul class="steps">
  <li class="line" data-d="600"><span class="step-num">1.</span> Claude Code genera código <span class="out">→</span> <span class="info">AI Agents</span></li>
  <li class="line" data-d="800"><span class="step-num">2.</span> git push → GitHub Actions <span class="out">→</span> <span class="info">CI/CD + GitOps + IaC</span></li>
  <li class="line" data-d="800"><span class="step-num">3.</span> Vercel despliega en 7s <span class="out">→</span> <span class="info">Canary / Preview</span></li>
  <li class="line" data-d="800"><span class="step-num">4.</span> Claude analiza logs y salud <span class="out">→</span> <span class="info">Observabilidad con IA</span></li>
  <li class="line" data-d="800"><span class="step-num">5.</span> Sitio live AHORA MISMO <span class="out">→</span> <span class="hl">exposicionfinal.vercel.app</span></li>
</ul>
<div class="line meta-final" data-d="1200">
  <span class="glow">La presentación ES la demo</span>
</div>
<div class="line summary" data-d="800">5 técnicas de deployment con IA — funcionando en este momento</div>
`);
}

const VIDEOS = [
  { name: 'demo_cicd', html: cicd(), wait: 12000 },
  { name: 'demo_gitops', html: gitops(), wait: 14000 },
  { name: 'demo_iac', html: iac(), wait: 12000 },
  { name: 'demo_preview', html: preview(), wait: 13000 },
  { name: 'demo_observability', html: observability(), wait: 13000 },
  { name: 'demo_meta_v2', html: meta(), wait: 14000 },
];

async function generateVideo(browser, { name, html, wait }) {
  console.log(`  Generando ${name}...`);
  const context = await browser.newContext({
    viewport: SIZE,
    recordVideo: { dir: TEMP_DIR, size: SIZE },
  });
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(wait);
  const video = page.video();
  await context.close();
  const target = path.join(OUTPUT_DIR, `${name}.webm`);
  await video.saveAs(target);
  console.log(`  ✓ ${name}.webm`);
}

async function main() {
  console.log('Generando 6 videos con Playwright...\n');

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const v of VIDEOS) {
    await generateVideo(browser, v);
  }

  await browser.close();

  // Cleanup temp dir
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });

  // Remove old rollback video if it exists
  const oldRollback = path.join(OUTPUT_DIR, 'demo_rollback.webm');
  if (fs.existsSync(oldRollback)) {
    fs.unlinkSync(oldRollback);
    console.log('\n  Eliminado demo_rollback.webm (reemplazado por demo_observability.webm)');
  }

  console.log('\n✓ 6 videos generados en public/videos/');
}

main().catch(err => { console.error(err); process.exit(1); });
