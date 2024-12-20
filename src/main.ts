import './style.css'
import { setupGraph } from './graph.ts'
import { setupPlot } from './plot.ts'
import d3ToPng from 'd3-svg-to-png'
import { setupTable } from './table.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Complexity</h1>
  <div id="graph"></div>
  <div id="plot"></div>
  <div id="table"></div>
  <button id="download-button">Download</button>
`

document.querySelector<HTMLButtonElement>('#download-button')!.addEventListener('click', () => {
  d3ToPng('svg#graph', 'graph');
})

setupGraph(document.querySelector<HTMLDivElement>('#graph')!)
setupPlot(document.querySelector<HTMLDivElement>('#plot')!)
setupTable(document.querySelector<HTMLTableElement>('#table')!)
