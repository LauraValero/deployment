export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Un equipo configuro CI/CD con validacion IA. Un desarrollador hace push de un hotfix urgente a las 2am. La IA detecta una vulnerabilidad SQL injection en el codigo. Que deberia pasar?",
    options: [
      "Se despliega igual porque es urgente y el desarrollador asume el riesgo",
      "La IA bloquea el deploy, el desarrollador debe corregir la vulnerabilidad antes de que pase al merge",
      "La IA corrige la vulnerabilidad automaticamente y despliega sin notificar",
      "Se despliega a un entorno de staging y se revisa en horario laboral"
    ],
    correct: 1,
    technique: "CI/CD con validacion IA",
    explanation: "La urgencia no justifica saltar la validacion. La IA actua como gate de seguridad: bloquea el merge si detecta vulnerabilidades, sin importar la hora ni la urgencia."
  },
  {
    id: 2,
    question: "En un equipo que usa GitOps, un SRE modifica manualmente la configuracion de un balanceador de carga directamente en el servidor de produccion para resolver una caida. Que pasa despues?",
    options: [
      "El cambio manual se mantiene porque fue hecho por un SRE con permisos",
      "El operador GitOps detecta la diferencia con el repo y revierte el cambio manual",
      "Git se actualiza automaticamente con el cambio que hizo el SRE",
      "El sistema se apaga hasta que alguien haga commit del cambio"
    ],
    correct: 1,
    technique: "GitOps",
    explanation: "En GitOps el repo es la unica fuente de verdad. El operador (ArgoCD, Flux) reconcilia continuamente: si el estado real difiere del repo, lo revierte. El cambio correcto es hacer commit en Git."
  },
  {
    id: 3,
    question: "Una empresa tiene su infraestructura definida en archivos Terraform y deploy.yml versionados en Git. Un nuevo ingeniero pregunta por que no simplemente configuran los servidores desde el dashboard de AWS. Cual es el argumento mas fuerte a favor de IaC?",
    options: [
      "Es mas rapido configurar desde el dashboard porque tiene interfaz grafica",
      "IaC permite reproducir, auditar y versionar la infraestructura exacta; un click manual no deja rastro",
      "IaC es obligatorio por ley en todos los paises",
      "El dashboard de AWS no permite crear servidores, solo monitorearlos"
    ],
    correct: 1,
    technique: "Infrastructure as Code",
    explanation: "IaC no es solo automatizacion: es trazabilidad. Cada cambio queda en el historial de Git, se puede reproducir en otro entorno identico, y se puede auditar quien cambio que y cuando."
  },
  {
    id: 4,
    question: "Netflix despliega una nueva version de su servicio de recomendaciones. La envia al 5% del trafico y la IA monitorea metricas. Despues de 10 minutos, la latencia sube un 40% en ese 5%. Que deberia hacer el sistema?",
    options: [
      "Esperar 24 horas para confirmar que el problema es real",
      "Escalar al 50% para obtener mas datos estadisticos",
      "Revertir automaticamente al 0% y alertar al equipo",
      "Reiniciar los servidores del 5% y volver a intentar"
    ],
    correct: 2,
    technique: "Canary Deployments",
    explanation: "Un aumento del 40% en latencia en canary es senal clara de regresion. El sistema debe revertir automaticamente para proteger a los usuarios y notificar al equipo para investigar."
  },
  {
    id: 5,
    question: "Un equipo usa Blue-Green deployment. El entorno Green (nuevo) paso todas las pruebas automatizadas pero al recibir trafico real, un endpoint critico devuelve errores 500. Que ventaja especifica de Blue-Green permite resolver esto en segundos?",
    options: [
      "Blue-Green permite editar el codigo directamente en produccion",
      "Blue (la version anterior) sigue intacto y listo; solo se reapunta el balanceador de vuelta",
      "Green se reinicia automaticamente hasta que funcione",
      "Se fusionan Blue y Green en un tercer entorno"
    ],
    correct: 1,
    technique: "Blue-Green Deployments",
    explanation: "Blue nunca se toco. El rollback es instantaneo porque solo cambia el routing del balanceador de carga de Green a Blue. No hay rebuild, no hay redeploy."
  },
  {
    id: 6,
    question: "Spotify quiere lanzar un rediseno de su pantalla de inicio. El codigo ya esta en produccion pero desactivado. Deciden activarlo solo para usuarios en Suecia durante una semana. Que tecnica permite esto sin redesplegar?",
    options: [
      "Canary deployment con restriccion geografica",
      "Feature flags con segmentacion por region",
      "Blue-Green con dos versiones simultaneas",
      "Un branch separado de Git para usuarios suecos"
    ],
    correct: 1,
    technique: "Feature Flags",
    explanation: "Feature flags desacoplan el deploy del release. El codigo ya esta desplegado pero apagado. Se activa por segmentos (region, %, usuario) sin tocar el pipeline de deploy."
  },
  {
    id: 7,
    question: "Un sistema genera 5000 alertas diarias. El equipo de operaciones las ignora casi todas por fatiga. Implementan AIOps. Cual es el resultado esperado y por que?",
    options: [
      "Se eliminan todas las alertas para reducir estres",
      "Se reducen a ~100 alertas accionables porque la IA correlaciona eventos y filtra ruido",
      "Se envian las 5000 alertas a un canal diferente de Slack",
      "Se aumentan a 10000 alertas con mas detalle para mejor cobertura"
    ],
    correct: 1,
    technique: "Observabilidad con IA (AIOps)",
    explanation: "AIOps no elimina alertas: las correlaciona. Agrupa las relacionadas, descarta las irrelevantes y prioriza las accionables. El resultado es ~95% menos ruido, no menos visibilidad."
  },
  {
    id: 8,
    question: "A las 3am un pod de Kubernetes empieza a consumir 95% de memoria y deja de responder health checks. No hay nadie del equipo despierto. Que mecanismo resuelve esto sin intervencion humana?",
    options: [
      "Chaos Engineering inyecta mas fallos para testear resiliencia",
      "Feature flags desactivan la funcionalidad problematica",
      "Self-healing: Kubernetes detecta el fallo, mata el pod y levanta uno nuevo automaticamente",
      "GitOps revierte el ultimo commit"
    ],
    correct: 2,
    technique: "Self-Healing Deployments",
    explanation: "Kubernetes usa liveness/readiness probes. Si un pod falla health checks, lo mata y crea uno nuevo. Es self-healing basico: deteccion + correccion automatica sin humanos."
  },
  {
    id: 9,
    question: "Un equipo empezo usando HITL (Human-in-the-Loop) para sus deploys con IA. Despues de 6 meses sin incidentes, quieren darle mas autonomia a la IA. Cual es la progresion correcta segun las mejores practicas?",
    options: [
      "Saltar directo a HOOTL (Human-out-of-the-Loop) porque ya llevan 6 meses",
      "Pasar a HOTL (Human-on-the-Loop): la IA ejecuta, el humano supervisa y puede intervenir",
      "Volver a deploy manual porque la IA nunca debe tener autonomia",
      "Eliminar al humano del proceso y confiar 100% en la IA"
    ],
    correct: 1,
    technique: "Niveles de supervision humana",
    explanation: "La progresion es HITL → HOTL → HOOTL. Se escala gradualmente segun confianza demostrada. HOTL es el paso intermedio: la IA actua pero el humano supervisa y puede frenar."
  },
  {
    id: 10,
    question: "Netflix ejecuta Chaos Monkey regularmente en produccion. Un gerente nuevo pregunta: para que romper cosas a proposito si todo funciona bien? Cual es la justificacion tecnica?",
    options: [
      "Es un requisito legal para empresas de streaming",
      "Verifica que self-healing, rollback y alertas funcionan antes de una falla real, no durante",
      "Reduce costos de infraestructura al apagar servidores innecesarios",
      "Entrena a los ingenieros para que trabajen bajo presion"
    ],
    correct: 1,
    technique: "Chaos Engineering",
    explanation: "Chaos Engineering es un simulacro controlado. Mejor descubrir que tu rollback no funciona un martes a las 2pm que un sabado a las 3am con millones de usuarios afectados."
  }
]

export function getQuestionCount() {
  return QUIZ_QUESTIONS.length
}

export function getQuestionById(id) {
  return QUIZ_QUESTIONS.find(q => q.id === id) || null
}
