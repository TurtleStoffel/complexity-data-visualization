import './style.css'
import { setupGraph } from './graph.ts'
import { setupPlot } from './plot.ts'
import d3ToPng from 'd3-svg-to-png'

document.querySelector<HTMLButtonElement>('#download-button')!.addEventListener('click', () => {
  d3ToPng('svg#graph', 'graph');
})

setupGraph(document.querySelector<HTMLDivElement>('#myplot')!)
setupPlot(document.querySelector<HTMLDivElement>('#plot-2')!)
