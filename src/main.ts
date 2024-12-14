import './style.css'
import { setupPlot } from './graph.ts'
import d3ToPng from 'd3-svg-to-png'

document.querySelector<HTMLButtonElement>('#download-button')!.addEventListener('click', () => {
  d3ToPng('svg#graph', 'graph');
})

setupPlot(document.querySelector<HTMLDivElement>('#myplot')!)
