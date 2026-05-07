import Reveal from 'reveal.js'
import { QUIZ_QUESTIONS } from './src/quiz-data.js'
import { checkAnswer, calculateScore, getResultMessage } from './src/quiz.js'

Reveal.initialize({
  hash: true,
  slideNumber: true,
  transition: 'slide',
  controls: true,
  progress: true,
  center: true,
  width: 1280,
  height: 720,
  navigationMode: 'linear',
  keyboard: {
    37: 'prev',
    39: 'next',
    38: 'prev',
    40: 'next'
  }
})

const state = {
  currentQuestion: 0,
  answers: {},
  answered: false
}

function renderQuestion() {
  const q = QUIZ_QUESTIONS[state.currentQuestion]
  if (!q) return

  document.getElementById('quiz-results').style.display = 'none'
  document.getElementById('quiz-container').style.display = 'block'

  document.getElementById('quiz-question').innerHTML =
    `<strong>Pregunta ${state.currentQuestion + 1} de ${QUIZ_QUESTIONS.length}</strong><br>${q.question}`

  const optionsEl = document.getElementById('quiz-options')
  optionsEl.innerHTML = ''
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button')
    btn.className = 'quiz-option'
    btn.textContent = opt
    btn.addEventListener('click', () => selectAnswer(q.id, i))
    optionsEl.appendChild(btn)
  })

  document.getElementById('quiz-feedback').className = 'quiz-feedback'
  document.getElementById('quiz-feedback').textContent = ''
  document.getElementById('quiz-next').style.display = 'none'
  document.getElementById('quiz-progress').textContent =
    `${Object.keys(state.answers).length} de ${QUIZ_QUESTIONS.length} respondidas`

  state.answered = false
}

function selectAnswer(questionId, selectedIndex) {
  if (state.answered) return
  state.answered = true
  state.answers[questionId] = selectedIndex

  const isCorrect = checkAnswer(questionId, selectedIndex)
  const q = QUIZ_QUESTIONS.find(qq => qq.id === questionId)
  const options = document.querySelectorAll('.quiz-option')

  options.forEach((btn, i) => {
    btn.classList.add('disabled')
    if (i === q.correct) btn.classList.add('correct')
    if (i === selectedIndex && !isCorrect) btn.classList.add('incorrect')
  })

  const feedback = document.getElementById('quiz-feedback')
  feedback.className = `quiz-feedback show ${isCorrect ? 'correct' : 'incorrect'}`
  feedback.textContent = isCorrect
    ? `Correcto. ${q.explanation}`
    : `Incorrecto. ${q.explanation}`

  document.getElementById('quiz-next').style.display = 'inline-block'
  document.getElementById('quiz-next').textContent =
    state.currentQuestion < QUIZ_QUESTIONS.length - 1 ? 'Siguiente' : 'Ver resultados'
}

function nextQuestion() {
  state.currentQuestion++
  if (state.currentQuestion >= QUIZ_QUESTIONS.length) {
    showResults()
  } else {
    renderQuestion()
  }
}

function showResults() {
  document.getElementById('quiz-container').style.display = 'none'
  const results = document.getElementById('quiz-results')
  results.style.display = 'block'

  const score = calculateScore(state.answers)
  document.getElementById('quiz-score').textContent = `${score.correct}/${score.total} (${score.percentage}%)`
  document.getElementById('quiz-message').textContent = getResultMessage(score.percentage)

  const detailsEl = document.getElementById('quiz-details')
  detailsEl.innerHTML = score.details.map(d => {
    const icon = d.correct ? '✓' : '✗'
    const cls = d.correct ? 'correct' : 'incorrect'
    const q = QUIZ_QUESTIONS.find(qq => qq.id === d.id)
    return `<div class="quiz-detail-item ${cls}">${icon} ${q.technique}</div>`
  }).join('')
}

function restartQuiz() {
  state.currentQuestion = 0
  state.answers = {}
  state.answered = false
  renderQuestion()
}

document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.getElementById('quiz-next')
  const restartBtn = document.getElementById('quiz-restart')
  if (nextBtn) nextBtn.addEventListener('click', nextQuestion)
  if (restartBtn) restartBtn.addEventListener('click', restartQuiz)

  renderQuestion()
})
