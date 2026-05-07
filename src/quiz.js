import { QUIZ_QUESTIONS } from './quiz-data.js'

export function checkAnswer(questionId, selectedIndex) {
  const question = QUIZ_QUESTIONS.find(q => q.id === questionId)
  if (!question) return null
  if (selectedIndex < 0 || selectedIndex >= question.options.length) return null
  return selectedIndex === question.correct
}

export function calculateScore(answers) {
  let correct = 0
  const total = QUIZ_QUESTIONS.length
  const details = []

  for (const question of QUIZ_QUESTIONS) {
    const userAnswer = answers[question.id]
    const isCorrect = userAnswer !== undefined && userAnswer === question.correct
    if (isCorrect) correct++
    details.push({
      id: question.id,
      technique: question.technique,
      correct: isCorrect,
      userAnswer: userAnswer !== undefined ? userAnswer : -1,
      correctAnswer: question.correct
    })
  }

  return {
    correct,
    total,
    percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    details
  }
}

export function getResultMessage(percentage) {
  if (percentage === 100) return "Perfecto. Dominas las tecnicas de deployment con IA."
  if (percentage >= 80) return "Muy bien. Tienes una base solida en deployment con IA."
  if (percentage >= 60) return "Bien. Conoces lo basico pero hay tecnicas que puedes reforzar."
  if (percentage >= 40) return "Regular. Te recomiendo repasar las slides de las tecnicas que fallaste."
  return "Necesitas repasar. Vuelve a las slides y presta atencion a cada tecnica."
}

export function isQuizComplete(answers) {
  return QUIZ_QUESTIONS.every(q => answers[q.id] !== undefined)
}

export function getUnansweredQuestions(answers) {
  return QUIZ_QUESTIONS.filter(q => answers[q.id] === undefined).map(q => q.id)
}

export function shuffleArray(arr) {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
