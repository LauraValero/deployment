# Quiz de Deployment con IA

Aplicacion web Reveal.js con quiz interactivo. Desplegada en Vercel.
URL: https://exposicionfinal.vercel.app

## Stack

- Vite + Reveal.js + vanilla JS
- Tests: Vitest (logica del quiz + validacion de estructura)
- CI/CD: GitHub Actions (.github/workflows/deploy.yml)
- Deploy: Vercel conectado al repo (GitOps)

## Reglas

- Correr `npm test` antes de cada commit
- Los tests deben pasar para que el CI permita deploy
- La logica del quiz va en src/quiz.js y src/quiz-data.js
- Las preguntas del quiz van en src/quiz-data.js
- No hacer push directo a main sin que pasen los tests
- Cada PR genera un Preview Deployment en Vercel

## Estructura

```
index.html              -> slides + quiz interactivo
styles.css              -> estilos
main.js                 -> Reveal.js init + quiz UI
src/quiz-data.js        -> preguntas del quiz (datos puros)
src/quiz.js             -> logica: scoring, validacion
tests/quiz.test.js      -> tests unitarios de la logica
tests/build.test.js     -> tests de estructura del proyecto
.github/workflows/      -> pipeline CI/CD real
```
