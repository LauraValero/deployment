export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "En CI/CD con validacion IA, que pasa si la IA detecta un bug en tu PR?",
    options: [
      "Se despliega igual porque la IA no decide",
      "Se bloquea el deploy hasta que se corrija",
      "Se elimina el repositorio automaticamente",
      "Se notifica al CEO de la empresa"
    ],
    correct: 1,
    technique: "CI/CD con validacion IA",
    explanation: "La IA actua como gate: si detecta bugs o vulnerabilidades, bloquea el merge y el deploy hasta que se corrija."
  },
  {
    id: 2,
    question: "En GitOps, cual es la unica fuente de verdad del estado del sistema?",
    options: [
      "El servidor de produccion",
      "El dashboard de monitoreo",
      "El repositorio Git",
      "La memoria del SRE de turno"
    ],
    correct: 2,
    technique: "GitOps",
    explanation: "En GitOps, el repo Git define el estado deseado. Si alguien cambia algo a mano en el servidor, el operador lo revierte para que coincida con Git."
  },
  {
    id: 3,
    question: "Que significa Infrastructure as Code (IaC)?",
    options: [
      "Escribir codigo en servidores fisicos",
      "Describir la infraestructura en archivos versionados en vez de configurar a mano",
      "Usar solo codigo abierto para la infraestructura",
      "Programar robots que instalen servidores"
    ],
    correct: 1,
    technique: "Infrastructure as Code",
    explanation: "IaC significa que la infraestructura (red, BD, servidores) se describe en archivos de codigo (Terraform, vercel.json, deploy.yml) en vez de clicks manuales."
  },
  {
    id: 4,
    question: "En un Canary deployment, que porcentaje del trafico recibe la nueva version inicialmente?",
    options: [
      "100% — todo o nada",
      "50% — mitad y mitad",
      "1-10% — un porcentaje pequeno",
      "0% — se prueba sin trafico real"
    ],
    correct: 2,
    technique: "Canary Deployments",
    explanation: "Canary empieza con un porcentaje pequeno (tipicamente 1-10%), monitorea metricas, y si todo va bien escala gradualmente hasta 100%."
  },
  {
    id: 5,
    question: "En Blue-Green deployment, que pasa si la version Green falla?",
    options: [
      "Se pierde todo y hay que redesplegar desde cero",
      "Se switchea de vuelta a Blue instantaneamente",
      "Se apagan ambos entornos por seguridad",
      "Se envia un email al equipo y se espera"
    ],
    correct: 1,
    technique: "Blue-Green Deployments",
    explanation: "La gracia de Blue-Green es que Blue sigue intacto. Si Green falla, el rollback es instantaneo: solo se reapunta el balanceador a Blue."
  },
  {
    id: 6,
    question: "Que desacoplan los Feature Flags?",
    options: [
      "El frontend del backend",
      "El deploy del release",
      "Los tests de la produccion",
      "El codigo del repositorio"
    ],
    correct: 1,
    technique: "Feature Flags",
    explanation: "Feature flags desacoplan deploy de release: el codigo se despliega apagado (deploy) y se enciende cuando se decide (release). Sin redesplegar."
  },
  {
    id: 7,
    question: "Que hace AIOps con las alertas de un sistema en produccion?",
    options: [
      "Las elimina todas para no molestar",
      "Las envia directamente al usuario final",
      "Reduce el ruido separando las accionables de las irrelevantes",
      "Las guarda en un archivo de texto plano"
    ],
    correct: 2,
    technique: "Observabilidad con IA (AIOps)",
    explanation: "AIOps reduce el ruido de alertas hasta un 95%, distinguiendo las que requieren accion de las que son ruido, para que el equipo se enfoque en lo importante."
  },
  {
    id: 8,
    question: "Que es Self-Healing en el contexto de deployment?",
    options: [
      "El desarrollador corrige bugs mientras duerme",
      "El sistema detecta fallos y se corrige automaticamente (rollback, restart, scaling)",
      "Se reinstala el sistema operativo completo",
      "Se apaga el servidor para que descanse"
    ],
    correct: 1,
    technique: "Self-Healing Deployments",
    explanation: "Self-healing es cuando el sistema detecta un fallo post-deploy y se arregla solo: reinicia pods, hace rollback, o escala recursos sin intervencion humana."
  },
  {
    id: 9,
    question: "En HITL (Human-in-the-Loop), que rol tiene el humano?",
    options: [
      "Solo observa sin poder intervenir",
      "No participa — la IA decide todo",
      "Valida y aprueba antes de que la IA ejecute",
      "Escribe el codigo que la IA deberia haber escrito"
    ],
    correct: 2,
    technique: "Niveles de supervision humana",
    explanation: "En HITL la IA propone y el humano valida antes de que la accion ocurra. Nada se ejecuta sin aprobacion humana explicita."
  },
  {
    id: 10,
    question: "Cual es el proposito de Chaos Engineering?",
    options: [
      "Destruir el sistema de produccion para empezar de cero",
      "Romper cosas a proposito para verificar que los mecanismos de recuperacion funcionen",
      "Generar datos aleatorios para entrenar modelos de IA",
      "Confundir a los usuarios para medir su tolerancia"
    ],
    correct: 1,
    technique: "Chaos Engineering",
    explanation: "Chaos Engineering inyecta fallos controlados en produccion para verificar que self-healing, rollback y alertas funcionen antes de una emergencia real."
  }
]

export function getQuestionCount() {
  return QUIZ_QUESTIONS.length
}

export function getQuestionById(id) {
  return QUIZ_QUESTIONS.find(q => q.id === id) || null
}
