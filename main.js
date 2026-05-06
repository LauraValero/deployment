import Reveal from 'reveal.js'

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
    37: 'prev',  // left = prev (arriba)
    39: 'next',  // right = next (abajo)
    38: 'prev',  // up = prev
    40: 'next'   // down = next
  }
})
