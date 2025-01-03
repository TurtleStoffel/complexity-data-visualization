import './style.css'
import { setupGraph } from './plots/graph.ts'
import { setupPlot } from './plots/plot.ts'
import d3ToPng from 'd3-svg-to-png'
import { setupTable } from './plots/table.ts'
import { loadData } from './data'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h2 id="repository-name"></h2>
  <div class="grid grid-cols-3 grid-flow-row auto-rows-min gap-4">
    <div id="graph" class="w-full"></div>
    <div id="plot" class="w-full"></div>
    <div class="w-full overflow-y-auto max-h-96">
      <table class="table-fixed w-full" id="table">
        <thead><tr></tr></thead>
        <tbody></tbody>
      </table>
    </div>
    <button id="download-button" class="col-start-2">Download</button>
  </div>
`

const metrics = await loadData()

document.querySelector<HTMLHeadingElement>('#repository-name')!.innerText = metrics.repositoryName

document.querySelector<HTMLButtonElement>('#download-button')!.addEventListener('click', () => {
  d3ToPng('svg#graph', 'graph');
})

setupGraph(document.querySelector<HTMLDivElement>('#graph')!)
setupPlot(document.querySelector<HTMLDivElement>('#plot')!, metrics.sizeMetrics)
setupTable(metrics.sizeMetrics)
