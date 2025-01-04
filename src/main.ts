import d3ToPng from 'd3-svg-to-png'

import './style.css'

import { loadData } from './data'

import { setupGraph } from './plots/graph.ts'
import { setupPlot } from './plots/plot.ts'
import { setupPlotFolderTree } from './plots/plot-folder-tree.ts'
import { setupTable } from './plots/table.ts'
import { setupD3FolderTree } from './plots/d3-folder-tree.ts'

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
    <div id="folder-tree" class="w-full"></div>
    <div id="d3-folder-tree" class="w-full">
      <svg width="100%" viewBox="-5 -5 410 210">
        <g class="links"></g>
        <g class="nodes"></g>
      </svg>
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
setupPlotFolderTree(document.querySelector<HTMLDivElement>('#folder-tree')!, metrics.sizeMetrics)
setupD3FolderTree(metrics.sizeMetrics)
