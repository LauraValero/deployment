import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const ROOT = resolve(import.meta.dirname, '..')

describe('estructura del proyecto', () => {
  it('index.html existe', () => {
    expect(existsSync(resolve(ROOT, 'index.html'))).toBe(true)
  })

  it('styles.css existe', () => {
    expect(existsSync(resolve(ROOT, 'styles.css'))).toBe(true)
  })

  it('main.js existe', () => {
    expect(existsSync(resolve(ROOT, 'main.js'))).toBe(true)
  })

  it('vercel.json existe', () => {
    expect(existsSync(resolve(ROOT, 'vercel.json'))).toBe(true)
  })

  it('deploy.yml existe', () => {
    expect(existsSync(resolve(ROOT, '.github', 'workflows', 'deploy.yml'))).toBe(true)
  })
})

describe('index.html', () => {
  const html = readFileSync(resolve(ROOT, 'index.html'), 'utf-8')

  it('tiene la estructura basica de Reveal.js', () => {
    expect(html).toContain('class="reveal"')
    expect(html).toContain('class="slides"')
  })

  it('tiene la portada', () => {
    expect(html).toContain('Técnicas de Deployment con IA')
  })

  it('tiene al menos 10 secciones (slides)', () => {
    const sections = (html.match(/<section/g) || []).length
    expect(sections).toBeGreaterThanOrEqual(10)
  })

  it('referencia los videos de demo', () => {
    expect(html).toContain('demo_cicd.webm')
    expect(html).toContain('demo_gitops.webm')
    expect(html).toContain('demo_observability.webm')
  })

  it('tiene la seccion de referencias', () => {
    expect(html).toContain('Referencias')
    expect(html).toContain('referencias-ieee')
  })

  it('tiene la seccion del quiz', () => {
    expect(html).toContain('quiz-container')
  })
})

describe('videos de demo', () => {
  const videos = [
    'demo_cicd.webm',
    'demo_gitops.webm',
    'demo_iac.webm',
    'demo_preview.webm',
    'demo_observability.webm',
    'demo_meta_v2.webm'
  ]

  for (const video of videos) {
    it(`${video} existe en public/videos/`, () => {
      expect(existsSync(resolve(ROOT, 'public', 'videos', video))).toBe(true)
    })
  }
})

describe('vercel.json', () => {
  const config = JSON.parse(readFileSync(resolve(ROOT, 'vercel.json'), 'utf-8'))

  it('tiene buildCommand', () => {
    expect(config.buildCommand).toBeDefined()
  })

  it('tiene outputDirectory apuntando a dist', () => {
    expect(config.outputDirectory).toBe('dist')
  })
})
