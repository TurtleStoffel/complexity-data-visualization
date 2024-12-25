import './style.css'
import { setupGraph } from './graph.ts'
import { setupPlot } from './plot.ts'
import d3ToPng from 'd3-svg-to-png'
import { setupTable } from './table.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Complexity</h1>
  <div class="grid grid-cols-3 grid-flow-row auto-rows-min gap-4">
    <div id="graph" class="w-full"></div>
    <div id="plot" class="w-full"></div>
    <div id="table" class="w-full overflow-y-auto max-h-96"></div>
    <div class="w-full"></div>
    <button id="download-button">Download</button>
  </div>
`

document.querySelector<HTMLButtonElement>('#download-button')!.addEventListener('click', () => {
  d3ToPng('svg#graph', 'graph');
})

setupGraph(document.querySelector<HTMLDivElement>('#graph')!)
setupPlot(document.querySelector<HTMLDivElement>('#plot')!)
setupTable(document.querySelector<HTMLTableElement>('#table')!)
