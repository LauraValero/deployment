# Técnicas de Deployment con IA — Documento de Soporte

**Universidad del Valle · Desarrollo Aumentado con IA · 2026**
**Autores:** Iader, Jefferson, Laura

---

## Introducción

El despliegue (deployment) de software ha evolucionado de ser un proceso manual y arriesgado a un flujo automatizado donde la Inteligencia Artificial toma decisiones en tiempo real. Este documento sustenta las 10 técnicas principales presentadas en la exposición, organizadas en tres fases: pre-deploy, deploy y post-deploy.

---

## Fase 1: PRE-DEPLOY

### 1. CI/CD con validación IA

**CI (Continuous Integration)** es la práctica de integrar código frecuentemente y ejecutar validaciones automáticas en cada push. **CD (Continuous Deployment)** extiende esto para que, si las validaciones pasan, el código se publique automáticamente sin intervención humana [1].

La incorporación de IA en estos pipelines permite que modelos de lenguaje revisen el código buscando bugs, vulnerabilidades y regresiones que los tests tradicionales no capturan. GitHub reporta que su herramienta Copilot ha realizado más de 60 millones de revisiones de código automatizadas, detectando problemas en aproximadamente el 30% de los Pull Requests antes del merge [9].

Herramientas: GitHub Actions, GitLab CI, Jenkins, CircleCI, CodeRabbit.

### 2. GitOps

GitOps es un paradigma operacional donde el repositorio Git es la única fuente de verdad para el estado deseado de la infraestructura y las aplicaciones [1][3]. Cualquier cambio en producción debe pasar primero por Git. Si el estado real diverge del declarado en el repositorio, herramientas como ArgoCD o Flux reconcilian automáticamente, revirtiendo cambios no autorizados.

La IA potencia GitOps al detectar drift (divergencia entre estado declarado y real), validar manifiestos contra políticas de seguridad, y aprobar o rechazar cambios basándose en análisis de riesgo [1].

Herramientas: ArgoCD, Flux, Vercel, Terraform.

### 3. Infrastructure as Code con IA

Infrastructure as Code (IaC) permite definir infraestructura como archivos versionables. Con IA, el operador puede describir la infraestructura en lenguaje natural y obtener configuraciones generadas automáticamente con mejores prácticas, seguridad y estimaciones de costo [3][6].

Los LLMs pueden generar archivos Terraform, Docker Compose, Kubernetes manifests, y configuraciones de cloud providers a partir de descripciones en lenguaje natural, reduciendo significativamente la barrera de entrada para la gestión de infraestructura [6].

Herramientas: Pulumi AI, Terraform con Copilot, Claude Code.

---

## Fase 2: DEPLOY

### 4. Canary Deployments con IA

En un canary deployment, la nueva versión se expone inicialmente a un porcentaje pequeño del tráfico (típicamente 5-10%). La IA monitorea métricas clave (latencia p99, tasa de error, throughput) comparándolas estadísticamente con el baseline. Si detecta degradación, ejecuta rollback automático; si las métricas se mantienen estables, escala progresivamente hasta el 100% [1][10].

Netflix implementa esto con Kayenta, su sistema de canary analysis que utiliza análisis estadístico automatizado para determinar si un canary es exitoso o debe revertirse [10].

Herramientas: Netflix Kayenta, Vercel Preview, Google Cloud Deploy, Flagger.

### 5. Blue-Green Deployments

Se mantienen dos entornos de producción idénticos: blue (versión actual) y green (versión nueva). La IA ejecuta validaciones avanzadas en green (no solo HTTP 200, sino queries de negocio, coherencia de datos, tiempos de respuesta) y decide cuándo redirigir todo el tráfico. Blue permanece activo para rollback instantáneo [1].

En Kubernetes, esto se implementa con servicios que apuntan a diferentes conjuntos de pods, permitiendo el switch de tráfico en segundos [3].

Herramientas: AWS Elastic Beanstalk, Kubernetes services, Azure Deployment Slots.

### 6. Feature Flags + Progressive Delivery

Los feature flags permiten desplegar código que está desactivado por defecto. La IA decide a quién y cuándo activarle funcionalidades nuevas basándose en segmentación de usuarios, métricas de estabilidad y análisis de impacto [11].

Esto permite "desplegar sin desplegar": el código está en producción pero invisible hasta que la IA determina que es seguro exponerlo. Empresas como Netflix, Spotify y Meta utilizan esta técnica para cada nuevo feature que lanzan [10][11].

Herramientas: LaunchDarkly, Split.io, Unleash, Flagsmith.

---

## Fase 3: POST-DEPLOY

### 7. Observabilidad con IA (AIOps)

AIOps (Artificial Intelligence for IT Operations) aplica IA a la observabilidad del sistema. Modelos entrenados en patrones normales de logs, métricas y traces detectan anomalías post-deploy, distinguiendo entre errores preexistentes y nuevos introducidos por el despliegue [1][12].

Splunk reporta que su plataforma AIOps reduce el ruido de alertas de aproximadamente 5000 alertas diarias a ~100 verdaderamente accionables, una reducción del 95% [12]. Esto permite a los equipos enfocarse en problemas reales en lugar de ahogarse en falsos positivos.

Herramientas: Datadog AI, New Relic AI, Splunk AIOps, Dynatrace Davis AI.

### 8. Self-Healing Deployments

Un sistema self-healing detecta fallos post-deploy (health checks fallando, spikes en tasa de error, OOM kills), diagnostica la causa raíz, y ejecuta acciones correctivas automáticamente: rollback, restart con más recursos, o incluso hotfix automático [1][3].

