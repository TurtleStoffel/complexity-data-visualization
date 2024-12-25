import './style.css'
import { setupGraph } from './graph.ts'
import { setupPlot } from './plot.ts'
import d3ToPng from 'd3-svg-to-png'
import { setupTable } from './table.ts'
import { loadData } from './data'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="grid grid-cols-3 grid-flow-row auto-rows-min gap-4">
    <div id="graph" class="w-full"></div>
    <div id="plot" class="w-full"></div>
    <div id="table" class="w-full overflow-y-auto max-h-96"></div>
    <button id="download-button" class="col-start-2">Download</button>
  </div>
`

const metrics = await loadData()

document.querySelector<HTMLButtonElement>('#download-button')!.addEventListener('click', () => {
  d3ToPng('svg#graph', 'graph');
})

setupGraph(document.querySelector<HTMLDivElement>('#graph')!)
setupPlot(document.querySelector<HTMLDivElement>('#plot')!, metrics)
setupTable(document.querySelector<HTMLTableElement>('#table')!, metrics)
