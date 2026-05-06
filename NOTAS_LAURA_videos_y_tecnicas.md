# Notas para Laura: Videos y Técnicas

## Qué se hizo en cada video

### 1. `demo_cicd.webm` — CI/CD con validación IA
**Técnica demostrada:** Continuous Integration / Continuous Deployment
**Qué muestra el video:**
- Terminal simulada haciendo `git push origin main`
- Lista de workflow runs en GitHub Actions apareciendo uno a uno
- Cada run con check verde (✓) mostrando que pasó
- Datos REALES: los 5 commits reales del repo con sus mensajes y tiempos (7s por deploy)
- Resumen final: "5 pushes → 5 deploys automáticos → todos exitosos"

**Cómo funciona en nuestro proyecto:**
- El archivo `.github/workflows/deploy.yml` define el pipeline
- Cada vez que haces `git push`, GitHub Actions ejecuta: checkout → setup node → npm ci → npm run build
- Si todo pasa, Vercel (conectado al repo) despliega automáticamente
- Tiempo real de deploy: ~7 segundos

---

### 2. `demo_gitops.webm` — GitOps
**Técnica demostrada:** El repositorio Git como única fuente de verdad
**Qué muestra el video:**
- Concepto: "Lo que está en Git = lo que está en producción"
- Lista de commits REALES (3a65ddd, 0661c19, 9f43aef, fe6f868)
- Flujo animado: git push → CI detecta → Build → Deploy → LIVE
- Indicador "LIVE" con glow pulsante

**Cómo funciona en nuestro proyecto:**
- Vercel está conectado directamente al repo `LauraValero/deployment`
- Nadie puede cambiar producción sin hacer commit — el repo ES la verdad
- Si algo se cambiara manualmente en Vercel, el siguiente push lo sobreescribiría

---

### 3. `demo_iac.webm` — Infrastructure as Code
**Técnica demostrada:** Infraestructura definida como archivos de código
**Qué muestra el video:**
- Panel izquierdo: `vercel.json` (buildCommand, outputDirectory, framework)
- Panel derecho: `.github/workflows/deploy.yml` (el pipeline completo)
- Los dos archivos aparecen secuencialmente
- Resumen: "Estos archivos definen TODO: cómo se construye, dónde se despliega, qué se valida"

**Cómo funciona en nuestro proyecto:**
- `vercel.json`: le dice a Vercel cómo construir (npm run build), qué carpeta publicar (dist), framework (vite)
- `deploy.yml`: le dice a GitHub cuándo correr (on: push), qué hacer (checkout, node, build)
- No se necesitó ningún click manual en dashboards — todo se define en estos 2 archivos

---

### 4. `demo_preview.webm` — Preview/Canary Deployment
**Técnica demostrada:** Cada PR genera su propia URL de preview sin afectar producción
**Qué muestra el video:**
- Paso 1: Crear PR (feature/demo-preview → main) con progress bar
- Paso 2: Vercel hace build en 6 segundos
- Paso 3: URL de Preview generada (la URL REAL: exposicionfinal-lg5qox2ws-...)
- Resultado: "Versión nueva accesible SIN tocar producción"
- Diagrama: Producción intacta | Preview: nueva versión | Sin riesgo

**Cómo funciona en nuestro proyecto:**
- Se creó el PR #1 (branch feature/demo-preview)
- Vercel automáticamente generó un deployment de tipo "Preview"
- La URL preview es diferente a la de producción
- Se puede probar sin que los usuarios de producción vean cambios

---

### 5. `demo_rollback.webm` — Rollback instantáneo
**Técnica demostrada:** Revertir a cualquier versión anterior sin downtime
**Qué muestra el video:**
- Tabla de deployments (datos REALES de `vercel ls`) apareciendo fila por fila
- 8 versiones disponibles con estado "Ready"
- Indicador de cuál es la versión actual
- Animación de "Rollback" señalando una versión anterior
- Resultado: "Rollback completado — Tiempo total: <1 segundo — sin downtime"

**Cómo funciona en nuestro proyecto:**
- Vercel guarda CADA deployment como una versión inmutable
- `vercel ls` muestra 8 versiones listas
- Para hacer rollback: se promueve un deployment anterior como producción
- Es instantáneo porque el build ya está hecho — solo cambia el routing

---

### 6. `demo_meta.webm` — Flujo completo (Meta-Demo)
**Técnica demostrada:** Todas las técnicas juntas en un solo flujo
**Qué muestra el video:**
- 5 pasos apareciendo secuencialmente:
  1. Claude Code genera código → AI Agents
  2. git push → GitHub Actions → CI/CD + GitOps + IaC
  3. Vercel despliega en 7s → Canary + Deploy automático
  4. 8 versiones para rollback → Rollback automático
  5. Sitio live AHORA MISMO → Meta-demo
- Final con pulso: "La presentación ES la demo"

---

## Técnicas que NO tienen video (son conceptuales)

### Blue-Green Deployments
- No se puede demostrar directamente aquí porque necesitas 2 entornos idénticos
- Vercel internamente usa algo similar (cada deploy es un entorno nuevo)
- En la presentación se explica con el diagrama 🔵 Blue ⇄ 🟢 Green

### Feature Flags
- No se implementó en este proyecto (necesitaría LaunchDarkly o similar)
- Es conceptual: el código está desplegado pero "apagado" hasta que la IA decide activarlo

### Observabilidad / AIOps
- Necesitaría Datadog o New Relic — no aplica a un sitio estático
- Se explica con datos duros (reduce 5000 alertas → 100)

### Self-Healing
- Necesitaría Kubernetes con auto-restart
- Se explica conceptualmente ("nadie se despierta a las 3am")

### Chaos Engineering
- Necesitaría Netflix Chaos Monkey o Gremlin
- Es conceptual: "romper cosas a propósito para verificar que el sistema se recupera"

---

## Resumen de lo que se hizo técnicamente

1. **Playwright** grabó las animaciones como video (recordVideo API)
2. Cada video es una página HTML con **animaciones CSS** (@keyframes) que muestran los datos reales
3. Los datos son reales: commits, URLs de Vercel, tiempos de build — todo extraído con `gh` CLI y `vercel ls`
4. Los videos se sirven desde `public/videos/` (Vite los copia tal cual al `dist/`)
5. En el HTML usan `autoplay muted loop` para que se reproduzcan solos sin audio
6. El push automáticamente despliega via Vercel (GitOps en acción)