Kubernetes implementa self-healing de forma nativa con liveness probes, readiness probes y restart policies. La IA extiende esto con diagnóstico inteligente que va más allá de "reiniciar y esperar" [3].

Herramientas: Kubernetes, AWS Auto Scaling, PagerDuty AIOps.

### 9. Rollback Automático con IA

El motor de decisión de rollback pondera múltiples señales en tiempo real: tasa de error, percentiles de latencia, métricas de negocio (revenue, conversiones), reportes de usuarios. Utiliza árboles de decisión entrenados en incidentes históricos para tomar la decisión óptima: rollback inmediato vs. wait-and-observe vs. hotfix-forward [1][5].

A diferencia de un humano que tarda minutos en evaluar la situación, la IA responde en segundos, minimizando el impacto en usuarios.

Herramientas: ArgoCD, Vercel, Spinnaker, AWS CodeDeploy.

### 10. Chaos Engineering con IA

Chaos engineering consiste en inyectar fallas controladas en producción para verificar que los mecanismos de resiliencia (self-healing, rollback, alertas) funcionen correctamente. La IA potencia esto seleccionando inteligentemente qué experimentos ejecutar, prediciendo el blast radius, y analizando los resultados automáticamente [10].

Netflix popularizó esta práctica con Chaos Monkey, que aleatoriamente termina instancias en producción para verificar que el sistema se recupera sin impacto al usuario [10].

Herramientas: Netflix Chaos Monkey, Gremlin, Litmus, AWS Fault Injection Simulator.

---

## Transversal: AI Agents en Pipelines

Los AI Agents representan la evolución más reciente (2025-2026). Son agentes autónomos capaces de orquestar todo el pipeline: analizar requisitos, implementar código, ejecutar tests, configurar infraestructura y desplegar — todo con supervisión humana mínima [2][7][8].

ThoughtWorks lo denomina "Agentic DevOps" en su Technology Radar Vol. 34, identificándolo como una de las tendencias tecnológicas más significativas de 2025 [11]. GitHub ha integrado agentes en Actions que pueden planificar y ejecutar tareas complejas de CI/CD [9].

Claude Code es un ejemplo de AI agent que puede crear proyectos, configurar pipelines, y ejecutar deploys completos desde la terminal [8]. Esta misma presentación fue cocreada usando esta herramienta.

Herramientas: GitHub Copilot Agents, Claude Code, Devin, OpenHands.

---

## Datos clave de la industria

| Dato | Fuente |
|------|--------|
| 60M+ code reviews automatizadas con IA | GitHub [9] |
| 95% reducción en ruido de alertas con AIOps | Splunk [12] |
| 70% de Fortune 500 usa IA en pipelines de deploy | ThoughtWorks [11] |
| Netflix: múltiples deploys/día con canary + chaos | Netflix Tech Blog [10] |
| Google: 0 rollbacks manuales en servicios con AI-monitoring | Zhang et al. [1] |

---

## ¿Quién usa qué?

| Empresa | Técnicas principales | Ref. |
|---------|---------------------|------|
| Google | CI/CD con IA, Canary automático, SRE con ML | [1] |
| Netflix | Canary (Kayenta), Chaos Monkey, Progressive delivery | [10] |
| Meta | Feature flags, AI code review, deploys continuos | [11] |
| GitHub/Microsoft | Copilot Agents, GitOps, AI en Actions | [9] |
| Spotify | Feature flags, Progressive rollout | [11] |

---

## Referencias (formato IEEE)

[1] Y. Zhang, R. Jia, H. Jia, B. Wu, S. Liu, Z. Yang, M. Wu, S. Hu, K. Yu, and H. Li, "A Survey of AIOps in the Era of Large Language Models," *J. ACM*, vol. 37, no. 4, art. 111, Aug. 2025. arXiv:2507.12472.

[2] Y. Liu et al., "Flow of Action: LLM-Based Agentic Workflows for Web Tasks," in *Proc. The Web Conference (WWW)*, 2025.

[3] X. Wang et al., "KubeIntellect: AI-Driven Kubernetes Cluster Management," arXiv, 2025.

[4] R. Chen et al., "CSR-Bench: Benchmarking LLM-Based Code Review," in *Proc. NAACL*, 2025.

[5] C. Zhang et al., "Agentless: Demystifying LLM-Based Software Engineering Agents," in *Proc. ACM FSE*, 2025.

[6] M. Li et al., "The MCP Landscape: Composing AI Tools at Scale," *ACM Trans. Softw. Eng. Methodol. (TOSEM)*, 2025.

[7] F. Braun et al., "AI IDEs vs. Autonomous Agents: An Empirical Study of Developer Productivity," in *Proc. MSR*, 2026.

[8] A. Chen et al., "A Dive into Claude Code: Architecture and Capabilities of an AI Coding Agent," arXiv, 2026.

[9] GitHub, "GitHub Copilot: AI-Powered Code Review at Scale," *GitHub Blog*, 2025. [Online]. Available: https://github.blog/

[10] Netflix Technology Blog, "Automated Canary Analysis and Chaos Engineering at Netflix," 2024. [Online]. Available: https://netflixtechblog.com/

[11] ThoughtWorks, "Technology Radar Volume 34," 2025. [Online]. Available: https://www.thoughtworks.com/radar

[12] Splunk, "AIOps: Transforming IT Operations with Artificial Intelligence," *Splunk Platform Documentation*, 2025. [Online]. Available: https://www.splunk.com/
