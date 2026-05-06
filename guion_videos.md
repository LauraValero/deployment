# Guión para videos cortos (30-60 seg cada uno)

## Video 1: Deploy automático (CI/CD + GitOps)
**Duración:** 30 seg
**Qué grabar:**
1. Abrir el repo en GitHub
2. Hacer un cambio en una slide (ej: cambiar un título)
3. Hacer push
4. Mostrar que Vercel detecta el push automáticamente
5. Mostrar la URL actualizada con el cambio

**Narración:** "Cada push al repo dispara un deploy automático. No hay servidor que configurar, no hay FTP, no hay SSH. Push → publicado."

---

## Video 2: Preview Deployment (Canary)
**Duración:** 45 seg
**Qué grabar:**
1. Crear una branch nueva
2. Hacer un cambio
3. Crear un Pull Request
4. Mostrar que Vercel genera una URL de preview única
5. Abrir esa URL — es la versión nueva, sin afectar producción

**Narración:** "Antes de mergear, Vercel genera un preview deployment. Es como un canary: la versión nueva existe en paralelo, solo la ves tú. Si algo está mal, no afecta a nadie."

---

## Video 3: Rollback instantáneo
**Duración:** 30 seg
**Qué grabar:**
1. Ir al dashboard de Vercel → Deployments
2. Mostrar la lista de versiones anteriores
3. Click en una versión anterior → "Promote to production"
4. Mostrar que la URL vuelve a la versión vieja

**Narración:** "¿Algo salió mal? Rollback en 2 clicks. La versión anterior sigue disponible y se restaura en segundos."

---

## Video 4: AI Agent desplegando (Claude Code)
**Duración:** 45 seg
**Qué grabar:**
1. Abrir terminal con Claude Code
2. Pedir: "agrega una slide sobre X"
3. Claude modifica el archivo
4. Claude hace commit y push
5. Vercel despliega automáticamente

**Narración:** "Un AI agent crea código, hace commit, y dispara el deploy. El humano solo supervisa. Esto es Agentic DevOps."

---

## Video 5: GitHub Actions (pipeline CI/CD)
**Duración:** 30 seg
**Qué grabar:**
1. Ir a la pestaña Actions del repo
2. Mostrar un workflow ejecutándose
3. Mostrar los pasos: checkout → install → build → deploy
4. Mostrar el ✓ verde

**Narración:** "Cada push ejecuta un pipeline: instala dependencias, construye la app, y si todo pasa, despliega. Si falla, se bloquea."
