import { describe, it, expect } from 'vitest'
import { checkAnswer, calculateScore, getResultMessage, isQuizComplete, getUnansweredQuestions, shuffleArray } from '../src/quiz.js'
import { QUIZ_QUESTIONS, getQuestionCount, getQuestionById } from '../src/quiz-data.js'

describe('quiz-data', () => {
  it('tiene exactamente 10 preguntas', () => {
    expect(getQuestionCount()).toBe(10)
  })

  it('cada pregunta tiene los campos requeridos', () => {
    for (const q of QUIZ_QUESTIONS) {
      expect(q).toHaveProperty('id')
      expect(q).toHaveProperty('question')
      expect(q).toHaveProperty('options')
      expect(q).toHaveProperty('correct')
      expect(q).toHaveProperty('technique')
      expect(q).toHaveProperty('explanation')
    }
  })

  it('cada pregunta tiene exactamente 4 opciones', () => {
    for (const q of QUIZ_QUESTIONS) {
      expect(q.options).toHaveLength(4)
    }
  })

  it('el indice correcto esta dentro del rango de opciones', () => {
    for (const q of QUIZ_QUESTIONS) {
      expect(q.correct).toBeGreaterThanOrEqual(0)
      expect(q.correct).toBeLessThan(q.options.length)
    }
  })

  it('los IDs son unicos', () => {
    const ids = QUIZ_QUESTIONS.map(q => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('getQuestionById devuelve la pregunta correcta', () => {
    const q = getQuestionById(1)
    expect(q).not.toBeNull()
    expect(q.id).toBe(1)
    expect(q.technique).toBe('CI/CD con validacion IA')
  })

  it('getQuestionById devuelve null para ID inexistente', () => {
    expect(getQuestionById(999)).toBeNull()
  })
})

describe('checkAnswer', () => {
  it('devuelve true para respuesta correcta', () => {
    const q = QUIZ_QUESTIONS[0]
    expect(checkAnswer(q.id, q.correct)).toBe(true)
  })

  it('devuelve false para respuesta incorrecta', () => {
    const q = QUIZ_QUESTIONS[0]
    const wrong = q.correct === 0 ? 1 : 0
    expect(checkAnswer(q.id, wrong)).toBe(false)
  })

  it('devuelve null para pregunta inexistente', () => {
    expect(checkAnswer(999, 0)).toBeNull()
  })

  it('devuelve null para indice fuera de rango', () => {
    expect(checkAnswer(1, -1)).toBeNull()
    expect(checkAnswer(1, 10)).toBeNull()
  })
})

describe('calculateScore', () => {
  it('calcula 100% cuando todas son correctas', () => {
    const answers = {}
    for (const q of QUIZ_QUESTIONS) {
      answers[q.id] = q.correct
    }
    const result = calculateScore(answers)
    expect(result.correct).toBe(10)
    expect(result.total).toBe(10)
    expect(result.percentage).toBe(100)
  })

  it('calcula 0% cuando todas son incorrectas', () => {
    const answers = {}
    for (const q of QUIZ_QUESTIONS) {
      answers[q.id] = q.correct === 0 ? 1 : 0
    }
    const result = calculateScore(answers)
    expect(result.correct).toBe(0)
    expect(result.percentage).toBe(0)
  })

  it('calcula porcentaje parcial correctamente', () => {
    const answers = {}
    answers[QUIZ_QUESTIONS[0].id] = QUIZ_QUESTIONS[0].correct
    answers[QUIZ_QUESTIONS[1].id] = QUIZ_QUESTIONS[1].correct
    const result = calculateScore(answers)
    expect(result.correct).toBe(2)
    expect(result.percentage).toBe(20)
  })

  it('maneja respuestas vacias', () => {
    const result = calculateScore({})
    expect(result.correct).toBe(0)
    expect(result.total).toBe(10)
    expect(result.percentage).toBe(0)
  })

  it('incluye detalles por pregunta', () => {
    const answers = { 1: QUIZ_QUESTIONS[0].correct }
    const result = calculateScore(answers)
    expect(result.details).toHaveLength(10)
    expect(result.details[0].correct).toBe(true)
    expect(result.details[1].correct).toBe(false)
  })
})

describe('getResultMessage', () => {
  it('devuelve mensaje de perfecto para 100%', () => {
    expect(getResultMessage(100)).toContain('Perfecto')
  })

  it('devuelve mensaje positivo para 80-99%', () => {
    expect(getResultMessage(80)).toContain('Muy bien')
    expect(getResultMessage(90)).toContain('Muy bien')
  })

  it('devuelve mensaje medio para 60-79%', () => {
    expect(getResultMessage(60)).toContain('Bien')
    expect(getResultMessage(70)).toContain('Bien')
  })

  it('devuelve mensaje de repaso para 40-59%', () => {
    expect(getResultMessage(40)).toContain('Regular')
  })

  it('devuelve mensaje critico para menos de 40%', () => {
    expect(getResultMessage(30)).toContain('repasar')
    expect(getResultMessage(0)).toContain('repasar')
  })
})

describe('isQuizComplete', () => {
  it('devuelve false si faltan respuestas', () => {
    expect(isQuizComplete({})).toBe(false)
    expect(isQuizComplete({ 1: 0 })).toBe(false)
  })

  it('devuelve true si todas las preguntas tienen respuesta', () => {
    const answers = {}
    for (const q of QUIZ_QUESTIONS) {
      answers[q.id] = 0
    }
    expect(isQuizComplete(answers)).toBe(true)
  })
})

describe('getUnansweredQuestions', () => {
  it('devuelve todos los IDs si no hay respuestas', () => {
    const unanswered = getUnansweredQuestions({})
    expect(unanswered).toHaveLength(10)
  })

  it('devuelve solo los IDs sin respuesta', () => {
    const answers = { 1: 0, 2: 0, 3: 0 }
    const unanswered = getUnansweredQuestions(answers)
    expect(unanswered).toHaveLength(7)
    expect(unanswered).not.toContain(1)
    expect(unanswered).not.toContain(2)
    expect(unanswered).not.toContain(3)
  })

  it('devuelve array vacio si todas estan respondidas', () => {
    const answers = {}
    for (const q of QUIZ_QUESTIONS) answers[q.id] = 0
    expect(getUnansweredQuestions(answers)).toHaveLength(0)
  })
})

describe('shuffleArray', () => {
  it('no modifica el array original', () => {
    const original = [1, 2, 3, 4]
    const copy = [...original]
    shuffleArray(original)
    expect(original).toEqual(copy)
  })

  it('devuelve un array con los mismos elementos', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(arr)
    expect(shuffled.sort()).toEqual(arr.sort())
  })

  it('devuelve un array del mismo tamano', () => {
    expect(shuffleArray([1, 2, 3]).length).toBe(3)
  })
})
