import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { setupPlot } from './graph.ts'
import d3ToPng from 'd3-svg-to-png'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

document.querySelector<HTMLButtonElement>('#download-button')!.addEventListener('click', () => {
  d3ToPng('svg#graph', 'graph');
})

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
setupPlot(document.querySelector<HTMLDivElement>('#myplot')!)
